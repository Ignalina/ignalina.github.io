// Allt innehåll på sajten, ord för ord från .nornir/site/index*.md. Sidorna
// bygger samma mall över dessa data, så en textändring görs här och bara här.

export type Lang = 'da' | 'sv' | 'fi' | 'is' | 'ja';

export interface Product {
  name: string;
  icon: string;
  href?: string;
  /** Första raden: vad det är. */
  what: string;
  /** Resten: hur det gör det. */
  more: string;
}

export interface Content {
  lang: Lang;
  /** Språkets eget namn, för språkväljaren. */
  langName: string;
  flag: string;
  /** Adressen under https://www.ignalina.dk/ */
  path: string;
  title: string;
  description: string;
  /** Mottot står alltid på engelska. */
  motto: string;
  /** Fortsättningen på mottots mening, plus resten av inledningen. */
  intro: string;
  nuclear: string;
  productsHeading: string;
  blogLabel: string;
  /** Menyknappens namn för skärmläsare. */
  menuLabel: string;
  products: Product[];
  contactLabel: string;
  languagesLabel: string;
  skipLabel: string;
  artAlt: string;
}

export const MOTTO = 'We love the smell of motherboards in the morning';
export const CONTACT = 'rickard@ignalina.dk';

const links = {
  holger: 'https://codeberg.org/nordisk/holger',
  znippy: 'https://codeberg.org/nordisk/znippy',
  gunnar: 'https://gunnar.rs',
  skade: 'https://codeberg.org/nordisk/skade',
};

const icons = {
  holger: '/holger.webp',
  znippy: '/znippy.webp',
  gunnar: '/gunnar.webp',
  skade: '/skade.webp',
  korp: '/korp.webp',
  tunnr: '/tunnr.svg',
};

