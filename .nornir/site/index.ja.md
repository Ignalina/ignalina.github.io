# Ignalina ApS

*"We love the smell of motherboards in the morning"* — そして私たちが作るのはプレミアムなソフトウェアだけです。私たちは純粋なスカンジナビアの企業です。アプリケーションはオープンソース、SaaS、ハードウェアアプライアンスとして提供しています。

**私たちの SaaS ソリューションはフィンランドの原子力で動いています。**

## 製品

![holger](holger.webp "44pt") **[holger](https://codeberg.org/nordisk/holger)** — 純 Rust 製の immutable artifact repository。インターネット、Nexus、Artifactory からミラーし、air-gapped 環境向けの不変な znippy アーカイブに収めます。Blake3 による content-addressed、ファイルへの O(1) random access、RSS はわずか 2 MB。

![znippy](znippy.webp "44pt") **[znippy](https://codeberg.org/nordisk/znippy)** — Apache Arrow IPC 上の、random access 可能な並列アーカイブ。全コアの速度でディレクトリをパックし、残りを展開せずに任意の 1 ファイルだけを取り出せます。インデックスは DuckDB、Polars、DataFusion から直接クエリできます。

![gunnar](gunnar.webp "44pt") **[gunnar](https://gunnar.rs)** — Apache Arrow 上の Rust 製 Git サーバー。2 つのエンジン:znippy(1 台のマシン上の Arrow IPC、または本格的な Apache Iceberg クラスター)、または通常のファイルシステム上の gix。twin への geo-replication を内蔵。セルフホストは無料、または gunnar.rs でホスティング。

![skade](skade.webp "44pt") **[skade](https://codeberg.org/nordisk/skade)** — 純 Rust 製の Apache Iceberg。カタログはナノ秒単位で引ける静的な探索木の上にあり、1 ファイルとして in-process に組み込めます。カタログ読み取りは Nessie の 492 倍、Polaris の 677 倍を計測。SQL は DataFusion 経由。

![korp](korp.webp "44pt") **korp** — データ経路全体をカバーする、ロボットでテスト可能な egui アプリ。Hugin は「今」を見張ります:Spark pipelines、ライブの FalkorDB グラフ、ingest。Munin は記憶を担います:Iceberg time-travel、地図、調査。起動可能なアプライアンスとして提供。

![tunnr](tunnr.svg "44pt") **tunnr** — bare-metal アプライアンスのためのフレームワーク。Rust バイナリが PID 1 として動く、最小限の distroless OS イメージ。network-first:ほかのどのパケットよりも先に WireGuard トンネルが立ち上がります。VM でも実機でも。

お問い合わせ:[rickard@ignalina.dk](mailto:rickard@ignalina.dk)
