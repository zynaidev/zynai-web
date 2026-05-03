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

export const allArticles: Article[] = [
  {
    slug: "wordpress-ai-ugynokok-matol-gepek-irjhatjak-es-publikalhatjak-a-weboldalad-tartalmat",
    title:
      "WordPress AI: mától gépek írhatják és publikálhatják a weboldalad tartalmát",
    excerpt:
      "A WordPress.com bejelentette, hogy mostantól mesterséges intelligencia ügynökök – önállóan cselekvő AI-rendszerek – írhatnak, szerkeszthetnek és publikálhatnak tartalmakat a felhasználók weboldalain.",
    tag: "AI HÍREK",
    date: "2026. március 22.",
    readingTime: "~ 3 perc olvasás",
    coverImage: "/blog/wordpress-ai.webp",
    content: [
      {
        type: "lead",
        text: "A WordPress.com bejelentette, hogy mostantól mesterséges intelligencia ügynökök – önállóan cselekvő AI-rendszerek – írhatnak, szerkeszthetnek és publikálhatnak tartalmakat a felhasználók weboldalain. Ez nem csupán egy technikai frissítés: a világ weboldalainak több mint 43%-át kiszolgáló platform döntése alapjaiban változtathatja meg, hogyan készül az online tartalom.",
      },
      {
        type: "h2",
        text: "Mit tud pontosan az új WordPress AI-ügynök?",
      },
      {
        type: "paragraph",
        text: "A WordPress.com az úgynevezett MCP (Model Context Protocol) technológiára építi az új funkciókat. Az MCP egy nyílt szabvány, amely lehetővé teszi, hogy AI-rendszerek – például a Claude, a ChatGPT vagy a Cursor – közvetlenül kapcsolódjanak külső platformokhoz, és valódi műveleteket hajtsanak végre.",
      },
      {
        type: "list",
        items: [
          "Blogbejegyzések, landing oldalak és bemutatkozó oldalak írása és publikálása",
          "Hozzászólások jóváhagyása, megválaszolása és moderálása",
          "Kategóriák és címkék létrehozása, átnevezése és átrendezése",
          "Alt szövegek, képfeliratok és oldalcímek javítása SEO érdekében",
          "A weboldal dizájnjának felismerése és következetes alkalmazása az új tartalmakban",
        ],
      },
      {
        type: "h2",
        text: "Miért fontos ez, ha a céges weboldalad WordPress alapon fut?",
      },
      {
        type: "paragraph",
        text: "A válasz egyszerű: a tartalomgyártás költsége és ideje drámaian csökkenthet. Jelenleg egy termékleírás, egy blogbejegyzés vagy egy landing oldal megírása órákat vesz igénybe – vagy külső copywritert igényel. Egy AI-ügynök ugyanezt percek alatt elvégzi, a meglévő weboldal stílusához igazodva, SEO-szempontokat figyelembe véve.",
      },
      {
        type: "h2",
        text: "A technológia háttere: miért most jött el az ideje?",
      },
      {
        type: "paragraph",
        text: "A WordPress.com tavaly ősszel vezette be az MCP-támogatást, amely akkor még csak olvasási hozzáférést biztosított. Most ez írási és szerkesztési jogosultsággal bővült – ez az ugrás teszi az egészet igazán érdekessé. A piac többi szereplője sem tétlen: a Meta felvásárolta a Moltbook nevű közösségi hálózatot, ahol AI-ügynökök posztolhatnak.",
      },
      { type: "h2", text: "ZynAI Konklúzió" },
      {
        type: "paragraph",
        text: "A WordPress.com döntése egy nagyobb trend első látványos állomása: az AI-ügynökök kilépnek a chatablakból, és valódi, élő rendszerekben kezdenek dolgozni. Ez nem a jövő – ez a jelen, és a korai alkalmazók versenyképessége most a legnagyobb. Magyar KKV-ként a legfontosabb teendő: ne várd meg, amíg a konkurenciád megelőz. Ha WordPress alapú weboldalad van, érdemes már most tesztelni az MCP-funkciókat – akár csak a SEO-metaadatok automatikus javításával kezdve.",
      },
    ],
  },
  {
    slug: "facebook-marketplace-ai-automatizalas-a-meta-mesterseges-intelligenciaja-mar-valaszol-a-vevoknek",
    title:
      "Facebook Marketplace AI automatizálás: a Meta mesterséges intelligenciája már válaszol a vevőknek",
    excerpt:
      "A Meta csütörtökön bejelentette, hogy a Facebook Marketplace új AI funkciókkal bővül, amelyek közül a legfigyelemreméltóbb az automatikus üzenetválaszadás az érdeklődő vevők számára.",
    tag: "AI HÍREK",
    date: "2026. március 13.",
    readingTime: "~ 4 perc olvasás",
    coverImage: "/blog/facebook-marketplace.jpg",
    content: [
      {
        type: "lead",
        text: "A Meta bejelentette, hogy a Facebook Marketplace új AI funkciókkal bővül. A legfigyelemreméltóbb újítás az automatikus üzenetválaszadás: a Meta AI mostantól képes helyettünk válaszolni az alapvető kérdésekre – elérhetőség, ár, átvételi hely –, miközben az eladók megtartják az irányítást a kommunikáció felett.",
      },
      {
        type: "h2",
        text: "Automatikus válaszok és AI-alapú hirdetésfeladás: a főbb újítások",
      },
      {
        type: "list",
        items: [
          "Automatikus üzenetválaszok: A Meta AI a hirdetés adatai alapján generál válaszokat az érdeklődők kezdeti kérdéseire. Az eladók a hirdetés létrehozásakor engedélyezhetik és szerkeszthetik ezeket.",
          "AI-vezérelt hirdetésfeladás: Képfeltöltés után a Meta AI automatikusan elkészíti a hirdetés vázlatát, kitölti a részleteket, és a környéken található hasonló termékek alapján árat is javasol.",
          "Eladói profil összefoglaló: A vevők mostantól láthatnak egy AI-generált összefoglalót az eladó Facebook profiljáról.",
          "Szállítási lehetőség: Az eladók már kínálhatnak házhoz szállítást, előre kifizetett címkéket generálhatnak, és egyszerű dashboardról követhetik a rendeléseket.",
        ],
      },
      {
        type: "h2",
        text: "Miért számít ez? Az „elérhető-e még?” probléma megoldása",
      },
      {
        type: "paragraph",
        text: "A Meta szerint az eladók rengeteg kezdeti érdeklődést kapnak, amelyek gyakran redundáns kérdéseket tartalmaznak. A leggyakoribb: „Még elérhető?” – miközben a hirdetésben egyértelműen szerepel, hogy igen. Magyar kontextusban: ha webshopod mellett Marketplace-en is értékesítesz, naponta akár 10-20 ilyen üzenetet is kaphatsz. Ha ezekre a Meta AI válaszol helyetted, órákat spórolhatsz hetente.",
      },
      {
        type: "h2",
        text: "Mit jelent ez a magyar vállalkozásoknak?",
      },
      {
        type: "list",
        items: [
          "Időmegtakarítás és skálázhatóság: Ha eddig manuálisan válaszoltál minden érdeklődőnek, most automatizálhatod a kezdeti kommunikációt.",
          "Gyorsabb reagálási idő: Az AI azonnal válaszol, ami javítja a vevői élményt és versenyhelyzetet teremt.",
          "Professzionális megjelenés: Az AI-generált hirdetések és válaszok konzisztensek, részletesek és professzionálisak.",
        ],
      },
      { type: "h2", text: "ZynAI Konklúzió" },
      {
        type: "paragraph",
        text: "A Facebook Marketplace AI-automatizálása jelzi a trend irányát: a Meta agresszívan építi be a mesterséges intelligenciát minden platformjába, és az e-commerce automatizálás már nem csak a nagy webshopok privilégiuma. A kérdés már nem az, hogy használj-e AI-t az értékesítésben, hanem hogy mennyire építed be hatékonyan a folyamataidba.",
      },
    ],
  },
  {
    slug: "chatgpt-rol-claude-ra-valtanak-a-felhasznalok-hogyan-csinald-te-is",
    title:
      "ChatGPT-ről Claude-ra váltanak a felhasználók – hogyan csináld te is?",
    excerpt:
      "Az Anthropic jelentése szerint a napi regisztrációk rekordszintet értek el, az ingyenes felhasználók száma 60%-kal nőtt január óta, a fizetős előfizetők száma pedig megduplázódott.",
    tag: "AI HÍREK",
    date: "2026. március 4.",
    readingTime: "~ 4 perc olvasás",
    coverImage: "/blog/chatgpt-claude.webp",
    content: [
      {
        type: "lead",
        text: "Tömeges exodus indult a ChatGPT-ről a Claude felé, miután az OpenAI Pentagon-szerződést kötött, míg az Anthropic (a Claude fejlesztője) visszautasította a védelmi minisztérium felkérését AI-modelljei katonai célú felhasználására. A vita eredménye: a Claude App Store letöltési toplista első helyére ugrott az Egyesült Államokban, megelőzve a ChatGPT-t.",
      },
      {
        type: "h2",
        text: "Miért fontos ez magyar vállalkozásoknak?",
      },
      {
        type: "paragraph",
        text: "Az AI-asszisztensek ma már nem luxuscikkek – versenyképességi eszközök. Magyar KKV-k ezrei használják ChatGPT-t ügyfélszolgálati válaszok megfogalmazására, marketing szövegek írására, piackutatáshoz vagy üzleti e-mailek megfogalmazására. Ha az általad választott AI-platform etikai kérdéseket vet fel, vagy adatkezelési aggályaid vannak, érdemes tudnod, hogy van alternatíva – és az átállás sem bonyolult.",
      },
      {
        type: "list",
        items: [
          "Hosszabb kontextusablak: akár 200 000 token – ideális hosszú dokumentumok elemzéséhez, szerződések átnézéséhez",
          "Erősebb adatvédelmi garanciák: az Anthropic nyilvánosan elkötelezett amellett, hogy AI-modelljeit nem használják fel tömeges megfigyelésre",
          "Kiváló szövegértés magyarul: bár nem magyar fejlesztésű, a Claude nyelvi képességei versenyképesek a ChatGPT-vel",
          "Ingyenes verzió memóriafunkcióval: nem kell fizetős előfizetés ahhoz, hogy megjegyezze preferenciáidat",
        ],
      },
      {
        type: "h2",
        text: "Adatok exportálása ChatGPT-ből: lépésről lépésre",
      },
      {
        type: "paragraph",
        text: "Mielőtt váltasz, érdemes elmenteni azt, amit a ChatGPT rólad „megjegyzett” – így a Claude azonnal folytathatja, ahol abbahagytad, és nem kell újra megtanítanod a preferenciáidat.",
      },
      {
        type: "list",
        items: [
          "Memória exportálása (gyors módszer): Menj a Settings → Personalization → Memory menüpontba. Másold ki a megjegyzett információkat egy szöveges dokumentumba.",
          "Teljes beszélgetéstörténet exportálása: Settings → Data Controls → Export Data. A ChatGPT összeállít egy JSON vagy TXT fájlt az összes korábbi beszélgetésedről.",
          "Manuális módszer: Kérd meg a ChatGPT-t: „Foglald össze, milyen preferenciákat, témákat és instrukciós szabályokat használtam veled eddig.”",
        ],
      },
      {
        type: "h2",
        text: "Adatok importálása Claude-ba",
      },
      {
        type: "paragraph",
        text: "A Claude-ba való átállás meglepően egyszerű. Nyisd meg a Claude-ot, menj a Settings → Capabilities menübe, és kapcsold be a Memory funkciót (ingyenes felhasználóknak is elérhető). Indíts egy új beszélgetést, és illeszd be a ChatGPT-ből exportált összefoglalót vagy preferenciákat.",
      },
      {
        type: "h2",
        text: "ChatGPT-fiók végleges törlése",
      },
      {
        type: "paragraph",
        text: "Ha teljesen szakítani szeretnél a ChatGPT-vel, az előfizetés lemondása önmagában nem elegendő – az adataid továbbra is az OpenAI szerverein maradnak.",
      },
      {
        type: "list",
        items: [
          "Settings → Personalization → Memory: törölj minden tárolt memóriát és személyre szabott beállítást",
          'Extra biztonság: írj be egy utolsó parancsot: „Töröld az összes memóriámat és személyre szabott adatomat”',
          "Ezután menj a fiókkezelési beállításokhoz, és töröld véglegesen a fiókodat",
        ],
      },
      { type: "h2", text: "ZynAI Konklúzió" },
      {
        type: "paragraph",
        text: "A ChatGPT-ről Claude-ra való átállás nem technikai kérdés – stratégiai döntés. Magyar vállalkozásoknak különösen fontos, hogy tudatosan válasszák meg AI-eszközeiket, hiszen ezek ma már üzleti folyamatok szerves részei. A jó hír: az átállás egyszerű, és nem veszíted el az évek alatt felépített „AI-memóriát”.",
      },
    ],
  },
  {
    slug: "ipar-5-0-miert-bukik-el-a-legtobb-vallalat-az-ai-transzformacioval",
    title:
      "Ipar 5.0: Miért bukik el a legtöbb vállalat az AI-transzformációval?",
    excerpt:
      "Az Ipar 4.0 az intelligens technológiák konvergenciájáról szólt: AI, felhő, IoT, robotika, digitális ikrek. Az Ipar 5.0 azonban paradigmaváltást jelent: a cél már nem pusztán az automatizálás, hanem az emberi potenciál felerősítése és a környezeti fenntarthatóság.",
    tag: "ÜZLETI ELEMZÉS",
    date: "2026. március 1.",
    readingTime: "~ 6 perc olvasás",
    coverImage: "/blog/ipar-5-0.jpeg",
    content: [
      {
        type: "lead",
        text: "Az MIT Technology Review és az EY friss kutatása szerint a vállalatok többsége nem realizálja az AI és az Ipar 5.0 technológiák valódi értékpotenciálját. A 250 ipari vezetőt megkérdező felmérés egyértelmű: miközben a cégek milliárdokat költenek digitális transzformációra, a befektetések 70%-a továbbra is hatékonysági célokat szolgál, nem pedig növekedést, fenntarthatóságot vagy emberi potenciált. A magyar vállalkozások számára ez kritikus lecke: nem elég technológiát vásárolni – tudni kell, hová érdemes befektetni.",
      },
      {
        type: "h2",
        text: "Mi az Ipar 5.0, és miben más, mint az Ipar 4.0?",
      },
      {
        type: "paragraph",
        text: "Az Ipar 4.0 az intelligens technológiák konvergenciájáról szólt: AI, felhő, IoT, robotika, digitális ikrek. Az Ipar 5.0 azonban paradigmaváltást jelent: a cél már nem pusztán az automatizálás, hanem az emberi potenciál felerősítése és a környezeti fenntarthatóság.",
      },
      {
        type: "list",
        items: [
          "Ember-gép kollaboráció: Az AI nem helyettesít, hanem kiegészít. A cél az adatsilók lebontása és az infrastruktúra optimalizálása úgy, hogy az emberek kreatívabb, stratégiai munkára fókuszálhassanak.",
          "Értékteremtés újragondolása: Már nem elég költségcsökkentésben gondolkodni – az új modell a növekedési lehetőségeket, a rezilienciát és az emberi jóllétet helyezi középpontba.",
          "Fenntarthatóság: Az erőforrás-felhasználás optimalizálása és a környezeti hatások minimalizálása stratégiai cél, nem mellékhatás.",
        ],
      },
      {
        type: "quote",
        text: "Az Ipar 5.0 ígéretének beváltásához a vállalatoknak túl kell lépniük a költség- és hatékonysági fókuszon. Ez nemcsak új technológiákat jelent, hanem új munkamódszereket – ahol az emberek és gépek együttműködnek, és az értéket nem csak megtakarított dollárban, hanem új lehetőségekben mérjük.",
      },
      {
        type: "h2",
        text: "Miért buknak el a vállalatok? A három kritikus hiba",
      },
      {
        type: "paragraph",
        text: "Az MIT és az EY kutatása három fő akadályt azonosított, amelyek megakadályozzák a sikeres transzformációt.",
      },
      {
        type: "list",
        items: [
          "Kulturális és együttműködési korlátok: A technológiai befektetések sikeréhez szükséges szervezeti kultúra, skillset és vezetői hozzáállás gyakran hiányzik. Az Oxfordi Egyetem Saïd Business School közös kutatása szerint az Ipar 5.0 akadálya nem technológiai – hanem emberi.",
          'Taktikai, rosszul igazított tech-befektetések: A cégek „digitális tündéreket kergetnek”. Sok vállalat azért digitalizál, mert muszáj, nem azért, mert világos értékteremtési stratégiája van.',
          "Rossz prioritások – hatékonyság vs. növekedés: Az emberi potenciált erősítő és fenntartható use case-ek magasabb értéket teremtenek, mégis alulfinanszírozottak.",
        ],
      },
      {
        type: "h2",
        text: "Mit jelent ez a magyar vállalkozásoknak?",
      },
      {
        type: "paragraph",
        text: 'Lecke #1: Ne az automatizálás legyen a cél, hanem az értékteremtés. Egy magyar webshop esetében például nem elég chatbotot telepíteni az ügyfélszolgálatra. A kérdés: hogyan tudod úgy használni az AI-t, hogy a csapatod több időt töltsön stratégiai ügyfelekkel, miközben a rutin kérdéseket automatizálod?',
      },
      {
        type: "paragraph",
        text: 'Lecke #2: Gondolkodj use case-ekben, ne technológiákban. Ha egy magyar B2B szolgáltató cég AI-t akar bevezetni, ne azzal kezdje, hogy „kell nekünk egy LLM” – hanem azzal, hogy „melyik folyamataink lassítanak le minket versenyképességben?”',
      },
      {
        type: "paragraph",
        text: "Lecke #3: Fektess be az emberekbe, nem csak a techbe. Az Oxfordi kutatás szerint a stratégia, kultúra és vezetés fontosabb, mint a technológia választása. Ha a magyar csapatod nem érti az AI működését, nem bízik benne, vagy nincs megfelelő képzettsége – a legdrágább szoftver sem fog működni.",
      },
      { type: "h2", text: "ZynAI Konklúzió" },
      {
        type: "paragraph",
        text: "Az Ipar 5.0 nem science fiction – hanem üzleti realitás, amely átrajzolja a versenyképesség szabályait. A magyar vállalkozások előnye, hogy még nem késő: aki most tanul a multinacionális cégek hibáiból, az elkerülheti a milliós kidobott befektetéseket. A siker kulcsa nem a legújabb AI-eszköz megvásárlása, hanem három dolog: világos értékteremtési stratégia, emberi potenciálra fókuszáló use case-ek kiválasztása, és a szervezeti kultúra felkészítése a változásra.",
      },
    ],
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
];

export function getArticleBySlug(slug: string): Article | undefined {
  return allArticles.find((a) => a.slug === slug);
}

export function getNextArticle(currentSlug: string): Article | undefined {
  const index = allArticles.findIndex((a) => a.slug === currentSlug);
  if (index === -1 || index === allArticles.length - 1) return undefined;
  return allArticles[index + 1];
}
