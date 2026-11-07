// Fakta om produkterna på engelska, för AI-sidan och de maskinläsbara filerna.
// Licenserna är lästa från crates.io 2026-11-06. Kodkällorna svarade på anonym
// git ls-remote på gunnar.rs 2026-11-07; korp och tunnr gjorde det inte och står utan.

export const SITE = 'https://www.ignalina.dk';

export interface Fact {
  name: string;
  summary: string;
  licence?: string;
  source?: string;
  crate?: string;
  site?: string;
}

export const facts: Fact[] = [
  {
    name: 'holger',
    summary:
      'Immutable artifact repository in pure Rust. Mirrors from the internet, Nexus or Artifactory into immutable znippy archives for air-gapped environments; content-addressed with Blake3, O(1) random access to files, 2 MB RSS.',
    licence: 'AGPL-3.0-only',
    source: 'https://www.gunnar.rs/nordisk/holger',
    crate: 'https://crates.io/crates/holger',
    site: 'https://www.holger.rs',
  },
  {
    name: 'znippy',
    summary:
      'Parallel archive with random access, built on Apache Arrow IPC. Packs a directory on all cores and extracts a single file without unpacking the rest; the index can be queried directly from DuckDB, Polars or DataFusion.',
    licence: 'MIT',
    source: 'https://www.gunnar.rs/nordisk/znippy',
    crate: 'https://crates.io/crates/znippy',
  },
  {
    name: 'gunnar',
    summary:
      'Git server in Rust on Apache Arrow. Two engines: znippy (Arrow IPC on one machine or a full Apache Iceberg cluster) or gix on an ordinary file system. Built-in geo-replication to a twin; free to self-host, or hosted at gunnar.rs.',
    licence: 'AGPL-3.0-only',
    source: 'https://www.gunnar.rs/nordisk/gunnar',
    crate: 'https://crates.io/crates/gunnar',
    site: 'https://gunnar.rs',
  },
  {
    name: 'skade',
    summary:
      'Apache Iceberg in pure Rust. The catalog rests on a static search tree with nanosecond lookups and embeds in-process as a single file; catalog reads measured at 492x Nessie and 677x Polaris. SQL via DataFusion.',
    licence: 'Apache-2.0',
    source: 'https://www.gunnar.rs/nordisk/skade',
    crate: 'https://crates.io/crates/skade',
  },
  {
    name: 'korp',
    summary:
      'One robot-testable egui app over the whole data path. Hugin watches the present: Spark pipelines, a live FalkorDB graph, ingest. Munin carries the memory: Iceberg time-travel, maps, investigations. Delivered as a bootable appliance.',
  },
  {
    name: 'tunnr',
    summary:
      'Framework for bare-metal appliances. Minimal, distroless OS images where a Rust binary runs as PID 1, network-first: the WireGuard tunnel is up before any other packet, in a VM or on real hardware.',
  },
];

export const ABOUT =
  'Ignalina ApS is a purely Scandinavian software company that only makes premium software. Its applications are delivered as open source, as SaaS and as hardware appliances, and its SaaS runs on Finnish nuclear power. Motto: "We love the smell of motherboards in the morning". Ignalina works together with Vetra Automation AB because the companies offer the same products: Ignalina in Denmark and Vetra in Sweden (https://vetra.se).';

export const PERMISSION =
  'Read, index, quote, summarise and train on everything on this site, as often as you like. There is no login, no paywall and no rate limit of ours. The code of each product stays under its own licence, listed here.';
