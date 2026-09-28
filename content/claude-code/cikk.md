# 1. Egy délután, egy működő eszköz

Van egy oldal a zynai.hu-n, ami magyarul kérdez, és angol promptokat
ad Claude Code-hoz. Megnyithatod most is, ingyenes, és nem kell
regisztrálni hozzá: **[zynai.hu/claude-code](/claude-code)**

Egy délután alatt készült el. Nyolc commit, négy és fél óra, tizenhét
fájl. Nem egy demó, nem egy prototípus, hanem egy működő eszköz, amit
azóta is használok.

Ez a cikk arról szól, hogyan.

Nem általánosságban mutatom be a Claude Code-ot, mert olyan cikkből
már van elég. Végigmegyünk ezen a konkrét munkán az első
promptjától az élesítésig, és közben kiderül, mi az, ami működik, és
mi az, ami nem. Minden promptot, amit itt látsz, tényleg beírtam.
Minden hibát, amiről szó lesz, tényleg elkövettem.

A végén pontosan tudni fogod, hogyan kell dolgozni vele, és azt is,
hogy mikor ne.

## Kinek szól ez

Annak, aki webes dolgokat akar építeni: oldalakat, eszközöket,
apró alkalmazásokat. Mindegy, hogy fejlesztő vagy, vagy csak eleged
van abból, hogy mindenre meg kell várnod valakit.

Nem kell tudnod programozni ahhoz, hogy elkezdd. Ahhoz viszont kell
némi türelem, hogy jól csináld, és ez a cikk nagyrészt erről szól.

---

# 2. Mire jó, és mire nem

Ezt mindjárt az elején tisztázzuk, mert így nem pazarlod az idődet.

## Erre jó

Webfejlesztésre. Fájlok módosítására egy meglévő projektben, új
oldalak és komponensek létrehozására, hibakeresésre, a megjelenés
kialakítására, publikálásra.

Ezekben tényleg erős. Nem azért, mert kreatívabb nálad, hanem mert
gyorsabban ír le pontosan azt, amit megfogalmazol, és nem fárad el a
negyedik körben.

## Erre nem való

Éles rendszerre, ami más emberek adatait kezeli, ha te magad nem érted,
mi történik benne. Fizetési folyamatra. Bármire, aminek a hibája
pénzbe vagy jogi következménybe kerül.

Nem azért, mert nem tudná megcsinálni. Azért, mert nem fogod tudni
ellenőrizni, hogy jól csinálta-e, és az ilyesminél az ellenőrizhetőség
fontosabb, mint a sebesség.

A határ egyszerű: **ha az alkalmazás más emberek adatait kezeli,
fizetést dolgoz fel, vagy bárki elérheti az interneten, nézesse át
valaki, aki ért hozzá, mielőtt élesbe megy.** Ha a saját gépeden futó
szkriptről vagy egy adatot nem gyűjtő oldalról van szó, ez a lépés
kihagyható.

## Amiről ez a cikk nem szól

Általános promptolásról. Szövegírásról, kutatásról, ötletelésről.
Azokhoz másfajta promptok kellenek, és másfajta gondolkodás.

Itt végig kódról lesz szó.

---

# 3. Három szerep

Ez a legfontosabb dolog az egész cikkben, és a legtöbben pont ezt
hagyják ki.

Amikor AI-jal dolgozol, három szerep van, és ezek nem keverhetők
össze:

**A tervező.** Kitalálja, mit kell csinálni, milyen sorrendben, és
megírja a promptot. Ehhez érteni kell a feladatot, de nem kell kódot
írni hozzá.

**A végrehajtó.** Elolvassa a kódot, módosítja, lefuttatja, és
jelent. Ez a Claude Code.

**A döntéshozó.** Jóváhagy, ellenőriz, prioritást ad. Ez mindig te
vagy, és ez nem delegálható.

Ez a szétválasztás azért számít, mert ha összemosod őket, elveszíted a
kontrollt anélkül, hogy észrevennéd. Beírsz egy laza kérést, a modell
eldönti helyetted a részleteket, és a végén ott egy kódbázis, ami
működik ugyan, de nem tudod, miért.

Én magam a tervezéshez is AI-t használok, csak egy másik
beszélgetésben: ott gondolkodom végig a lépéseket, és ott áll össze a
prompt. A végrehajtás külön megy. A döntés viszont mindig az enyém
marad, mert a végén az én oldalam, és nekem kell tudnom
karbantartani.

Erre a kettősségre épül minden, ami ezután jön.

---

# 4. Az első prompt nem épít semmit

A legtöbben úgy kezdenek egy meglévő projektnél, hogy rögtön kérnek
valamit. „Csinálj egy új oldalt, ami ezt tudja."

