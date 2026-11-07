# Korp: one app over the whole data path, and a UI robots can read

2026-08-06, Rickard. Original: https://vetra.se/blog/korp-one-app-over-the-whole-data-path/

Korp is Swedish for raven, and the app is named after Odin's two: Hugin, who watches what is happening now, and Munin, who keeps the memory. That split is the whole product. Hugin is the live half: Spark pipeline runs, graph queries, data in flight. Munin is the historical half: time-travelling tables, maps, and the investigations you open when something looks wrong.

It is one Rust egui application sitting over the Swedish open-data stack, and it is deliberately thin. Every view is a small use of a library that already exists elsewhere in our constellation. Korp is the control plane, not a new engine.

## Six views, five of them working

The app is a set of views over the same data path:

- **Pipelines.** Spark Declarative Pipelines and Connect, with the job DAG and live progress.
- **Graph.** Cypher against a live FalkorDB, rendered as nodes and edges. A legible uniform-blue wireframe by default, with a colour-by-type toggle for the pinned ontology palette.
- **Tables.** Browse and time-travel Iceberg tables. Pick a snapshot from a newest-first picker and load that frame, which is the part people reach for when they need to know what the data said last Tuesday.
- **Map.** Entities on a map for geospatial work, over GeoParquet.
- **Investigations.** Create and track findings over the data. Munin's memory, in practice.
- **Ingest.** Watch a simulated population stream into a chosen graph or warehouse. Partially built; the others are working today.

Sign-in is OIDC over the RFC 8628 device-code flow, reusing the same auth client the rest of the stack uses, so a probe against a token-guarded server authenticates with a bearer token on its outbound calls rather than a bespoke login.

## The demo is the whole path, in one command

The thing we are proudest of is not a view, it is that `korp demo` runs the entire data path end to end from a single command: a simulated population lands in Iceberg, gets read back out, is loaded into a FalkorDB graph, and shows up in Korp's own UI. No new engines are involved anywhere in that chain. It is existing crates wired together, which is the point: if the demo runs, the integration is real.

A second entry point runs the same path live with no shell at all. One Rust binary brings FalkorDB up over the container REST API directly, rather than shelling out to `podman exec`, and can additionally stand up a real Spark Connect server and drive a live Declarative Pipeline through it, or serve the pipeline viewer over HTTP with server-sent events.

An end-to-end test asserts the property that actually matters across that chain: **Iceberg rows in equals graph nodes out**. It is the one assertion that catches a silently lossy stage, and it runs in a container so it checks the packaged artifact rather than a developer's laptop.

## A UI that tests without a display

GUI testing is usually either screenshot diffing, which breaks on a font update, or driving widgets through an accessibility layer, which is slow and awkward. Korp does neither. The entire UI state serialises to a JSON file roughly every 300 ms: which tab is active, what tabs exist, and each view's own state.

A test therefore asserts on data instead of pixels, and needs no display at all. It is the same introspection contract the underlying viewer crates use, so it composes rather than being bolted onto this one app. Two of the most recent commits in the repository are exactly the kind of bug this catches: the state dump named seven tabs' splits while staying silent about eight others, and a set of tabs that turned out to be one pane pretending to be a layout. Neither is visible in a screenshot. Both are obvious in the JSON.

## It ships as an appliance

Korp packages as a bootable appliance that runs the demo to completion under virtualization, with the graph database bundled in. The container boots straight into the demo and produces a fixed, checkable result: 12120 rows across 12 tables becoming 12120 graph nodes and 6 hotspots. Those numbers are the assertion, not decoration.

There are two deployment shapes over one WireGuard spine. One is a bare-metal appliance built with [tunnr](/blog/tunnr-a-distroless-wireguard-appliance.html), where the Korp GUI is PID 1 on a distroless image with no shell underneath it. The other is a hosted container reached over RDP. Same application, same demo, different trust boundary depending on where the data is allowed to live.

## Where it stands

Five of six views work today and the sixth is scaffolded. The demo path runs in one command, the appliance boots and asserts its own output, and the headless state contract makes the UI testable in CI. The repository is private while the constellation it sits in settles.

If a control plane over your own data stack is something you need, or the headless UI-testing approach is useful to you, we are happy to talk: [info@vetra.se](mailto:info@vetra.se).
