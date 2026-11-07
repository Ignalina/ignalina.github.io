---
title: "Gunnar is live: a lightweight self-hosted git server for your own hardware"
description: "Gunnar is a lightweight, self-hosted git server in Rust for on-prem use: two commands to install, airgap by default, encrypted repos. Now live on gunnar.rs."
pubDate: 2026-11-06
author: Rickard
tag: Launch
lang: en
canonical: https://vetra.se/blog/gunnar-self-hosted-git-server/
---

Gunnar, our self-hosted git server written in Rust, is launched. The code is public at [gunnar.rs/nordisk/gunnar](https://www.gunnar.rs/nordisk/gunnar), and the exact same code runs [gunnar.rs](https://www.gunnar.rs) as a hosted service. Gunnar is developed on Gunnar: that repository is where our own commits land.

The hosted service is the easy part to point at, but it is not the point. Gunnar exists so that a company can run **its own git server on-premise, on its own hardware**, without taking on a platform. It is lightweight, it has what a team needs, and it leaves out the rest on purpose.

Most self-hosted git servers are one of two things. GitLab self-managed is a whole DevOps suite to operate. Gitea and Forgejo are lighter, but they run the `git` binary as a subprocess to do the actual work. Gunnar implements the git protocol itself, with no git or ssh subprocess anywhere in it, and stock git is the judge in its test suite.

## A git server, not a platform

The changelog for 1.7.0 says it in one line: Gunnar is only a git server. The build runner, the package registry and the OCI support are gone from it. A platform is something you have to look after, and your CI and your artifact store already have homes.

What it does have:

- Git over SSH and smart HTTP, and Git LFS on both.
- A web console that signs in with passkeys, so there are no passwords to leak. Touch a security key or use the passkey your browser keeps.
- Pull requests with a real three-way merge. A conflict is refused with every conflicting path named, and merge commits are signed with the server's own key, so repositories that require signed commits accept them.
- Signed pushes (sshsig/ed25519), a transparency log, and a hash-chained audit trail for every server setting.
- Prometheus metrics, and replication to a twin.
- Encrypted repositories, quantum-safe by default.
- Opt-in at build time: webhooks, company SSO over OIDC and SAML, and pull mirrors.

## A self-hosted git server in two commands

```
cargo install gunnar
gunnar
```

A bare `gunnar` needs no configuration file. On the first start it creates its data root, its SSH host key, its own certificate issuer and a sealed secret store, and it serves on loopback: git over SSH on port 2222, smart HTTP on 8080, and the control plane on 50051. The first enrollment call makes you the administrator, and that door then closes for good.

The default build is an **airgap build**. It makes no outbound calls, and it does not compile the metering or shop code that gunnar.rs uses. Webhooks, SSO and mirrors are cargo features you turn on when your network allows them.

Lightweight is a measured claim, not a feeling. On 2026-11-01, a freshly started server with 22 repositories held 5 MiB of heap and 24 MiB in total. Every benchmark number in the repository's README is rendered from a result file, with host, date and load, so it cannot drift from what was actually run. The same server runs from cargo under systemd, in a container, or as Vetra's OS-less hardware appliance with a hardened kernel.

## A twin instead of a backup script

A git server on-prem is only as good as what happens when its disk dies. Gunnar replicates to a twin: any second box that can reach the primary joins with `gunnar control twin join`. If the primary goes, `replication promote` makes the twin the new main, and `replication demote` and `replication standby` step the old main down.

## Repositories the server cannot read

An encrypted repository is sealed on your machine before anything leaves it. `gunnar-cli crypt init` makes a key ring wrapped only to the members' keys with ML-KEM-768 and X25519 together. That hybrid is what quantum-safe means here: a future quantum computer has to break the post-quantum half as well. The server stores ciphertext and nothing else. A person's encryption key can live on a YubiKey, and the console opens encrypted files with a touch of that key.

This matters most on a server you do not run yourself, which brings us to gunnar.rs.

## gunnar.rs: a European alternative to GitHub

Not everyone wants a box in the rack. On gunnar.rs you can open an account and pay for the storage you choose, or order a private Gunnar instance of your own: its own server, its own console and its own twin in the same zone, behind a VPN. Compared with keeping your code on GitHub, GitLab or Bitbucket, there are four differences that we think matter:

- **You can leave with everything.** gunnar.rs runs the same code you can install with `cargo install gunnar`. Moving off it means starting your own server and pushing to it, and you keep the same console, the same permission model and the same behaviour. You are not trading a hosted product for a different one.
- **We can be unable to read your code.** A hosted forge can normally read your source; it needs to, to show diffs and run search. With an encrypted repository, gunnar.rs holds ciphertext, and the key ring is wrapped to your keys, not ours. The cost is real: whatever a server would do with the content, it cannot do with ciphertext.
- **It is European.** Gunnar is owned by Vetra Automation AB in Sweden and Ignalina ApS in Denmark, and gunnar.rs runs on European infrastructure. For a Nordic company that wants its code under European jurisdiction, that removes a question from the procurement review.
- **You can read what runs.** Gunnar is AGPL-3.0-only, so the server and the console that handle your repositories are public source. Teams that want to embed or modify it without the AGPL's obligations can ask for a commercial licence at [gunnar@gunnar.rs](mailto:gunnar@gunnar.rs).

One thing we would rather say than have you discover: gunnar.rs is in beta. We replicate your data, but we cannot guarantee it yet. Keep a copy of anything you cannot afford to lose, which with git means one more remote.

## Get the code

Anyone can clone the repository read-only, with no account and no registered key:

```
git clone ssh://anonymous@git.gunnar.rs:2222/nordisk/gunnar.git
cd gunnar
cargo build --release
```

The README on [gunnar.rs/nordisk/gunnar](https://www.gunnar.rs/nordisk/gunnar) walks through a server, the console with a passkey, a first push, an encrypted repository and a twin, all on one Linux host. Our integration tests run exactly those commands, in that order. For how Gunnar speaks git without the git binary, and the LFS edge case that made a missing object look present, see our [engineering write-up](/blog/gunnar-a-git-server-with-no-database.html).

To try the hosted service, [sign up on gunnar.rs](https://www.gunnar.rs/signup). If you want Gunnar on your own hardware and would like help putting it there, write to [info@vetra.se](mailto:info@vetra.se).