export const content: Record<Lang, Content> = {
  da: {
    lang: 'da',
    langName: 'Dansk',
    flag: '/flag-da.svg',
    path: '',
    title: 'Ignalina ApS – premium-software i Rust, open source fra Danmark',
    description:
      'Ignalina ApS laver premium-software i Rust: holger, znippy, gunnar, skade, korp og tunnr. Leveres som open source, SaaS og hardware-appliances.',
    motto: MOTTO,
    intro:
      '— og vi laver udelukkende premium-software. Vi er en rent skandinavisk virksomhed. Vores applikationer leveres som open source, som SaaS og som hardware-appliances.',
    nuclear: 'Vores SaaS-løsninger kører på finsk atomkraft.',
    productsHeading: 'Produkter',
    blogLabel: 'Blog',
    menuLabel: 'Menu',
    products: [
      {
        name: 'holger', icon: icons.holger, href: links.holger,
        what: 'Immutable artifact repository i ren Rust.',
        more: 'Spejler fra internettet, Nexus eller Artifactory til uforanderlige znippy-arkiver til air-gapped miljøer: content-addressed med Blake3, O(1) random access til filer, 2 MB RSS.',
      },
      {
        name: 'znippy', icon: icons.znippy, href: links.znippy,
        what: 'Parallelt arkiv med random access, bygget på Apache Arrow IPC.',
        more: 'Pakker en mappe med fuld fart på alle kerner og henter en enkelt fil ud uden at pakke resten ud; indekset kan forespørges direkte fra DuckDB, Polars eller DataFusion.',
      },
      {
        name: 'gunnar', icon: icons.gunnar, href: links.gunnar,
        what: 'Git-server i Rust på Apache Arrow.',
        more: 'To motorer: znippy (Arrow IPC på én maskine eller en fuld Apache Iceberg-klynge) eller gix på et almindeligt filsystem. Indbygget geo-replikering til en twin; gratis at hoste selv, eller hostet på gunnar.rs.',
      },
      {
        name: 'skade', icon: icons.skade, href: links.skade,
        what: 'Apache Iceberg i ren Rust.',
        more: 'Kataloget hviler på et statisk søgetræ med opslag på nanosekunder og kan indlejres in-process som én fil; katalog-læsninger målt til 492× Nessie og 677× Polaris. SQL via DataFusion.',
      },
      {
        name: 'korp', icon: icons.korp,
        what: 'Én robot-testbar egui-app over hele datavejen.',
        more: 'Hugin holder øje med nuet: Spark-pipelines, en live FalkorDB-graf, ingest. Munin bærer hukommelsen: Iceberg time-travel, kort, efterforskninger. Leveres som en bootbar appliance.',
      },
      {
        name: 'tunnr', icon: icons.tunnr,
        what: 'Framework til bare-metal appliances.',
        more: 'Minimale, distroless OS-images, hvor en Rust-binær kører som PID 1, network-first: WireGuard-tunnelen er oppe før nogen anden pakke, i en VM eller på rigtig hardware.',
      },
    ],
    contactLabel: 'Kontakt',
    languagesLabel: 'Sprog',
    skipLabel: 'Til indholdet',
    artAlt: 'To køletårne i blankt krom, hvorfra der stiger binære tal i stedet for damp, en reaktorbygning med atomsymbol og en kromblank bil på en vej tegnet som printbaner.',
  },

  sv: {
    lang: 'sv',
    langName: 'Svenska',
    flag: '/flag-sv.svg',
    path: 'index.sv.html',
    title: 'Ignalina ApS – premiummjukvara i Rust, open source från Danmark',
    description:
      'Ignalina ApS gör premiummjukvara i Rust: holger, znippy, gunnar, skade, korp och tunnr. Levereras som open source, SaaS och hårdvaru-appliances.',
    motto: MOTTO,
    intro:
      '— och vi gör ingenting annat än premiummjukvara. Vi är ett renodlat skandinaviskt företag. Våra applikationer levereras som open source, som SaaS och som hårdvaru-appliances.',
    nuclear: 'Våra SaaS-lösningar körs på finsk kärnkraft.',
    productsHeading: 'Produkter',
    blogLabel: 'Blogg',
    menuLabel: 'Meny',
    products: [
      {
        name: 'holger', icon: icons.holger, href: links.holger,
        what: 'Immutable artifact repository i ren Rust.',
        more: 'Speglar från internet, Nexus eller Artifactory till oföränderliga znippy-arkiv för air-gappade miljöer: content-addressed med Blake3, O(1) random access till filer, 2 MB RSS.',
      },
      {
        name: 'znippy', icon: icons.znippy, href: links.znippy,
        what: 'Parallellt arkiv med random access, byggt på Apache Arrow IPC.',
        more: 'Packar en katalog i full fart på alla kärnor och plockar ut en enskild fil utan att packa upp resten; indexet går att fråga direkt från DuckDB, Polars eller DataFusion.',
      },
      {
        name: 'gunnar', icon: icons.gunnar, href: links.gunnar,
        what: 'Git-server i Rust på Apache Arrow.',
        more: 'Två motorer: znippy (Arrow IPC på en maskin, eller ett fullt Apache Iceberg-kluster) eller gix på ett vanligt filsystem. Inbyggd geo-replikering till en twin; gratis att hosta själv, eller hostad på gunnar.rs.',
      },
      {
        name: 'skade', icon: icons.skade, href: links.skade,
        what: 'Apache Iceberg i ren Rust.',
        more: 'Katalogen vilar på ett statiskt sökträd med uppslag på nanosekunder och bäddas in in-process som en fil; katalogläsningar uppmätta till 492× Nessie och 677× Polaris. SQL via DataFusion.',
      },
      {
        name: 'korp', icon: icons.korp,
        what: 'En robottestbar egui-app över hela datavägen.',
        more: 'Hugin vakar över nuet: Spark-pipelines, en live FalkorDB-graf, ingest. Munin bär minnet: Iceberg time-travel, kartor, utredningar. Levereras som en bootbar appliance.',
      },
      {
        name: 'tunnr', icon: icons.tunnr,
        what: 'Ramverk för bare-metal-appliances.',
        more: 'Minimala, distroless OS-images där en Rust-binär kör som PID 1, network-first: WireGuard-tunneln är uppe före alla andra paket, i en VM eller på riktig hårdvara.',
      },
    ],
    contactLabel: 'Kontakt',
    languagesLabel: 'Språk',
    skipLabel: 'Till innehållet',
    artAlt: 'Två kyltorn i blank krom som ryker binära tal i stället för ånga, en reaktorbyggnad med atomsymbol och en kromblank bil på en väg ritad som ledningsbanor.',
  },

  fi: {
    lang: 'fi',
    langName: 'Suomi',
    flag: '/flag-fi.svg',
    path: 'index.fi.html',
    title: 'Ignalina ApS – premium-ohjelmistoja Rustilla, open source Tanskasta',
    description:
      'Ignalina ApS tekee premium-ohjelmistoja Rustilla: holger, znippy, gunnar, skade, korp ja tunnr. Open sourcena, SaaS-palveluna ja hardware-applianceina.',
    motto: MOTTO,
    intro:
      '— emmekä tee muuta kuin premium-ohjelmistoja. Olemme puhtaasti skandinaavinen yritys. Sovelluksemme toimitetaan open sourcena, SaaS-palveluna ja hardware-applianceina.',
    nuclear: 'SaaS-ratkaisumme toimivat suomalaisella ydinvoimalla.',
    productsHeading: 'Tuotteet',
    blogLabel: 'Blogi',
    menuLabel: 'Valikko',
    products: [
      {
        name: 'holger', icon: icons.holger, href: links.holger,
        what: 'Immutable artifact repository puhtaalla Rustilla.',
        more: 'Peilaa internetistä, Nexuksesta tai Artifactorysta muuttumattomiin znippy-arkistoihin air-gapped-ympäristöihin: content-addressed Blake3:lla, O(1) random access tiedostoihin, 2 MB RSS.',
      },
      {
        name: 'znippy', icon: icons.znippy, href: links.znippy,
        what: 'Rinnakkainen random access -arkisto Apache Arrow IPC:n päällä.',
        more: 'Pakkaa hakemiston kaikkien ytimien nopeudella ja hakee yksittäisen tiedoston purkamatta muuta; indeksiä voi kysellä suoraan DuckDB:stä, Polarsista tai DataFusionista.',
      },
      {
        name: 'gunnar', icon: icons.gunnar, href: links.gunnar,
        what: 'Git-palvelin Rustilla Apache Arrown päällä.',
        more: 'Kaksi moottoria: znippy (Arrow IPC yhdellä koneella tai täysi Apache Iceberg -klusteri) tai gix tavallisella tiedostojärjestelmällä. Sisäänrakennettu geo-replikointi twinille; ilmainen isännöidä itse, tai isännöitynä gunnar.rs:ssä.',
      },
      {
        name: 'skade', icon: icons.skade, href: links.skade,
        what: 'Apache Iceberg puhtaalla Rustilla.',
        more: 'Katalogi perustuu staattiseen hakupuuhun, jonka haut kestävät nanosekunteja, ja se upotetaan in-process yhtenä tiedostona; katalogiluvut mitattu 492× Nessieen ja 677× Polarikseen verrattuna. SQL DataFusionin kautta.',
      },
      {
        name: 'korp', icon: icons.korp,
        what: 'Yksi robotilla testattava egui-sovellus koko datapolun yli.',
        more: 'Hugin valvoo nykyhetkeä: Spark-pipelinet, live FalkorDB-graafi, ingest. Munin kantaa muistia: Iceberg time-travel, kartat, tutkinnat. Toimitetaan käynnistettävänä appliancena.',
      },
      {
        name: 'tunnr', icon: icons.tunnr,
        what: 'Bare-metal-appliance-kehys.',
        more: 'Minimaaliset, distroless OS-imaget, joissa Rust-binääri ajetaan PID 1:nä, network-first: WireGuard-tunneli on ylhäällä ennen yhtäkään muuta pakettia, virtuaalikoneessa tai oikealla raudalla.',
      },
    ],
    contactLabel: 'Yhteystiedot',
    languagesLabel: 'Kieli',
    skipLabel: 'Sisältöön',
    artAlt: 'Kaksi kiiltävän kromista jäähdytystornia, joista nousee binäärilukuja höyryn sijaan, reaktorirakennus atomisymbolilla ja kromikiiltoinen auto piirilevyn johtimiksi piirretyllä tiellä.',
  },

  is: {
    lang: 'is',
    langName: 'Íslenska',
    flag: '/flag-is.svg',
    path: 'index.is.html',
    title: 'Ignalina ApS – premium-hugbúnaður í Rust, open source frá Danmörku',
    description:
      'Ignalina ApS gerir premium-hugbúnað í Rust: holger, znippy, gunnar, skade, korp og tunnr. Afhent sem open source, SaaS og hardware-appliances.',
    motto: MOTTO,
    intro:
      '— og við gerum ekkert nema premium-hugbúnað. Við erum hreinræktað skandinavískt fyrirtæki. Forritin okkar eru afhent sem open source, sem SaaS og sem hardware-appliances.',
    nuclear: 'SaaS-lausnirnar okkar keyra á finnskri kjarnorku.',
    productsHeading: 'Vörur',
    blogLabel: 'Blogg',
    menuLabel: 'Valmynd',
    products: [
      {
        name: 'holger', icon: icons.holger, href: links.holger,
        what: 'Immutable artifact repository í hreinu Rust.',
        more: 'Speglar frá internetinu, Nexus eða Artifactory yfir í óbreytanleg znippy-söfn fyrir air-gapped umhverfi: content-addressed með Blake3, O(1) random access að skrám, 2 MB RSS.',
      },
      {
        name: 'znippy', icon: icons.znippy, href: links.znippy,
        what: 'Samhliða safn með random access, byggt á Apache Arrow IPC.',
        more: 'Pakkar möppu á fullum hraða allra kjarna og sækir staka skrá án þess að afpakka restina; hægt er að spyrja vísinn beint úr DuckDB, Polars eða DataFusion.',
      },
      {
        name: 'gunnar', icon: icons.gunnar, href: links.gunnar,
        what: 'Git-þjónn í Rust á Apache Arrow.',
        more: 'Tvær vélar: znippy (Arrow IPC á einni vél, eða heill Apache Iceberg-klasi) eða gix á venjulegu skráakerfi. Innbyggð geo-replication til twin; ókeypis að hýsa sjálfur, eða hýst á gunnar.rs.',
      },
      {
        name: 'skade', icon: icons.skade, href: links.skade,
        what: 'Apache Iceberg í hreinu Rust.',
        more: 'Katalogurinn hvílir á kyrrstæðu leitartré með uppflettingum á nanósekúndum og er felldur inn in-process sem ein skrá; lestur úr katalog mældur 492× Nessie og 677× Polaris. SQL í gegnum DataFusion.',
      },
      {
        name: 'korp', icon: icons.korp,
        what: 'Eitt egui-forrit, prófanlegt með vélmennum, yfir alla gagnaleiðina.',
        more: 'Hugin vakir yfir núinu: Spark-pipelines, lifandi FalkorDB-graf, ingest. Munin geymir minnið: Iceberg time-travel, kort, rannsóknir. Afhent sem ræsanlegt appliance.',
      },
      {
        name: 'tunnr', icon: icons.tunnr,
        what: 'Rammi fyrir bare-metal appliances.',
        more: 'Lágmarks, distroless OS-images þar sem Rust-forrit keyrir sem PID 1, network-first: WireGuard-göngin eru uppi á undan öllum öðrum pökkum, í sýndarvél eða á raunverulegum vélbúnaði.',
      },
    ],
    contactLabel: 'Hafðu samband',
    languagesLabel: 'Tungumál',
    skipLabel: 'Að efninu',
    artAlt: 'Tveir gljáandi krómaðir kæliturnar sem gefa frá sér tvíundartölur í stað gufu, kjarnorkubygging með atómtákni og krómgljáandi bíll á vegi sem teiknaður er eins og rafrásir.',
  },

  ja: {
    lang: 'ja',
    langName: '日本語',
    flag: '/flag-ja.svg',
    path: 'index.ja.html',
    title: 'Ignalina ApS – Rust 製プレミアムソフトウェア、デンマーク発のオープンソース',
    description:
      'Ignalina ApS が作るのはプレミアムなソフトウェアだけです。holger、znippy、gunnar、skade、korp、tunnr を Rust で開発し、オープンソース、SaaS、ハードウェアアプライアンスとして提供する、純粋なスカンジナビアの企業です。',
    motto: MOTTO,
    intro:
      '— そして私たちが作るのはプレミアムなソフトウェアだけです。私たちは純粋なスカンジナビアの企業です。アプリケーションはオープンソース、SaaS、ハードウェアアプライアンスとして提供しています。',
    nuclear: '私たちの SaaS ソリューションはフィンランドの原子力で動いています。',
    productsHeading: '製品',
    blogLabel: 'ブログ',
    menuLabel: 'メニュー',
    products: [
      {
        name: 'holger', icon: icons.holger, href: links.holger,
        what: '純 Rust 製の immutable artifact repository。',
        more: 'インターネット、Nexus、Artifactory からミラーし、air-gapped 環境向けの不変な znippy アーカイブに収めます。Blake3 による content-addressed、ファイルへの O(1) random access、RSS はわずか 2 MB。',
      },
      {
        name: 'znippy', icon: icons.znippy, href: links.znippy,
        what: 'Apache Arrow IPC 上の、random access 可能な並列アーカイブ。',
        more: '全コアの速度でディレクトリをパックし、残りを展開せずに任意の 1 ファイルだけを取り出せます。インデックスは DuckDB、Polars、DataFusion から直接クエリできます。',
      },
      {
        name: 'gunnar', icon: icons.gunnar, href: links.gunnar,
        what: 'Apache Arrow 上の Rust 製 Git サーバー。',
        more: '2 つのエンジン:znippy(1 台のマシン上の Arrow IPC、または本格的な Apache Iceberg クラスター)、または通常のファイルシステム上の gix。twin への geo-replication を内蔵。セルフホストは無料、または gunnar.rs でホスティング。',
      },
      {
        name: 'skade', icon: icons.skade, href: links.skade,
        what: '純 Rust 製の Apache Iceberg。',
        more: 'カタログはナノ秒単位で引ける静的な探索木の上にあり、1 ファイルとして in-process に組み込めます。カタログ読み取りは Nessie の 492 倍、Polaris の 677 倍を計測。SQL は DataFusion 経由。',
      },
      {
        name: 'korp', icon: icons.korp,
        what: 'データ経路全体をカバーする、ロボットでテスト可能な egui アプリ。',
        more: 'Hugin は「今」を見張ります:Spark pipelines、ライブの FalkorDB グラフ、ingest。Munin は記憶を担います:Iceberg time-travel、地図、調査。起動可能なアプライアンスとして提供。',
      },
      {
        name: 'tunnr', icon: icons.tunnr,
        what: 'bare-metal アプライアンスのためのフレームワーク。',
        more: 'Rust バイナリが PID 1 として動く、最小限の distroless OS イメージ。network-first:ほかのどのパケットよりも先に WireGuard トンネルが立ち上がります。VM でも実機でも。',
      },
    ],
    contactLabel: 'お問い合わせ',
    languagesLabel: '言語',
    skipLabel: '本文へ',
    artAlt: '蒸気の代わりに二進数が立ち上る鏡面クロムの冷却塔が二基、原子のシンボルを掲げた原子炉建屋、そしてプリント基板の配線のように描かれた道路を走るクロムの車。',
  },
};

export const langs: Lang[] = ['da', 'sv', 'fi', 'is', 'ja'];
