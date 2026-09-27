# Ignalina ApS

*"We love the smell of motherboards in the morning"* — emmekä tee muuta kuin premium-ohjelmistoja.
Olemme puhtaasti skandinaavinen yritys.
Sovelluksemme toimitetaan open sourcena, SaaS-palveluna ja hardware-applianceina.

**SaaS-ratkaisumme toimivat suomalaisella ydinvoimalla.**

## Tuotteet

![holger](holger.webp "44pt") **[holger](https://codeberg.org/nordisk/holger)** — immutable artifact repository puhtaalla Rustilla.
Peilaa internetistä, Nexuksesta tai Artifactorysta muuttumattomiin znippy-arkistoihin air-gapped-ympäristöihin:
content-addressed Blake3:lla, O(1) random access tiedostoihin, 2 MB RSS.

![znippy](znippy.webp "44pt") **[znippy](https://codeberg.org/nordisk/znippy)** — rinnakkainen random access -arkisto Apache Arrow IPC:n päällä.
Pakkaa hakemiston kaikkien ytimien nopeudella ja hakee yksittäisen tiedoston purkamatta muuta;
indeksiä voi kysellä suoraan DuckDB:stä, Polarsista tai DataFusionista.

![gunnar](gunnar.webp "44pt") **[gunnar](https://gunnar.rs)** — Git-palvelin Rustilla Apache Arrown päällä.
Kaksi moottoria: znippy (Arrow IPC yhdellä koneella tai täysi Apache Iceberg -klusteri) tai gix tavallisella tiedostojärjestelmällä.
Sisäänrakennettu geo-replikointi twinille; ilmainen isännöidä itse, tai isännöitynä gunnar.rs:ssä.

![skade](skade.webp "44pt") **[skade](https://codeberg.org/nordisk/skade)** — Apache Iceberg puhtaalla Rustilla.
Katalogi perustuu staattiseen hakupuuhun, jonka haut kestävät nanosekunteja, ja se upotetaan in-process yhtenä tiedostona;
katalogiluvut mitattu 492× Nessieen ja 677× Polarikseen verrattuna. SQL DataFusionin kautta.

![korp](korp.webp "44pt") **korp** — yksi robotilla testattava egui-sovellus koko datapolun yli.
Hugin valvoo nykyhetkeä: Spark-pipelinet, live FalkorDB-graafi, ingest. Munin kantaa muistia:
Iceberg time-travel, kartat, tutkinnat. Toimitetaan käynnistettävänä appliancena.

![tunnr](tunnr.svg "44pt") **tunnr** — bare-metal-appliance-kehys.
Minimaaliset, distroless OS-imaget, joissa Rust-binääri ajetaan PID 1:nä, network-first:
WireGuard-tunneli on ylhäällä ennen yhtäkään muuta pakettia, virtuaalikoneessa tai oikealla raudalla.

Yhteystiedot: [rickard@ignalina.dk](mailto:rickard@ignalina.dk)
