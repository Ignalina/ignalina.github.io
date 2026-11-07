# tunnr: a distroless WireGuard appliance that boots tunnel-first

2026-07-25, Henrik. Original: https://vetra.se/blog/tunnr-a-distroless-wireguard-appliance/

tunnr builds bare-metal WireGuard VPN client appliances. The idea is small and stubborn: a minimal, distroless OS image where a single Rust binary runs as PID 1, the WireGuard tunnel is live before any other packet leaves the box, and the exact same artifact boots in a QEMU virtual machine or on real hardware. No shell. No package manager. No general-purpose userspace to attack.

This is an early project, more architecture and working boot harness than shipping product. This post is about why we're building it and what already runs.

## Why a VPN client should be an appliance

A normal VPN client is a program on a general-purpose operating system. That OS has a shell, a package manager, dozens of daemons, a DHCP client, and a login surface. None of it is needed by the VPN, and all of it is attack surface. Worse, there's a window at boot where the machine is on the network *before* the tunnel is up: DHCP chatter, mDNS, whatever a service decided to phone home about. For a device whose entire job is "everything goes through the tunnel," that window is a hole.

tunnr closes it by construction. The appliance is the VPN client and nothing else, and it enforces a short list of laws:

- No shell, no package manager, no general-purpose userspace. Ever.
- A single binary as PID 1.
- The WireGuard tunnel comes up before any other packet.
- Static IP only. No DHCP, so no DHCP attack surface.
- The UI is mandatory. The appliance is never headless.

Because that PID-1 binary is Rust, with WireGuard via [boringtun](https://github.com/cloudflare/boringtun) and the interface via egui/eframe, the whole userspace is memory-safe by default: no buffer overflows, no use-after-free in the thing holding your tunnel open.

## Two layers, and a strict split

tunnr is deliberately split in two so that no single piece does too much:

- **An orchestrator** loads a variant's config, creates the UEFI/qcow2 images, spawns the per-variant build container, collects the artifacts, and boots the result under QEMU + OVMF. Crucially, the orchestrator *never compiles an OS*. It only orchestrates.
- **Build containers**, one per OS variant, are isolated compiler environments that each produce a UEFI-bootable artifact. The messy, variant-specific work stays sealed inside them.

The target OS variants range from pragmatic to research: a hardened **Buildroot** Linux at the near end, and a row of pure-Rust operating systems (Redox, Theseus, HermitCore, Motor-OS) at the far end, where even the kernel is memory-safe and the WireGuard client rides a minimal IP/UDP layer with no TCP stack to speak of. On maturity: Buildroot is where the real appliance work is happening today, and the bare-metal Rust OSs are blueprints and placeholders, not booting systems. The design names them so the path is clear, not so we can pretend we're already there.

## A pure-Rust harness that boots the thing and proves it ran

The part that already works end to end is the boot harness. On a host with no Go toolchain, our matrix-test environment, a pure-Rust crate called `tunnr-vm` stands in for the Go orchestrator. It builds a bootable appliance artifact (a kernel plus an initramfs whose PID 1 *is* the appliance init), boots it under the identical QEMU + OVMF (UEFI) + KVM launch the design mandates, captures the serial console, and asserts that the appliance reached runtime with every boot-contract marker present.

The whole packer-and-boot path is `std::process` and std fs: compile the init statically, build a newc cpio, gzip it, launch QEMU. One law on top: there is *no shell script anywhere in the boot path*. A boot either produces its contract markers on the serial line or it fails the test; there's no "looks fine" in between. Four appliance variants exercise it today: the WireGuard appliance itself, a korp demo, an install-on-boot demo container, and a Wayland + RDP desktop that comes up with a listener on port 3389. Three of the four already build a real Rust PID-1 rather than a C stand-in.

## Booting a fleet from one artifact

An appliance is only useful if you can give each unit its own identity without baking a thousand images. tunnr does this the cloud-init way, minus cloud-init: at boot the appliance reads a small attached seed disk, a NoCloud `CIDATA` volume that carries its WireGuard config and its keys, and PID 1 parses that seed straight out of the raw FAT bytes. One image, N seeds, N machines.

We benched the provisioning path apart from the boot so a regression lands on the guilty step. On a 32-core host, minting a node's two x25519 keypairs off the kernel CSPRNG takes ~34 µs, authoring its seed image ~855 µs, and the guest reading its identity back out ~217 µs. The number that matters is the full per-node round trip, author then read back: **3.21 ms**. Provisioning a fleet of N is N times that, plus N boots. The identity layer is not where fleet provisioning gets slow.

## Every build carries provenance

Both halves of a tunnr build are content-addressed and attested through our build tooling: the inner cargo build of the PID-1 payload folds into a signed attestation, and the appliance image itself is fingerprinted by its content. For a security appliance that's the whole point. You should be able to say exactly which bytes are running as PID 1 on a given box, and prove it.

## Where it stands

tunnr is early: the Rust boot harness builds and boots real appliances under UEFI and asserts the boot contract; three of four variants ship a real Rust PID-1; the Buildroot appliance is the live track and the bare-metal Rust operating systems are still on the drawing board. The codebase is private while the architecture settles.

If distroless, tunnel-first, memory-safe network appliances are something you care about, as an operator, a pilot user, or someone building in the same space, we'd like to hear from you: [info@vetra.se](mailto:info@vetra.se).
