# Ignalina ApS

*"We love the smell of motherboards in the morning"* — och vi gör ingenting annat än premiummjukvara.
Vi är ett renodlat skandinaviskt företag.
Våra applikationer levereras som open source, som SaaS och som hårdvaru-appliances.

**Våra SaaS-lösningar körs på finsk kärnkraft.**

## Produkter

![holger](holger.webp "44pt") **[holger](https://codeberg.org/nordisk/holger)** — immutable artifact repository i ren Rust.
Speglar från internet, Nexus eller Artifactory till oföränderliga znippy-arkiv för air-gappade miljöer:
content-addressed med Blake3, O(1) random access till filer, 2 MB RSS.

![znippy](znippy.webp "44pt") **[znippy](https://codeberg.org/nordisk/znippy)** — parallellt arkiv med random access, byggt på Apache Arrow IPC.
Packar en katalog i full fart på alla kärnor och plockar ut en enskild fil utan att packa upp resten;
indexet går att fråga direkt från DuckDB, Polars eller DataFusion.

![gunnar](gunnar.webp "44pt") **[gunnar](https://gunnar.rs)** — Git-server i Rust på Apache Arrow.
Två motorer: znippy (Arrow IPC på en maskin, eller ett fullt Apache Iceberg-kluster) eller gix på ett vanligt filsystem.
Inbyggd geo-replikering till en twin; gratis att hosta själv, eller hostad på gunnar.rs.

![skade](skade.webp "44pt") **[skade](https://codeberg.org/nordisk/skade)** — Apache Iceberg i ren Rust.
Katalogen vilar på ett statiskt sökträd med uppslag på nanosekunder och bäddas in in-process som en fil;
katalogläsningar uppmätta till 492× Nessie och 677× Polaris. SQL via DataFusion.

![korp](korp.webp "44pt") **korp** — en robottestbar egui-app över hela datavägen.
Hugin vakar över nuet: Spark-pipelines, en live FalkorDB-graf, ingest. Munin bär minnet:
Iceberg time-travel, kartor, utredningar. Levereras som en bootbar appliance.

![tunnr](tunnr.svg "44pt") **tunnr** — ramverk för bare-metal-appliances.
Minimala, distroless OS-images där en Rust-binär kör som PID 1, network-first:
WireGuard-tunneln är uppe före alla andra paket, i en VM eller på riktig hårdvara.

Kontakt: [rickard@ignalina.dk](mailto:rickard@ignalina.dk)