Ez akkor működne, ha a modell ismerné a projektedet. De nem ismeri.
Nem tudja, hova kerülnek nálad az oldalak, hogyan hívod a
komponenseket, hol vannak a színeid, és hogy van-e már megoldás arra,
amit kérsz.

Ha nem kérdezed meg, ki fogja találni. És amit kitalál, az önmagában
lehet teljesen jó, csak nem illeszkedik ahhoz, ami már ott van.

Ezért az első prompt nálam soha nem épít semmit. Csak olvas.

```
DIAGNOSTIC ONLY — do not modify, create or delete anything.

Read the project structure and report, in Hungarian:

- the exact folder convention for routes, and where a new page
  would go
- where section components live, and the naming convention used
- where copy or content files live, if there is such a folder
- how design tokens are defined (colours, fonts, container width),
  and in which file
- whether a layout adds a header and footer to every page, and how
  a page could render without the header
- which existing page is closest in structure to a long,
  single-column content page

Quote the relevant lines with file paths. If something does not
exist in this project, say so instead of guessing.

Do not change any file.
```

Az utolsó előtti mondat a legfontosabb az egészben. Ha nem írod oda,
hogy mondja meg, ha valami nincs a projektben, akkor hihetően hangzó
válaszokat fogsz kapni olyasmiről, ami nem is létezik.

## Mi lett a válaszból

Öt perc olvasás, és három dolog derült ki, ami az egész munkát
meghatározta.

Az egyik, hogy a fejléc elrejtésére már volt bevett megoldás a
zynai.hu-n, mert a VibeCoding oldalam pontosan ezt csinálja. Ha ezt
nem kérdezem meg, kap egy másodikat, és két különböző megoldás él
egymás mellett ugyanarra. Fél év múlva én fogok keresgélni, hogy
melyik az igazi.

A másik, hogy a projektben nincs általános szövegmappa, csak
cikkeknek van. Így tudtam, hogy csinálnom kell egyet, nem pedig
belezsúfolni valamit egy meglévőbe, ami nem arra való.

A harmadik, hogy a színek és betűk egy konkrét fájlban, regisztrált
formában élnek. Ezt onnantól minden design-promptba be tudtam írni,
és nem kellett aggódnom, hogy a modell kitalál egy új árnyalatot.

Ezekből mindhárom olyan, ami építés közben derült volna ki, csak
akkor már javítani kellett volna.

## Amit a jelentésből kiírtam magamnak

A válaszból négy értéket jegyeztem fel, és ezek onnantól minden
promptba bekerültek: a route útvonala, a komponensek mappája, a
token-fájl neve, és a referenciaoldal, aminek a megjelenéséhez
igazodni akartam.

Ez nem sok. Négy sor egy jegyzetben. De ettől lett minden további
prompt pontos, ahelyett hogy körülírásokból dolgoztunk volna.

# 5. Hogyan néz ki egy jó prompt

A legtöbben úgy kezdik, hogy leírják, mit szeretnének, és megnyomják
az entert. Ez működik is, amíg a projekt elfér a fejedben. Amikor már
nem fér el, onnantól minden olyan prompt, ami nem mondja meg pontosan,
hol dolgozhat a modell, egy kicsit szétzilálja a kódbázist.

Négy dolgot teszek bele minden promptba. Nem azért, mert így elegáns,
hanem mert mind a négyet egy elrontott délután tanította meg.

## Hatókör

Ez a legfontosabb, és ezt hagyják ki a leggyakrabban.

```
SCOPE: Modify ONLY components/sections/ClaudeCodeTypeSelector.tsx.
Do not touch other files. npm run build and npm run lint must pass.
```

Három mondat, és mind a háromra szükség van. Az első megmondja, hol
dolgozhat. A második kimondja, hogy máshol nem, mert enélkül segíteni
fog, és átír egy szomszédos fájlt is, amiről te csak három nappal
később szerzel tudomást. A harmadik egy ellenőrzési feltétel, mert nem
attól lesz kész valami, hogy a modell késznek mondja.

A pontosság itt nem stílus kérdése. Ha azt írod, hogy „a típusválasztó
komponens", abból a modell hármat is találhat, és ő fogja eldönteni,
melyikre gondoltál. Teljes elérési út, mindig.

## Diagnózis

Meglévő kódnál ez az egy sor spórolja a legtöbb időt:

```
DIAGNOSTIC FIRST: Read the file and report its current structure
before changing anything.
```

Enélkül a modell feltételezésekből dolgozik. A feltételezés néha
stimmel, néha nem, és amikor nem, akkor nem egyszerűen rossz kódot
kapsz, hanem olyat, ami rossz alapon jó.

