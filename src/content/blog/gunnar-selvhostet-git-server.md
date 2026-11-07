---
title: "Gunnar: en let, selvhostet git-server til jeres egen hardware"
description: "Gunnar er en let, selvhostet git-server i Rust til on-prem: to kommandoer at installere, air-gapped som standard, krypterede repositories og åben kildekode."
pubDate: 2026-11-06
author: Rickard
tag: Lancering
lang: da
original: https://vetra.se/blog/gunnar-self-hosted-git-server/
---

Gunnar, vores selvhostede git-server skrevet i Rust, er lanceret. Koden er offentlig på [gunnar.rs/nordisk/gunnar](https://www.gunnar.rs/nordisk/gunnar), og præcis den samme kode kører [gunnar.rs](https://www.gunnar.rs) som hostet tjeneste. Gunnar udvikles på Gunnar: det er i det repository, vores egne commits lander.

Den hostede tjeneste er den nemme del at pege på, men den er ikke pointen. Gunnar findes, for at en virksomhed kan køre **sin egen git-server on-premise, på sin egen hardware**, uden at skulle tage en hel platform på sig. Den er let, den har det, et team har brug for, og resten er udeladt med vilje.

De fleste selvhostede git-servere er en af to ting. GitLab self-managed er en hel DevOps-suite, der skal driftes. Gitea og Forgejo er lettere, men de kører `git`-programmet som en underproces for at udføre det egentlige arbejde. Gunnar implementerer selv git-protokollen, uden nogen git- eller ssh-underproces, og almindelig git er dommeren i testsuiten.

## En git-server, ikke en platform

Ændringsloggen for 1.7.0 siger det på én linje: Gunnar er kun en git-server. Build-runneren, pakkeregistret og OCI-understøttelsen er fjernet. En platform er noget, man skal passe, og jeres CI og jeres artefaktlager har allerede et hjem.

Det her har den:

- Git over SSH og smart HTTP, og Git LFS på begge.
- En webkonsol, der logger ind med passkeys, så der ikke er nogen adgangskoder at lække. Rør en sikkerhedsnøgle, eller brug den passkey, som browseren gemmer.
- Pull requests med en rigtig trevejs-merge. En konflikt afvises med hver konfliktende sti nævnt, og merge-commits signeres med serverens egen nøgle, så repositories, der kræver signerede commits, accepterer dem.
- Signerede pushes (sshsig/ed25519), en transparenslog og et hash-kædet revisionsspor for hver serverindstilling.
- Prometheus-metrikker og replikering til en twin.
- Krypterede repositories, kvantesikre som standard.
- Tilvalg ved bygning: webhooks, virksomheds-SSO over OIDC og SAML samt pull-spejle.

## En selvhostet git-server i to kommandoer

```
cargo install gunnar
gunnar
```

En `gunnar` uden argumenter behøver ingen konfigurationsfil. Ved første start opretter den sin datarod, sin SSH-værtsnøgle, sin egen certifikatudsteder og et forseglet hemmelighedslager, og den lytter på loopback: git over SSH på port 2222, smart HTTP på 8080 og kontrolplanet på 50051. Det første tilmeldingskald gør dig til administrator, og den dør lukker derefter for altid.

Standardbygget er et **air-gapped byg**. Det foretager ingen udgående kald, og det kompilerer ikke den målings- og butikskode, som gunnar.rs bruger. Webhooks, SSO og spejle er cargo-features, I slår til, når jeres netværk tillader det.

Let er en målt påstand, ikke en fornemmelse. Den 1. november 2026 brugte en nystartet server med 22 repositories 5 MiB heap og 24 MiB i alt. Hvert benchmarktal i repositoriets README er genereret fra en resultatfil med vært, dato og belastning, så det ikke kan glide væk fra det, der faktisk blev kørt. Den samme server kører fra cargo under systemd, i en container eller som Vetras OS-løse hardware-appliance med en hærdet kerne.

## En twin i stedet for et backupscript

En git-server on-prem er kun så god som det, der sker, når dens disk dør. Gunnar replikerer til en twin: enhver anden maskine, der kan nå den primære, kommer med via `gunnar control twin join`. Hvis den primære forsvinder, gør `replication promote` twin'en til den nye primære, og `replication demote` og `replication standby` sætter den gamle primære ned.

## Repositories, som serveren ikke kan læse

Et krypteret repository forsegles på din maskine, før noget forlader den. `gunnar-cli crypt init` laver en nøglering, der kun er pakket ind til medlemmernes nøgler, med ML-KEM-768 og X25519 sammen. Den hybrid er, hvad kvantesikker betyder her: en fremtidig kvantecomputer skal også knække den post-kvante halvdel. Serveren gemmer kun krypteret tekst. En persons krypteringsnøgle kan ligge på en YubiKey, og konsollen åbner krypterede filer med et tryk på den nøgle.

Det betyder mest på en server, man ikke selv kører, og det bringer os til gunnar.rs.

## gunnar.rs: et europæisk alternativ til GitHub

Ikke alle vil have en maskine i racket. På gunnar.rs kan I oprette en konto og betale for den lagerplads, I vælger, eller bestille jeres egen private Gunnar-instans: egen server, egen konsol og egen twin i samme zone, bag et VPN. Sammenlignet med at have koden på GitHub, GitLab eller Bitbucket er der fire forskelle, som vi mener betyder noget:

- **I kan gå med det hele.** gunnar.rs kører den samme kode, som I kan installere med `cargo install gunnar`. At flytte væk betyder at starte jeres egen server og pushe til den, og I beholder samme konsol, samme rettighedsmodel og samme adfærd. I bytter ikke et hostet produkt ud med et andet.
- **Vi kan være ude af stand til at læse jeres kode.** En hostet forge kan normalt læse jeres kildekode; det skal den, for at vise diffs og søge. Med et krypteret repository holder gunnar.rs kun krypteret tekst, og nøgleringen er pakket ind til jeres nøgler, ikke vores. Prisen er reel: det, en server ellers ville gøre med indholdet, kan den ikke gøre med krypteret tekst.
- **Den er europæisk.** Gunnar ejes af Vetra Automation AB i Sverige og Ignalina ApS i Danmark, og gunnar.rs kører på europæisk infrastruktur. For en nordisk virksomhed, der vil have sin kode under europæisk jurisdiktion, fjerner det et spørgsmål fra indkøbsgennemgangen.
- **I kan læse, hvad der kører.** Gunnar er AGPL-3.0-only, så serveren og konsollen, der håndterer jeres repositories, er offentlig kildekode. Teams, der vil indlejre eller ændre den uden AGPL's forpligtelser, kan bede om en kommerciel licens på [gunnar@gunnar.rs](mailto:gunnar@gunnar.rs).

Én ting vil vi hellere sige end lade jer opdage: gunnar.rs er i beta. Vi replikerer jeres data, men vi kan ikke garantere dem endnu. Behold en kopi af alt, I ikke har råd til at miste, hvilket med git betyder endnu en remote.

## Hent koden

Alle kan klone repositoriet skrivebeskyttet, uden konto og uden registreret nøgle:

```
git clone ssh://anonymous@git.gunnar.rs:2222/nordisk/gunnar.git
cd gunnar
cargo build --release
```

README'en på [gunnar.rs/nordisk/gunnar](https://www.gunnar.rs/nordisk/gunnar) gennemgår en server, konsollen med en passkey, et første push, et krypteret repository og en twin, alt sammen på én Linux-vært. Vores integrationstests kører præcis de kommandoer i den rækkefølge. Vil du vide, hvordan Gunnar taler git uden git-programmet, og høre om det LFS-specialtilfælde, der fik et manglende objekt til at se ud, som om det var der, så læs vores [tekniske gennemgang](/blog/gunnar-a-git-server-with-no-database.html).

For at prøve den hostede tjeneste kan du [oprette dig på gunnar.rs](https://www.gunnar.rs/signup). Vil I have Gunnar på jeres egen hardware og gerne have hjælp til at få den derhen, så skriv til [info@vetra.se](mailto:info@vetra.se).
