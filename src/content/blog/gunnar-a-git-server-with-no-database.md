---
title: "Gunnar: a git server with no database, no shell and no OS"
description: "A git server in Rust that spawns nothing, stores no database, and boots as PID 1 on a 29.5 MB ISO. Stock git is both client and test judge."
pubDate: 2026-08-07
author: Rickard
tag: Engineering
lang: en
canonical: https://vetra.se/blog/gunnar-a-git-server-with-no-database/
---

Gunnar is a git server and client in Rust. It is named after a fusion of the honey badger and Gunnar from Njáls saga, which tells you the design temperament: it does not back off. It runs with an operating system, or without one. It stores no database. It spawns no processes. The whole server is one file.

The rule that shapes everything else is that Gunnar implements git itself. gitea and Forgejo shell out to the real `git` binary to do the actual work. Gunnar has no shell, no `git` or `ssh` subprocess, and no libgit2. It speaks the pkt-line protocol directly, and stock git 2.53 is both the client and the judge: the entire test suite is real git talking to it.

## No database, and no read path through the log

A forge normally needs somewhere to keep refs, users, keys and grants, which usually means Postgres or SQLite alongside the repositories. Gunnar keeps all of it in memory and persists it with an Apache Arrow IPC log, one `RecordBatch` per push. The important half of that sentence is the second one: **no request reads Arrow to answer**. The log is the durability mechanism, not the query path, so a fetch never waits on it.

Two git transports ride one implementation. SSH is the default; smart HTTP sits behind a feature that is off unless you ask for it, so an appliance image that wants no HTTP surface compiles none of it. Both drive the same pkt-line conversation through the same authorisation call, against the same key table and the same ACL. The legacy `git://` transport is never built at all, and the dumb HTTP protocol is refused by name.

## Measured against gitea and Forgejo

We benchmarked against both rivals under equal RAM, CPU and disk parameters: 8 CPUs and 8192 MB per engine, read back out of each container's own cgroup, three interleaved rounds. The column below is Gunnar against *the better of the two*, whichever won each row, which is the stricter comparison to make.

| Operation | Net CPU (s) | Peak RSS (MB) |
| --- | --- | --- |
| clone (year of history) | 0.234 vs 0.260 | 304 vs 655 |
| fetch (diverged) | 0.027 vs 0.059 | 21 vs 262 |
| fetch, after gc | 0.023 vs 0.026 | 13 vs 252 |
| clone+fetch+push ×8 | 1.297 vs 2.603 | 189 vs 537 |

The memory column is where the architecture shows. A fetch against a diverged repository costs Gunnar 21 MB where the best rival needs 262 MB, and after a `gc` it drops to 13 MB against 252 MB. That is not a tuning win, it is the absence of a JVM-shaped runtime and of a subprocess per request.

On bytes over the wire the picture is honest rather than flattering: a plain clone is a tie, and on some fetch shapes the rivals send slightly less. Where `gunnar gc` has recomputed deltas, Gunnar sends 238.7 kB against 331.5 kB, about 0.72× the rival's bytes. Every measured row, its conditions, and what each spread actually means is in the repository's benchmark document rather than summarised into a single number here.

## The bootstrap window

An appliance has no shell, which creates an awkward chicken-and-egg problem: how does the first administrator key get onto a box you cannot log into? The old answer was that `gunnar serve` refused to start against an empty identity table, which meant there was no first boot at all.

The current answer is a bootstrap window. A fresh server starts empty and says so on every line of its log: the enrollment call is open to any caller that can reach the control port, with no credential, and it creates an administrator. It closes permanently on the first success. Deleting every identity afterwards does not reopen it, because the window closes on the record of who claimed the server, not on the key count.

The alternative we rejected was baking operator keys into the image at build time. A key baked into an image is a credential that cannot be revoked and cannot be rotated: every copy of that image carries it, including copies nobody remembers taking. The bootstrap window is a credential nobody holds yet, granted to whoever reaches the box first, and shut for good the moment it is used.

## A war story: the LFS object that was never there

Git LFS rides the same URL, the same token and the same grant as everything else. One authorisation call covers four surfaces, so a read grant may download and may not upload, and a stranger cannot tell a private repository from an absent one.

The interesting part is where the two transports deliberately disagree. The pure-SSH LFS grammar answers each object with `upload`, `download` or `noop`, which means it has to say `noop` both when the server already holds an object and when it does not hold one at all. And git-lfs reads an object with neither an action nor an error as one it already has.

We measured what that does. Against a server rendering a missing object that way, `git lfs fetch --all` printed *1 object found, done.* and exited zero having transferred nothing, and `git clone` then failed blaming the client's own cache for a fault that was entirely the server's. The HTTP batch API can report a 404 per object inside a 200 response, so it does. The two surfaces diverge on purpose, and the decision lives in one function.

## Where it runs, including where it loses your data

Gunnar ships in three shapes, each measured rather than estimated:

- **No OS.** A 29.5 MB ISO booting under QEMU/OVMF as PID 1, bringing up its own network over `AF_NETLINK`. Listening in 3.66 s, and back up 3.69 s after a power cut serving the same exchange.
- **Container.** A `FROM scratch` image holding one 15 MB file and nothing else. No shell, no libc. Ready in 144 ms, 2.3 to 3.7 MB resident.
- **On an OS.** systemd. Install 17.3 s, push 385 ms, clone 164 ms.

The bare-metal shape carries a caveat we would rather state than have someone discover: its data root is the initramfs, so **a power cut loses every repository pushed to it**. That is measured, not assumed. It makes the ISO a fine ephemeral or read-mostly node and a bad place to keep the only copy of anything.

## Where it stands

**Update, November 2026:** Gunnar is now public and live on gunnar.rs. What it is today, and how to run it yourself, is in [the launch post](/blog/gunnar-self-hosted-git-server.html). The paragraphs below describe Gunnar as it stood in August.

Gunnar is at 1.1.0. The git matrix runs green against stock git, SSH and smart HTTP both serve real repositories, LFS works on both, and the dependency graph is 281 crates with zero violations against the banned list. It is MIT OR Apache-2.0, and the repository is private while the design settles.

If a forge that fits in 15 MB and boots without an operating system is useful to you, tell us what you would point it at: [info@vetra.se](mailto:info@vetra.se).
