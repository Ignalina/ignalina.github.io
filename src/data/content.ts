// Allt innehåll på sajten, från .nornir/site/index*.md. Sidorna
// bygger samma mall över dessa data, så en textändring görs här och bara här.

export type Lang = 'da' | 'sv' | 'nb' | 'fi' | 'is' | 'ja';

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
  intro: string;
  nuclear: string;
  /** Samarbetet med Vetra; företagsnamnet blir en länk. */
  partner: string;
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
  holger: 'https://www.gunnar.rs/nordisk/holger',
  znippy: 'https://www.gunnar.rs/nordisk/znippy',
  gunnar: 'https://www.gunnar.rs/nordisk/gunnar',
  skade: 'https://www.gunnar.rs/nordisk/skade',
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
    title: 'Ignalina ApS – open source-infrastruktur i Rust fra Danmark',
    description:
      'Ignalina ApS udvikler infrastruktur-software i Rust til egen drift, også i lukkede netværk: holger, znippy, gunnar, skade, korp og tunnr.',
    motto: MOTTO,
    intro:
      'Vi laver udelukkende premium-software og er en rent skandinavisk virksomhed. Vores applikationer leveres som open source, som SaaS og som hardware-appliances.',
    nuclear: 'Vores SaaS-løsninger kører på finsk atomkraft.',
    partner: 'Vi samarbejder med Vetra Automation AB, fordi vi tilbyder de samme produkter: Ignalina i Danmark og Vetra i Sverige.',
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
    title: 'Ignalina ApS – infrastruktur med öppen källkod i Rust från Danmark',
    description:
      'Ignalina ApS utvecklar infrastrukturmjukvara i Rust för egen drift, även i slutna nät: holger, znippy, gunnar, skade, korp och tunnr.',
    motto: MOTTO,
    intro:
      'Vi gör ingenting annat än premiummjukvara och är ett renodlat skandinaviskt företag. Våra applikationer levereras som open source, som SaaS och som hårdvaru-appliances.',
    nuclear: 'Våra SaaS-lösningar körs på finsk kärnkraft.',
    partner: 'Vi samarbetar med Vetra Automation AB, eftersom vi erbjuder samma produkter: Ignalina i Danmark och Vetra i Sverige.',
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

  nb: {
    lang: 'nb',
    langName: 'Norsk',
    flag: '/flag-nb.svg',
    path: 'index.nb.html',
    title: 'Ignalina ApS – infrastruktur med åpen kildekode i Rust fra Danmark',
    description:
      'Ignalina ApS utvikler infrastrukturprogramvare i Rust for egen drift, også i lukkede nett: holger, znippy, gunnar, skade, korp og tunnr.',
    motto: MOTTO,
    intro:
      'Vi lager utelukkende premium-programvare og er et rent skandinavisk selskap. Våre applikasjoner leveres som åpen kildekode, som SaaS og som maskinvare-appliances.',
    nuclear: 'Våre SaaS-løsninger kjører på finsk kjernekraft.',
    partner: 'Vi samarbeider med Vetra Automation AB fordi vi tilbyr de samme produktene: Ignalina i Danmark og Vetra i Sverige.',
    productsHeading: 'Produkter',
    blogLabel: 'Blogg',
    menuLabel: 'Meny',
    products: [
      {
        name: 'holger', icon: icons.holger, href: links.holger,
        what: 'Immutable artifact repository i ren Rust.',
        more: 'Speiler fra internett, Nexus eller Artifactory til uforanderlige znippy-arkiver for air-gappede miljøer: content-addressed med Blake3, O(1) random access til filer, 2 MB RSS.',
      },
      {
        name: 'znippy', icon: icons.znippy, href: links.znippy,
        what: 'Parallelt arkiv med random access, bygget på Apache Arrow IPC.',
        more: 'Pakker en mappe i full fart på alle kjerner og henter ut en enkelt fil uten å pakke ut resten; indeksen kan spørres direkte fra DuckDB, Polars eller DataFusion.',
      },
      {
        name: 'gunnar', icon: icons.gunnar, href: links.gunnar,
        what: 'Git-server i Rust på Apache Arrow.',
        more: 'To motorer: znippy (Arrow IPC på én maskin eller en full Apache Iceberg-klynge) eller gix på et vanlig filsystem. Innebygd geo-replikering til en twin; gratis å hoste selv, eller hostet på gunnar.rs.',
      },
      {
        name: 'skade', icon: icons.skade, href: links.skade,
        what: 'Apache Iceberg i ren Rust.',
        more: 'Katalogen hviler på et statisk søketre med oppslag på nanosekunder og kan bygges inn in-process som én fil; kataloglesninger målt til 492× Nessie og 677× Polaris. SQL via DataFusion.',
      },
      {
        name: 'korp', icon: icons.korp,
        what: 'Én robottestbar egui-app over hele dataveien.',
        more: 'Hugin følger med på nåtiden: Spark-pipelines, en live FalkorDB-graf, ingest. Munin bærer minnet: Iceberg time-travel, kart, etterforskninger. Leveres som en bootbar appliance.',
      },
      {
        name: 'tunnr', icon: icons.tunnr,
        what: 'Rammeverk for bare-metal-appliances.',
        more: 'Minimale, distroless OS-images der en Rust-binær kjører som PID 1, network-first: WireGuard-tunnelen er oppe før noen annen pakke, i en VM eller på ekte maskinvare.',
      },
    ],
    contactLabel: 'Kontakt',
    languagesLabel: 'Språk',
    skipLabel: 'Til innholdet',
    artAlt: 'To kjøletårn i blank krom som ryker binære tall i stedet for damp, en reaktorbygning med atomsymbol og en kromblank bil på en vei tegnet som kretsbaner.',
  },

  fi: {
    lang: 'fi',
    langName: 'Suomi',
    flag: '/flag-fi.svg',
    path: 'index.fi.html',
    title: 'Ignalina ApS – avoimen lähdekoodin infrastruktuuria Rustilla Tanskasta',
    description:
      'Ignalina ApS kehittää Rustilla infrastruktuuriohjelmistoja omaan ylläpitoon, myös suljettuihin verkkoihin: holger, znippy, gunnar, skade, korp ja tunnr.',
    motto: MOTTO,
    intro:
      'Emme tee muuta kuin premium-ohjelmistoja, ja olemme puhtaasti skandinaavinen yritys. Sovelluksemme toimitetaan open sourcena, SaaS-palveluna ja hardware-applianceina.',
    nuclear: 'SaaS-ratkaisumme toimivat suomalaisella ydinvoimalla.',
    partner: 'Teemme yhteistyötä Vetra Automation AB:n kanssa, koska tarjoamme samoja tuotteita: Ignalina Tanskassa ja Vetra Ruotsissa.',
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
    title: 'Ignalina ApS – innviðir með opnum kóða í Rust frá Danmörku',
    description:
      'Ignalina ApS þróar innviðahugbúnað í Rust til eigin reksturs, einnig á lokuðum netum: holger, znippy, gunnar, skade, korp og tunnr.',
    motto: MOTTO,
    intro:
      'Við gerum ekkert nema premium-hugbúnað og erum hreinræktað skandinavískt fyrirtæki. Forritin okkar eru afhent sem open source, sem SaaS og sem hardware-appliances.',
    nuclear: 'SaaS-lausnirnar okkar keyra á finnskri kjarnorku.',
    partner: 'Við vinnum með Vetra Automation AB, þar sem við bjóðum sömu vörur: Ignalina í Danmörku og Vetra í Svíþjóð.',
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
    title: 'Ignalina ApS – デンマーク発、Rust 製オープンソース基盤ソフトウェア',
    description:
      'Ignalina ApS は、自組織での運用や閉域網に向けた基盤ソフトウェアを Rust で開発しています。holger、znippy、gunnar、skade、korp、tunnr。',
    motto: MOTTO,
    intro:
      '私たちが作るのはプレミアムなソフトウェアだけです。私たちは純粋なスカンジナビアの企業です。アプリケーションはオープンソース、SaaS、ハードウェアアプライアンスとして提供しています。',
    nuclear: '私たちの SaaS ソリューションはフィンランドの原子力で動いています。',
    partner: '同じ製品を提供しているため、Vetra Automation AB と協力しています。デンマークでは Ignalina が、スウェーデンでは Vetra が提供します。',
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

export const langs: Lang[] = ['da', 'sv', 'nb', 'fi', 'is', 'ja'];
