# Ignalina ApS

We love the smell of motherboards in the morning, and we do nothing but premium software.
Our applications are delivered as open source, as SaaS, and as hardware appliances.

## Products

![holger](holger.webp "44pt") **[holger](https://codeberg.org/nordisk/holger)** — immutable artifact repository in pure Rust.
Mirrors from the internet, Nexus or Artifactory into immutable znippy archives for air-gapped sites:
content-addressed with Blake3, O(1) random file access, 2 MB RSS.

![znippy](znippy.webp "44pt") **[znippy](https://codeberg.org/nordisk/znippy)** — parallel, random-access archive on Apache Arrow IPC.
Packs a directory at all-core speed and pulls any single file back without unpacking the rest;
the index is queryable straight from DuckDB, Polars or DataFusion.

![gunnar](gunnar.webp "44pt") **[gunnar](https://gunnar.rs)** — Git server in Rust on Apache Arrow.
Two engines: znippy (Arrow IPC on one machine, or a full Apache Iceberg cluster) or gix on a plain filesystem.
Built-in geo-replication to a twin; free to host yourself, or hosted at gunnar.rs.

![skade](skade.webp "44pt") **[skade](https://codeberg.org/nordisk/skade)** — pure-Rust Apache Iceberg.
The catalog rests on a static search tree with nanosecond lookups, and embeds in-process as one file;
catalog reads measured at 492× Nessie and 677× Polaris. SQL through DataFusion.

![korp](korp.webp "44pt") **korp** — one robot-testable egui app over the whole data path.
Hugin watches now: Spark pipelines, a live FalkorDB graph, ingest. Munin keeps the memory:
Iceberg time-travel, maps, investigations. Ships as a bootable appliance.

![tunnr](tunnr.svg "44pt") **tunnr** — bare-metal appliance framework.
Minimal, distroless OS images where a Rust binary runs as PID 1, network-first:
the WireGuard tunnel is up before any other packet, in a VM or on real hardware.

Contact: [rickard@ignalina.dk](mailto:rickard@ignalina.dk)
