# Ignalina ApS

*"We love the smell of motherboards in the morning"* — og við gerum ekkert nema premium-hugbúnað.
Við erum hreinræktað skandinavískt fyrirtæki.
Forritin okkar eru afhent sem open source, sem SaaS og sem hardware-appliances.

**SaaS-lausnirnar okkar keyra á finnskri kjarnorku.**

## Vörur

![holger](holger.webp "44pt") **[holger](https://codeberg.org/nordisk/holger)** — immutable artifact repository í hreinu Rust.
Speglar frá internetinu, Nexus eða Artifactory yfir í óbreytanleg znippy-söfn fyrir air-gapped umhverfi:
content-addressed með Blake3, O(1) random access að skrám, 2 MB RSS.

![znippy](znippy.webp "44pt") **[znippy](https://codeberg.org/nordisk/znippy)** — samhliða safn með random access, byggt á Apache Arrow IPC.
Pakkar möppu á fullum hraða allra kjarna og sækir staka skrá án þess að afpakka restina;
hægt er að spyrja vísinn beint úr DuckDB, Polars eða DataFusion.

![gunnar](gunnar.webp "44pt") **[gunnar](https://gunnar.rs)** — Git-þjónn í Rust á Apache Arrow.
Tvær vélar: znippy (Arrow IPC á einni vél, eða heill Apache Iceberg-klasi) eða gix á venjulegu skráakerfi.
Innbyggð geo-replication til twin; ókeypis að hýsa sjálfur, eða hýst á gunnar.rs.

![skade](skade.webp "44pt") **[skade](https://codeberg.org/nordisk/skade)** — Apache Iceberg í hreinu Rust.
Katalogurinn hvílir á kyrrstæðu leitartré með uppflettingum á nanósekúndum og er felldur inn in-process sem ein skrá;
lestur úr katalog mældur 492× Nessie og 677× Polaris. SQL í gegnum DataFusion.

![korp](korp.webp "44pt") **korp** — eitt egui-forrit, prófanlegt með vélmennum, yfir alla gagnaleiðina.
Hugin vakir yfir núinu: Spark-pipelines, lifandi FalkorDB-graf, ingest. Munin geymir minnið:
Iceberg time-travel, kort, rannsóknir. Afhent sem ræsanlegt appliance.

![tunnr](tunnr.svg "44pt") **tunnr** — rammi fyrir bare-metal appliances.
Lágmarks, distroless OS-images þar sem Rust-forrit keyrir sem PID 1, network-first:
WireGuard-göngin eru uppi á undan öllum öðrum pökkum, í sýndarvél eða á raunverulegum vélbúnaði.

Hafðu samband: [rickard@ignalina.dk](mailto:rickard@ignalina.dk)