Jó példa erre ennek a munkának a legelső promptja. Nem építettem vele
semmit, csak megkérdeztem a saját weboldalamról, hogy mit lát benne:

```
DIAGNOSTIC ONLY — do not modify, create or delete anything.

Read the project structure and report, in Hungarian:
- the exact folder convention for routes
- where section components live, and the naming convention used
- how design tokens are defined, and in which file
- whether a layout adds a header to every page, and how a page
  could render without it

Quote the relevant lines with file paths. If something does not
exist in this project, say so instead of guessing.
```

Kiderült belőle, hogy a fejléc elrejtésére már van egy bevett megoldás
a zynai.hu-n, mert a VibeCoding oldal pontosan ezt csinálja. Ha nem
kérdezem meg, a modell kitalál egy másodikat, és két különböző
megoldás él egymás mellett ugyanarra a feladatra. A saját oldaladon ez
különösen bosszantó, mert fél év múlva te fogsz keresgélni, hogy most
akkor melyik az igazi.

Öt perc olvasás, és nem kellett később rendbe tenni semmit.

## Lezárás

```
Stop when done.
```

Enélkül továbbmegy. Befejezi a feladatot, aztán elkezd még valamit
javítani, amit közben észrevett. Jó szándékkal, és ez a legrosszabb
fajta változtatás, mert nem kérted, nem tudsz róla, és a következő
hibánál nem fogod tudni, honnan jött.

## Jelentés

A „kész" önmagában használhatatlan. Ezt kérem minden prompt végén:

```
Report in Hungarian:
- which files changed
- what changed, in one or two plain sentences
- what you checked
- what I should look at with my own eyes
- anything you assumed or could not verify
```

Az utolsó sor a legértékesebb. Ez írja ki, hol tévedhetett, és ezt
magától soha nem mondaná el.

Munka közben volt erre egy szép példa. Be kellett kötnie egy
Facebook-linket, de a szövegfájlban nem adtam meg az URL-t. Nem talált
ki egyet, ami hihetően nézett volna ki. Helyőrzőt hagyott a helyén, és
a jelentés végén megkérdezte, mi a valódi cím.

Ez a különbség aközött, hogy dolgozik neked valaki, és aközött, hogy
dolgozik helyetted valaki.

> **Ezt a négy elemet a promptépítő automatikusan beleteszi.** Magyarul
> leírod, mit szeretnél, és megkapod az angol promptot, pontos
> hatókörrel. → [zynai.hu/claude-code](/claude-code)

## Két dolog, amit soha ne írj bele

Ne bízd rá a döntést. Ha szerepel a promptban, hogy „döntsd el",
„válaszd ki", vagy „ahogy jónak látod", akkor a legdrágább munka rossz
helyen történik. A modell a végrehajtásban jó, nem abban, hogy
kitalálja, mit akartál.

És ne osztályneveket adj meg, hanem viselkedést. „Legyen `flex-col`"
helyett azt írd, hogy mobilon egymás alatt legyenek. Az elsőt te
találod ki helyette, a másodikat ő oldja meg, és ő ismeri jobban azt a
rendszert, amiben dolgozik.

---

# 6. Egy prompt, egy változás, egy commit

Ez a szabály unalmasan hangzik, amíg meg nem szeged.

Az eszköz nyolc commitban készült el, négy és fél óra alatt, egyetlen
délutánon. Ha megnézed a git-történetet, öt commit időbélyege két
percen belül van egymáshoz képest. Ez nem öt gyors lépés volt. Ez
egyetlen utólagos rendezés, amikor a végén megpróbáltam szétszedni a
munkát értelmes commitokra.

És ott derült ki, hogy egy fájlt már nem lehet.

A form komponenst három egymás utáni feladatban módosítottuk.
Mindhárom jó volt külön-külön, csak épp egyik után sem commitoltam. A
modell ezt jelentette, amikor kértem a felbontást:

> „ezeket a `git`-ben sorok szintjén már nem lehetett volna
> szétválasztani anélkül, hogy a fájlt többször teljesen újraépítsem."

A három lépés összeolvadt egyetlen, átláthatatlan változtatássá. Egy
hónap múlva, ha valamelyik elromlik, nem fogom tudni, melyik okozta.

## Honnan tudod, hogy túl nagy a prompt

Három jel van, és bármelyik elég.

Több fájlt érint. Ez nem feltétlenül baj, de gondold át, tényleg
egyetlen változás-e.

Több különálló dolgot sorol fel. „Állítsd be a mezőket, és generáld a
promptot, és tedd hozzá a mentést" az három prompt, nem egy.

Az „és" két külön dolgot köt össze. Ez a leggyorsabb teszt. Ha a
mondat közepén van egy „és", ami után új téma kezdődik, ott a
vágópont.

