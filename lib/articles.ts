export type ArticleSection = {
  type: "lead" | "h2" | "h3" | "paragraph" | "quote" | "list";
  text?: string;
  items?: string[];
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  date: string;
  readingTime: string;
  coverImage?: string;
  content: ArticleSection[];
};

const PLACEHOLDER_LEAD = "Ez a cikk hamarosan elérhető lesz.";

function placeholderContent(): ArticleSection[] {
  return [{ type: "lead", text: PLACEHOLDER_LEAD }];
}

export const allArticles: Article[] = [
  {
    slug: "gpt-5-kis-cegek",
    title: "GPT-5 és a kis cégek: mit jelent ez valójában?",
    excerpt:
      "Az OpenAI legújabb modellje megjelent — de mit változtat ez egy 10 fős vállalkozás napi működésén?",
    tag: "AI HÍREK",
    date: "2026. április 27.",
    readingTime: "~ 4 perc olvasás",
    coverImage: undefined,
    content: placeholderContent(),
  },
  {
    slug: "ugyfelszolgalat-automatizalas-2026",
    title: "Automatizálható-e az ügyfélszolgálat 2026-ban?",
    excerpt:
      "Három magyar KKV tapasztalatai alapján nézzük meg, hol érdemes AI-t bevetni és hol nem.",
    tag: "ÜZLETI ELEMZÉS",
    date: "2026. április 20.",
    readingTime: "~ 4 perc olvasás",
    coverImage: undefined,
    content: placeholderContent(),
  },
  {
    slug: "helyi-ai-modellek-adatvedelem",
    title: "Helyi AI modellek: az adatvédelem új korszaka",
    excerpt:
      "A self-hosted megoldások egyre elérhetőbbek. Mi kell hozzá és mikor éri meg?",
    tag: "TRENDEK",
    date: "2026. április 13.",
    readingTime: "~ 4 perc olvasás",
    coverImage: undefined,
    content: placeholderContent(),
  },
  {
    slug: "n8n-workflow-automatizacio",
    title: "n8n workflow automatizáció kezdőknek",
    excerpt:
      "A legnépszerűbb nyílt forráskódú automatizációs eszköz — hogyan kezdj el vele?",
    tag: "LEHETŐSÉGEK",
    date: "2026. április 6.",
    readingTime: "~ 4 perc olvasás",
    coverImage: undefined,
    content: placeholderContent(),
  },
  {
    slug: "claude-37-sonnet-uzleti-elet",
    title: "Claude 3.7 Sonnet: mire jó az üzleti életben?",
    excerpt:
      "Az Anthropic legújabb modelljének üzleti alkalmazásai és korlátai.",
    tag: "AI HÍREK",
    date: "2026. március 30.",
    readingTime: "~ 4 perc olvasás",
    coverImage: undefined,
    content: placeholderContent(),
  },
  {
    slug: "ai-asszisztens-vs-integracio",
    title: "AI asszisztens vs. AI integráció: mi a különbség?",
    excerpt:
      "Sokan összekeverik a két fogalmat. A különbség megértése meghatározza a stratégiát.",
    tag: "ÜZLETI ELEMZÉS",
    date: "2026. március 23.",
    readingTime: "~ 4 perc olvasás",
    coverImage: undefined,
    content: placeholderContent(),
  },
  {
    slug: "magyar-kkv-ai-verseny",
    title: "Magyar KKV-k az AI versenyben: hol tartunk?",
    excerpt:
      "Felmérés alapján elemezzük, hol állnak a hazai kis- és közepes vállalkozások.",
    tag: "TRENDEK",
    date: "2026. március 16.",
    readingTime: "~ 4 perc olvasás",
    coverImage: undefined,
    content: placeholderContent(),
  },
  {
    slug: "szamlazas-automatizalas-esettanulmany",
    title: "Számlázás automatizálása AI-val: esettanulmány",
    excerpt:
      "Egy ügyfélnél 8 óra/hét megtakarítást eredményezett ez a megoldás.",
    tag: "LEHETŐSÉGEK",
    date: "2026. március 9.",
    readingTime: "~ 4 perc olvasás",
    coverImage: undefined,
    content: placeholderContent(),
  },
  {
    slug: "gemini-20-flash-uzleti",
    title: "Gemini 2.0 Flash: ingyenes és mégis erős",
    excerpt:
      "Google legújabb modelljének képességei és korlátai üzleti kontextusban.",
    tag: "AI HÍREK",
    date: "2026. március 2.",
    readingTime: "~ 4 perc olvasás",
    coverImage: undefined,
    content: placeholderContent(),
  },
  {
    slug: "mikor-nem-erti-meg-ai",
    title: "Mikor NEM éri meg AI-t bevezetni?",
    excerpt:
      "Az AI nem minden problémára megoldás. Őszinte elemzés a határokról.",
    tag: "ÜZLETI ELEMZÉS",
    date: "2026. február 23.",
    readingTime: "~ 4 perc olvasás",
    coverImage: undefined,
    content: placeholderContent(),
  },
  {
    slug: "5-ai-eszkoz-kkv-2026",
    title: "5 AI eszköz amit minden KKV-nak ismernie kell 2026-ban",
    excerpt:
      "Nem ChatGPT — ezek az eszközök adják a valódi üzleti előnyt.",
    tag: "ESZKÖZÖK",
    date: "2026. február 16.",
    readingTime: "~ 4 perc olvasás",
    coverImage: undefined,
    content: placeholderContent(),
  },
  {
    slug: "aedificium-design-esettanulmany",
    title: "Tízszeres elérés AI-val: az Aedificium Design esete",
    excerpt:
      "Hogyan hozta el a ZynAI az Aedificium Design digitális fordulatát — AI-vezérelt social media automatizáció és prémium weboldal-fejlesztés, mérhető eredményekkel, töredék idő alatt.",
    tag: "ESETTANULMÁNY",
    date: "2026. február 9.",
    readingTime: "~ 6 perc olvasás",
    coverImage: "/esettanulmanyok/Aedificium/aedificium_hero.png",
    content: [
      {
        type: "lead",
        text:
          "Az Aedificium Design Budapest egyik vezető design kivitelezési infrastruktúra szolgáltatója — építészeknek és belsőépítészeknek. Amikor 2025-ben felkerestek minket, digitális jelenlétük messze elmaradt a valódi szakmai szintjüktől.",
      },

      { type: "h2", text: "A kihívás" },
      {
        type: "paragraph",
        text: "A csapat napi szinten küzdött két területen: a közösségi média tartalomgyártás rendkívül időigényes volt és nem volt konzisztens, a weboldaluk pedig nem tükrözte azt a prémium minőséget amit a munkájuk képviselt.",
      },
      {
        type: "paragraph",
        text: "Nem egyszerűen eszközöket kerestek — rendszert akartak, ami hosszú távon, emberi beavatkozás nélkül is működik.",
      },

      {
        type: "h2",
        text: "1. terület — Social media automatizáció",
      },
      {
        type: "paragraph",
        text: "Napi posztjavaslat-rendszert építettünk, amely minden nap automatikusan egy minőségi tartalomjavaslatot küld — az Aedificium hangvételéhez és céljaihoz igazítva. Nincs több üres tartalomkalendár.",
      },
      {
        type: "paragraph",
        text: "A rendszer alapjait úgy terveztük, hogy a szövegek mellé képgenerálás, majd teljesen automatikus, időzített kirakás is csatlakozzon — emberi beavatkozás nélkül.",
      },

      { type: "h2", text: "2. terület — Weboldal fejlesztés" },
      {
        type: "paragraph",
        text: "Teljes körű, prémium minőségű weboldalt fejlesztettünk 2 hét alatt — töredék áron, anélkül hogy a minőség csorbult volna. A végeredmény egy kifejezetten design-orientált, stabil és bővíthető platform, amely megfelel egy prémium tervezőiroda elvárásainak és arculatának.",
      },

      { type: "h2", text: "Eredmények egy pillantásra" },
      {
        type: "list",
        items: [
          "10× social media elérés növekedés",
          "2 hét alatt elkészült a teljes weboldal platform",
          "100% napi posztjavaslat lefedettség — üres tartalomkalendár nélkül",
        ],
      },

      {
        type: "quote",
        text: "Kezdetleges formájában tízszeres elérést értünk el — ez fantasztikus eredmény. A weboldal nagyon profi, design fókuszú és stabil. Töredék áron kaptuk, ami hasonló minőségért máshol sokszorosa kerülne.",
      },

      { type: "h2", text: "Következő lépések" },
      {
        type: "list",
        items: [
          "Teljes poszt generálás — szöveg és képek egyszerre, automatikusan előállítva",
          "Automatikus időzített kirakás — a poszt emberi beavatkozás nélkül kerül fel a platformokra",
        ],
      },
    ],
  },
  {
    slug: "make-vs-n8n-automatizalas",
    title: "Make vs n8n: melyiket válaszd automatizáláshoz?",
    excerpt:
      "Két népszerű platform összehasonlítása magyar KKV szemszögből.",
    tag: "ESZKÖZÖK",
    date: "2026. február 2.",
    readingTime: "~ 4 perc olvasás",
    coverImage: undefined,
    content: placeholderContent(),
  },
  {
    slug: "ai-ugyfelkommunikacio-3-honap",
    title: "AI alapú ügyfélkommunikáció: 3 hónap tapasztalat",
    excerpt:
      "Valós számok, valós eredmények egy 8 fős szolgáltató cégtől.",
    tag: "ESETTANULMÁNY",
    date: "2026. január 26.",
    readingTime: "~ 4 perc olvasás",
    coverImage: undefined,
    content: placeholderContent(),
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return allArticles.find((a) => a.slug === slug);
}
