# Ignalina ApS

We love the smell of motherboards in the morning, and we do nothing but premium software.

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

Contact: [rickard@ignalina.dk](mailto:rickard@ignalina.dk)