A mérce egyszerű. Ha a változásból nem lesz egyetlen értelmes
commitüzenet, akkor túl nagy volt.

## Hogyan szeleteld

Az oldal tíz szeletre bomlott, és mindegyik lefutott, mielőtt a
következő indult:

- Diagnosztika, hogy mit lát a projektben
- Az adatszerkezet, a prompttípusok tipizált formában
- A váz, minden blokk a helyén, végleges szöveggel, nulla designnal
- A választók, interaktívvá téve
- A mezők, a kiválasztott típus szerint
- A generálás, itt volt a legtöbb iteráció
- A figyelmeztetések
- A mentés a böngészőben
- A megjelenés, három külön körben
- A minőségi átvizsgálás

A sorrend nem véletlen. A design a nyolcadik, nem az első. Ha előbb
formázod meg, minden szerkezeti változásnál újra kell csinálnod.
Legyen ott előbb minden, végleges szöveggel, csúnyán, és csak utána
nézzen ki jól.

---

# 7. Amikor nem megy

Menni fog rosszul, ez a munka természete. Ami számít, az az, hogy mit
csinálsz akkor.

## A kétszeri elakadás

Ha ugyanaz a javítás kétszer nem működik, ne legyen harmadik
próbálkozás ugyanabban a beszélgetésben.

Ennek technikai oka van. A beszélgetés minden üzenetnél viszi magával
a teljes előzményt, beleértve a két rossz irányt is. A harmadik
próbálkozás már a szennyezett kontextusból dolgozik, és rendszerint
rosszabb lesz, mint az első volt.

Helyette nyiss új beszélgetést, és vidd magaddal, ami számít:

```
Fresh start on this task. Previous attempts are not in your
context, so here is what matters:

Task: [min dolgoztatok]

Already tried, did not work: [mi nem működött]
Do not repeat these approaches.

Current state: [jelenlegi állapot]

DIAGNOSTIC FIRST: Before changing anything, tell me where you
think the problem is and what you need to read to confirm it.

Stop and wait for my answer.
```

A középső mező a lényeg. Enélkül az új beszélgetés ugyanazokat a
zsákutcákat járja be, mint az előző.

## Gyanús jelek

| Amit mond | Amit jelent |
|---|---|
| „Eltűnt a hiba, de nem tudom, miért" | Elnyomta, nem javította. Keress `any`-t, `@ts-ignore`-t, üres `catch`-et |
| „Teljes átírást javasolok" | Nem találja a hibát. Ne engedd |
| Harmadszor javítja rosszul | Szennyezett kontextus. Új beszélgetés |
| Egyre lassabb és butább | Tele a kontextus. Új beszélgetés |
| Átírt egy fájlt, amit nem kértél | Hiányzott a pontos hatókör |
| Átfogalmazta a szövegedet | Hiányzott a szövegfájlra hivatkozás |
| Élesben más, mint lokálisan | Környezeti változó, vagy a fájlnév kis- és nagybetűje |

A legveszélyesebb az első. Egy eltűnt hiba jól hangzik, közben lehet,
hogy csak elhallgattatták.

## A visszavonás gomb

A Git. Nem kell értened, hogyan működik, elég egyszer kérned a projekt
elején:

```
Set up Git for this project if it is not set up yet.

After each completed task, commit the change with a short, clear
message in Hungarian describing what was done.
One task, one commit.

Never commit files containing secrets. Make sure .env and any
local configuration files are ignored.
```

Onnantól bármikor vissza tudsz lépni egy működő állapotra. Nálam
egyszer élesben is kellett. A hero hátterébe építettünk egy animált
elemet, aztán úgy döntöttem, mégsem kell. Egy prompt, és eltűnt,
anélkül hogy a mellette készült munka is eltűnt volna vele.

Ha ez nincs, ott ülsz egy félig visszacsinált állapottal, és nem
emlékszel, mi volt az eredeti.

---

# 8. Amikor jól csinálja

Erről sehol nem esik szó, pedig fontosabb, mint a hibalista. Ha nem
tudod, mi az elvárható működés, el fogod fogadni a rosszabbat.

Négy dolog ebből a munkából.

**Rákérdezett ahelyett, hogy kitalált volna.** Hiányzott egy URL a
szövegfájlból, és nem tett a helyére egy hihetőt. Helyőrzőt hagyott,
és megkérdezte. Ez a `Bizonytalan:` sor haszna, csak kérni kell.

**Nem lépte túl a hatókört, pedig igaza lett volna.** Egy ponton a
kódban és a szövegfájlban eltért két gombfelirat. A javítás csak a
komponensre volt korlátozva. A modell elvégezte, amit kértem, külön
jelezte, hogy a szövegfájl most nem egyezik, de nem nyúlt hozzá. A
hatókör akkor ér valamit, ha akkor is tartja magát, amikor
kényelmetlen.

**Jobb megoldást választott, mint amit kértem.** Azt kértem, hogy a
kiválasztott kártya szegélye legyen vastagabb. Jelezte, hogy ez
elcsúsztatná az elrendezést, mert ha a szegély egy pixelről kettőre
nő, a kártya belseje beljebb ugrik, és a szomszédos elemek
megmozdulnak. Helyette olyat javasolt, ami nem mozgat semmit. Igaza
volt.

**Szólt, hogy két szabályt nem tud megbízhatóan megcsinálni.** Az
eszközben figyelmeztetéseket akartam, köztük olyat, ami szól, ha a
felhasználó két feladatot ír egy promptba. A modell a többit
megcsinálta, ezt kihagyta, és megindokolta:

> „nincs megbízható nyelvi jel arra, hogy egy leírás egy vagy két
> feladatot ír-e le. Kötőszó-számlálással rengeteg jogos, egyetlen
> feladatot leíró mondatot is jelezne hamisan, például »a gomb legyen
> nagyobb és középre igazítva« egy feladat, mégis van benne »és«."

Igaza volt ebben is. Egy hamis figyelmeztetés rosszabb, mint semmi,
mert két nap alatt megtanulnád figyelmen kívül hagyni, és akkor a
valódiakat is elnéznéd. A két szabály végül nem tűnt el, csak átkerült
egy csendes emlékeztetőbe a mezők alá.

Ha ezek egyike sem történik meg nálad, ha soha nem kérdez vissza, soha
nem jelzi a bizonytalanságát, és mindig mindenre azt mondja, hogy
kész, akkor nem a modellel van baj, hanem azzal, amit kérsz tőle. A
visszakérdezést kérni kell. A bizonytalanságot kérni kell. A hatókört
be kell írni. Egyik sem jön magától.


# 9. A floor: ahol nincs ízlésvita

A legtöbb döntés a te dolgod. Milyen színek legyenek, milyen
sorrendben jöjjenek a szekciók, mit mondjon a szöveg. Ezekben nincs
helyes válasz, csak a tiéd, és ha rosszul döntesz, azt később
átírod.

Van viszont néhány dolog, ami nem ízlés kérdése. Ezeket hívom
floor-nak magyarul padló vagy alapkövetelmény. Ha itt tévedsz, az nem esztétikai baj, hanem hiba, és
rendszerint olyan, ami csak hetekkel később derül ki.

Öt ilyen van.

## Titok soha nem kerül a kódba

API-kulcs, jelszó, hozzáférési token. Ezek környezeti változóba
valók, nem a kódba, és soha nem a böngészőbe letöltődő részbe.

Ez azért kegyetlen szabály, mert a törlés nem elég. Ha egyszer
bekerült egy commitba, ott is marad a git-történetben, és a repót
klónozó bárki megtalálja. Ilyenkor a kulcsot vissza kell vonni a
szolgáltatónál és újat kérni. Nincs más megoldás.

Ezt minden fordulóban ellenőriztettem, és a jelentésben külön ki
kellett mondania, hogy tiszta.

## A szöveg nem a kódban él

Minden látható szöveg egyetlen forrásból jön: a cím, a gomb felirata,
a mezők címkéi, a helyőrzők, a hibaüzenetek, a képek alt szövege.
Nálam ez a `content/claude-code/` mappa.

Ennek két haszna van. Az egyik, hogy a modell nem fogalmazhat át
semmit, mert a promptban benne van, hogy szó szerint onnan másolja. A
másik, hogy egy év múlva pontosan tudni fogod, hol kell javítanod egy
elírást.

Egy fordulóban jól látszott, mennyire számít ez. A modell két
gombfeliratot vitt be a kódba, amit én adtam meg neki szóban, de a
szövegfájlba nem írtam bele. Jelentette, hogy a kettő most eltér,
és megkérdezte, pótolja-e. Ha nem szól, hetek múlva jöttem volna rá,
hogy a szövegfájl már nem a valóságot írja le.

## Minden mezőnek van címkéje, minden vezérlő elérhető billentyűzettel

Ez nem jótékonyság. Egy képernyőolvasót használó ember pontosan úgy
ügyfél, mint bárki más, és a legtöbb hiba, ami őt megállítja, öt perc
alatt javítható, ha az elején odafigyelsz.

Az átvizsgálás nálam egy ilyet talált. A típusválasztó rádiógombjai
egy csoportba tartoztak, de a csoportnak nem volt neve, tehát a
képernyőolvasó nem tudta bemondani, miről is választ az ember. Látó
felhasználó ebből semmit nem vesz észre.

Ha nem futtatom le az átvizsgálást, ez bent marad.

## Ami mozog, az álljon meg, ha a felhasználó kéri

A böngészőben van egy beállítás arra, hogy valaki nem kér az
animációkból. Van, akinek szédülést vagy migrént okoz. Ezt tiszteletben
kell tartani, és egyetlen extra sor az egész.

Itt egy tanulságos dolog derült ki. A modell átvette a VibeCoding
oldalamról egy pulzáló elem megoldását, aztán jelezte, hogy az eredeti
nem kezeli ezt a beállítást. Vagyis a saját, régebbi oldalamon ott ült
egy hiba, amit addig nem vettem észre.

Erre nem számítottam, de pontosan ezért érdemes kérni, hogy mindig
mondja el, mit talált.

## És a legfontosabb: a „kész" nem bizonyíték

Ez a legjobb példa, amit valaha kaptam erre, és a saját oldalamról
való.

A megosztásnál használt kép beállítása két éve ott volt a kódban, a
megfelelő helyen, hibátlan szintaxissal. A `<head>`-ben pontosan az
szerepelt, aminek szerepelnie kellett. Bármelyik ellenőrzés, ami a
kódot nézi, azt mondta volna rá, hogy rendben.

Csak épp a hivatkozott képfájl nem létezett. Soha nem is létezett.

Ez azt jelenti, hogy a zynai.hu minden oldala, a főoldal és a
VibeCoding oldal is, kép nélkül osztódott meg mindenhol, amióta él. És
sosem derült volna ki, mert a kód hibátlan volt.

Akkor bukott ki, amikor a promptépítő oldal megosztását vizsgáltuk, és
a modell nem elégedett meg azzal, hogy a beállítás jó. Lekérte a
képet, és megnézte, mit válaszol a szerver. A többi oldal képe 404-et
adott.

Ebből két dolgot tanultam meg.

Az egyik, hogy nem elég ellenőrizni, hogy be van-e állítva valami.
Meg kell nézni, hogy működik-e. A promptban ezért kérem mindig, hogy
mondja meg, hogyan ellenőrizte, ne csak azt, hogy kész.

A másik, hogy ezt a hibát én csináltam, jóval a Claude Code előtt, és
két évig nem tűnt fel. Az AI nem okozta, de az AI találta meg, mert
megkértem rá, hogy nézzen utána.

## A floor ellenőrzése

Amikor az oldal elkészült, ezt futtattam le rá:

```
DIAGNOSTIC ONLY — do not modify anything.

Read every file belonging to this page and report, in Hungarian,
with file paths and line numbers:

- any visible text that does not come from the content folder
- any colour, font size or spacing value not taken from the
  registered tokens
- any input without a bound label
- any control not reachable or operable by keyboard
- any state indicated by colour alone
- any network request or external resource
- any `any`, @ts-ignore, empty catch block or leftover console.log
- anything that breaks below 375px width
- any animation that does not respect prefers-reduced-motion

For each finding, say how serious it is. Do not fix anything yet.
```

A „ne javíts semmit" rész fontos. Ha egyszerre kérsz átvizsgálást és
javítást, akkor a javítás közben módosul a kód, és a lista végére már
nem tudod, mire vonatkozott az eleje. Előbb a teljes lista, aztán te
döntesz, mit javíttatsz és milyen sorrendben.

---

# 10. A friss szem

Van egy lépés, amit gyakorlatilag senki nem csinál, pedig ez az
egyetlen, ami a saját vakfoltjaidat megtalálja.

Amikor kész az oldal, **nyiss egy új beszélgetést egy másik cég
modelljével**, és nézesd át vele ugyanezt.

Nem azért, mert az a modell okosabb. Azért, mert nem volt ott.

## Miért működik

Egy hosszú munka végén a beszélgetés tele van olyan döntésekkel,
amiket együtt hoztatok. Ezek a modell számára már nem kérdések, hanem
elfogadott állapot. Ha megkérded ugyanabban a szálban, hogy jó-e így,
lényegében arra kéred, hogy a saját munkáját bírálja felül, méghozzá
úgy, hogy közben minden indoklás ott van előtte, amivel korábban
meggyőzted.

Egy másik modell semmit nem tud erről. Csak a kódot látja, és azt,
hogy minek kellene teljesülnie. Ami neked a beszélgetés alapján
magától értetődő, azt ő megkérdőjelezi.

És ami ennél is fontosabb: **másképp téved.** Ahol az egyiknek van
vakfoltja, ott a másiknak rendszerint nincs.

## Hogyan csináld

Új beszélgetés, másik szolgáltató. Csatold a kódot és azt a listát,
aminek meg kell felelnie. A build-beszélgetést ne, és a magyarázatot
se, mert azzal pont azt a kontextust adnád át, ami elől menekülsz.

```
Attached: a web tool and the quality floor it was built against.

You did not build this. Review it as an outside reviewer.

Does this code meet this floor? List every deviation: what is
wrong, where, and how serious.

Pay particular attention to:
- accessibility of the form controls and the generated output
- whether any visible text is hardcoded instead of coming from
  the content folder
- the storage code paths, including failure cases
- anything that breaks below 375px

Do not fix anything. Do not praise anything.
Write the list in Hungarian.
```

A „ne dicsérj semmit" nem udvariatlanság. Ha nem írod oda, a lista
elejére kerül egy bekezdés arról, hogy milyen jól strukturált a kód,
és az elveszi a figyelmet arról, amiért az egészet csinálod.

A listát pedig ne ott javíttasd, ahol kaptad. Vidd vissza abba a
beszélgetésbe, ahol a kódot ismerik, és onnan add ki a javításokat
egyesével.

## Mit várhatsz tőle

Nem azt, hogy mindent megtalál. Azt, hogy talál két-három olyat, amit
te már nem vettél volna észre, mert túl közel voltál hozzá.

A saját munkánál ez nagyjából mindig igaz. Az ember a harmadik óra
után már nem a kódot olvassa, hanem azt, amit emlékezetből tud róla.


# 11. Mibe kerül

Erről kevesen írnak konkrétan, pedig ez az első kérdés, ami eldönti,
belevágsz-e.

## Az előfizetés

A Claude Code nem használható ingyenes fiókkal. Legalább Pro előfizetés
kell hozzá. Létezik Max elöfizu is ami abban különbözik hogy 20x több felhasználható token áll rendelkezésre.

ÁR: A belépő szintű előfizetés 2026 szeptemberében havi 22,86 euró volt magánszemélyként, áfával együtt, ami nagyjából 8,400 forint.
Az árak változnak, és a csomagtól is függ, ezért publikálás előtt mindig nézd meg a hivatalos oldalon.

A belépő szint tanulásra és kisebb projektekre elég. Ha egy egész
délutánt dolgozol vele folyamatosan, ahogy én ezzel az oldallal,
akkor bele fogsz futni a korlátba. Ilyenkor vagy befizetsz Max-ra, vagy vársz kicsit.

## Ami tényleg drága

Nem a kimenet. A kontextus.

A modell minden egyes üzenetnél magával viszi a teljes addigi
beszélgetést. Ez azt jelenti, hogy a huszadik üzenet sokkal többe
kerül, mint az első, akkor is, ha ugyanolyan hosszú. Ezért drága a
felderítés, a hosszú szál, és a teljes oldalas képernyőkép.

És ezért olcsó a pontos prompt. Ha megmondod, melyik fájlt olvassa el,
egy fájlt olvas el. Ha nem mondod meg, végigpásztázza a projektet,
hogy megtalálja, és ezt te fizeted.

Három szokás, ami a legtöbbet spórolja:

Feladatonként új beszélgetés. Ha a feladat lezárult, kezdd elölről.
Amit át kell vinni, azt írd le pár sorban.

Tisztán olvasó kérdésre olcsóbb eszközt használj. Ha csak azt akarod
tudni, mi van egy fájlban, ne módosító promptot adj.

Képernyőképből csak a lényeget. A teljes oldalas kép sokba kerül és
keveset mond.

## Mikor éri meg

Egy egyszerű landing oldal megrendelése magyar piacon jellemzően több
tízezer forint, és hetekbe telik. Ha ezt egyszer nem kell
megrendelned, mert magad megcsinálod, az előfizetés egy évre megtérült.

De nem ez a lényeg, és nem is ezt adnám el.

Az igazi haszon az, hogy a saját oldaladon nem kell megvárnod senkit.
Eszedbe jut valami hétfő este, és szerdán már fent van. Az eszköz,
amiről ez a cikk szól, egy délután alatt készült el egy ötletből.
Megrendelve ez négy hét lett volna, és a végén nem tudnám, mi van
benne.

Ez a különbség nem pénzben mérhető, hanem abban, hogy mennyi dolog
készül el egyáltalán.

---

# 12. Amit eddig kihagytam: a telepítés

Szándékosan hagytam a végére. Ha a telepítéssel kezdek, az első
akadálynál elveszítelek, és nem jutsz el odáig, hogy megértsd, miért
éri meg egyáltalán.

Most viszont, ha idáig eljutottál, jöhet.

## Mire lesz szükséged

Egy gépre, internetre és egy fizetős Anthropic előfizetésre. Ennyi.

A Claude Code több felületen fut. Kezdőknek a VS Code bővítményt
ajánlom, mert ott a fájlok ott vannak a beszélgetés mellett, és
látod, mihez nyúl. Terminálból is megy, én magam is úgy szoktam, de
ahhoz már kell némi bátorság, és nem ez az a pont, ahol azt érdemes
gyűjteni.

## A sorrend

Telepítsd a VS Code-ot, ha még nincs. Telepítsd a Claude Code
bővítményt. Jelentkezz be. Nyiss meg egy mappát.

Ennyi. Innentől beszélgetsz vele.

Az első dolog, ami meg fog lepni, az az engedélykérő ablak. Amikor
fájlt akar módosítani vagy parancsot futtatni, megkérdezi. Ez nem
hiba, hanem az egyetlen dolog, ami miatt nyugodtan alhatsz. Olvasd el,
mit kér, és csak akkor engedd, ha érted.

Az első időben mindent engedélyeztess egyesével. Később, amikor már
látod a mintát, gyorsíthatsz rajta.

## Ha elakadsz

A hibaüzenetet másold be a claude.ai chatbe, és kérdezd meg, mit
jelent. Az esetek túlnyomó részében ez megoldja.

Ha az sem, kérdezz a [Claude Code – Kezdőknek](https://www.facebook.com/groups/1355789193061643) csoportban. Pont ezért
csináltam.

## Mit tanulj meg először

Nem kell programozni tanulnod ahhoz, hogy elkezdd. De négy dolog van,
ami nélkül hamar falba ütközöl, és mind megtanulható egy hétvége
alatt:

Mi az a fájl és mappa, és hogyan néz ki egy projekt szerkezete. Ha
nem tudod, hol mi van, nem tudsz pontos hatókört adni, és minden
promptod pontatlan lesz.

Mit csinál nagyjából a HTML, a CSS és a JavaScript. Nem írni kell
tudni, csak felismerni, melyik mit intéz.

Mi az a Git, és mit jelent egy commit. Elég annyi, hogy ez a
visszavonás gomb.

Mit jelent az, hogy publikálsz valamit. Hogyan lesz a gépeden lévő
mappából egy cím, amit meg tudsz osztani.

Ez a négy dolog nem programozás. Ez az, ami elválasztja azt, aki
irányít, attól, aki reménykedik.

---

# 13. Ami ebből marad

Végigmentünk egy valódi munkán. Volt benne diagnózis, tíz szelet,
néhány elrontott kör, egy visszavont hero, és a végén egy kétéves
hiba, ami a saját oldalamon ült.

Ha egyetlen dolgot viszel magaddal, az ez legyen: a Claude Code nem
attól lesz jó, hogy okos, hanem attól, hogy pontosan mondod meg neki,
mit csináljon és hol. A modell a végrehajtásban erős. A döntés a tiéd
marad, és ez így is van rendjén, mert a végén a te kódbázisod lesz,
és neked kell tudnod karbantartani.

## A hét dolog, amit érdemes megjegyezni

Pontos elérési út, mindig. Nem kategória, nem körülírás.

Előbb olvasson, aztán írjon. Feltételezett okra ne adj parancsot.

Egy prompt, egy változás, egy commit. Ha nem lesz belőle egy értelmes
commitüzenet, túl nagy volt.

Zárd le, és kérj jelentést. Külön kérdezd meg, miben bizonytalan.

Kétszeri elakadás után új beszélgetés. A harmadik próbálkozás már a
szennyezett előzményből dolgozik.

A szöveg nem a kódban él. Egy forrás, mindenhol.

A „kész" nem bizonyíték. Nézd meg, hogy tényleg működik-e.

## Ahol folytathatod

A promptépítő eszköz, amiről szó volt, itt érhető el, és ingyenes.
Ott van benne mind a tíz prompttípus kitölthető formában, magyarul, és
időnként új tippekkel bővül. → **[zynai.hu/claude-code](/claude-code)**

Ha kérdésed van, vagy elakadtál, gyere a **[Claude Code – Kezdőknek](https://www.facebook.com/groups/1355789193061643)**
csoportba. Ott konkrét projektekről beszélgetünk, nem elméletről.

És ha azt szeretnéd, hogy valaki végigvezessen egy saját projekten,
ugyanezzel a módszerrel, amit itt láttál: a VibeCoding képzésen ezt
tanítom. Nem a kódolást, hanem a döntéseket. Mit építs, milyen
sorrendben, és honnan tudod, hogy tényleg kész van.
→ **[zynai.hu/vibecoding-pilot](/vibecoding-pilot)**
