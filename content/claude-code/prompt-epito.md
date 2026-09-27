# Prompt-építő — szövegkészlet

> A `docs/szovegek/` mappába. Minden látható szöveg innen jön.
> Készült: 2026. szeptember 27.

---

## 0. Oldalfej (a szekció bevezetője)

**Kis címke:** Ingyenes eszköz

**Cím:** Prompt-építő Claude Code-hoz

**Alcím:** Magyarul írod le, mit szeretnél. Angol promptot kapsz, pontos hatókörrel — úgy, ahogy egy valódi projekten is használnám.

**Bevezető bekezdés:**
A legtöbb hiba nem ott keletkezik, ahol az AI kódol, hanem ott, ahol elindítod. Ha nem mondod meg, melyik fájlt módosíthatja, hozzányúl máshoz is. Ha nem kéred, hogy előbb olvasson, találgatni fog. Ha nem zárod le, megy tovább. Ez az eszköz ezeket teszi bele helyetted.

**Miért angol a prompt:**
A prompt angolul pontosabb, mert a modellek túlnyomórészt angol kódon és angol dokumentáción tanultak. A jelentést viszont magyarul kéred vissza, mert azt neked kell értened. Ez nem stílus kérdése: a saját projektedet a végén neked kell tudnod karbantartani.

---

## 1. Stack-választó

**Címke:** Milyen projekten dolgozol?

**A opció — rövid név:** Next.js projekt
**A opció — leírás:** Next.js App Router, TypeScript, Tailwind. A generált prompt a `src/app/` szerkezettel és a `npm run build` ellenőrzéssel dolgozik.

**B opció — rövid név:** Bármilyen más projekt
**B opció — leírás:** Sima HTML/CSS/JS, Python, WordPress, vagy bármi más. A generált prompt nem feltételez keretrendszert, és a build helyett a te ellenőrzési módodat kéri.

**Súgó a választó alatt:**
Ha nem tudod, melyiket válaszd, a másodikat válaszd. Az mindenhol működik.

---

## 2. A prompt-típusok

### 2.1 Módosítás meglévő fájlban

**Név:** Módosítás
**Mikor használd:** Van egy működő fájl, és meg akarsz benne változtatni valamit.

**Mezők:**

- **Melyik fájlt módosíthatja?**
  Helyőrző (A): `src/app/kapcsolat/page.tsx`
  Helyőrző (B): `index.html` vagy `styles/fooldal.css`
  Súgó: Teljes elérési út, ne kategória. Az „a kapcsolat oldal" nem elég pontos — abból a modell hármat is találhat.

- **Mi történik most?**
  Helyőrző: A gomb a szekció alján van, és mobilon kilóg a képernyőből.
  Súgó: Amit a saját szemeddel látsz. Nem a feltételezett ok.

- **Minek kellene történnie?**
  Helyőrző: A gomb a szöveg alatt legyen, teljes szélességben, és férjen bele 375 pixelen is.
  Súgó: A viselkedést írd le, ne az osztálynevet. „Legyen `flex-col`" helyett „egymás alatt legyenek".

- **Van olyan szöveg, amihez nem nyúlhat?** *(opcionális)*
  Helyőrző: Minden látható szöveg maradjon változatlanul.

**Generált prompt (A — Next.js):**

```
SCOPE: Modify ONLY [fájl útvonala].
Do not touch other files. Do not refactor anything else.
npm run build must pass.

DIAGNOSTIC FIRST: Read the file and report its current structure
before changing anything.

TASK:
Current: [mi történik most]
Wanted: [minek kellene történnie]

[ha van szövegzár] Keep all copy exactly as it is. Do not rewrite,
shorten or re-punctuate any user-facing text.

Check the result at 375px width first.

Stop when done. Report in Hungarian:
- which files changed
- what changed, in one or two plain sentences
- what you checked
- what I should look at with my own eyes
- anything you assumed or could not verify
```

**Generált prompt (B — általános):**

```
SCOPE: Modify ONLY [fájl útvonala].
Do not touch other files. Do not refactor anything else.
Do not add any new dependency.

DIAGNOSTIC FIRST: Read the file and report its current structure
before changing anything.

TASK:
Current: [mi történik most]
Wanted: [minek kellene történnie]

[ha van szövegzár] Keep all copy exactly as it is.

Stop when done. Report in Hungarian:
- which files changed
- what changed, in one or two plain sentences
- what you checked
- what I should look at with my own eyes
- anything you assumed or could not verify
```

---

### 2.2 Terv kérése módosítás előtt

**Név:** Terv
**Mikor használd:** Mielőtt bármi nagyobb elindul. Előbb lásd, mit akar csinálni, és csak utána engedd el.

**Mezők:**

- **Mit szeretnél elérni?**
  Helyőrző: Egy kapcsolati űrlapot szeretnék a kapcsolat oldalra, ami e-mailt küld nekem.
  Súgó: Nagy vonalakban. A részletek a tervből fognak kiderülni.

- **Mi az, amihez semmiképp ne nyúljon?** *(opcionális)*
  Helyőrző: A fejléc és a lábléc maradjon érintetlen.

- **Van olyan megkötés, amit tudnia kell?** *(opcionális)*
  Helyőrző: Ne telepítsen új csomagot. Ne használjon külső szolgáltatást.

**Generált prompt:**

```
PLAN ONLY — do not write or modify any code yet.

Goal: [mit szeretnél elérni]

[ha van] Do not touch: [amihez ne nyúljon]
[ha van] Constraints: [megkötések]

Report, in Hungarian:
- which files you would create or change, and why each one
- what you would do in what order
- anything in this task that needs a decision from me
- anything you cannot verify from the code

Wait for my approval before making any change.
```

**Súgó a típus alatt:**
Claude Code-ban a `Shift+Tab` is átvált tervezési módba. Ez a prompt akkor is működik, ha nem használod azt.

---

### 2.3 Hibajavítás

**Név:** Hibajavítás
**Mikor használd:** Kaptál egy hibaüzenetet, vagy valami elromlott az utolsó változtatás után.

**Mezők:**

- **Melyik fájlban van a hiba?**
  Helyőrző: Ha nem tudod, hagyd üresen — akkor előbb megkeresi.
  Súgó: Ha nem vagy biztos benne, inkább hagyd üresen, mint hogy rossz helyre küldd.

- **Mi a hibaüzenet?**
  Helyőrző: Illeszd be teljes egészében, vágatlanul.
  Súgó: Ne rövidítsd le és ne fogalmazd át. A hibaüzenet legvégén lévő sor gyakran fontosabb, mint az eleje.

- **Mit csináltatok közvetlenül előtte?**
  Helyőrző: Hozzáadtunk egy új szekciót a főoldalhoz.
  Súgó: Ez a leggyorsabb nyom. A hiba szinte mindig az utolsó változtatásból jön.

**Generált prompt:**

```
SCOPE: [ha megadta] Modify ONLY [fájl útvonala].
[ha nem adta meg] Find the cause first. Do not modify anything
until you have told me where the problem is.
Do not touch unrelated files.

Error, verbatim:
[a teljes hibaüzenet]

Last change before this: [mit csináltatok előtte]

DIAGNOSTIC FIRST: Tell me the cause before fixing anything.

Then fix the cause, not the symptom.
Do not silence the error with type casts, @ts-ignore, `any`,
or empty catch blocks.
If your first fix does not work, stop and report what you found.
Do not try a second approach without telling me.

Stop when done. Report in Hungarian:
- what the cause was
- what you changed
- what you checked
- anything you assumed or could not verify
```

**Figyelmeztető szöveg a típus alatt:**
Ha ugyanaz a javítás kétszer nem működik, ne legyen harmadik próbálkozás ugyanabban a beszélgetésben. Vagy diagnosztikai kört futtatsz, vagy új beszélgetést nyitsz. A harmadik kör már a szennyezett előzménnyel dolgozik, és rosszabb lesz, mint az első.

---

### 2.4 Diagnosztika

**Név:** Diagnosztika
**Mikor használd:** Nem akarsz változtatni, csak meg akarod tudni, mi van a kódban.

**Mezők:**

- **Mit olvasson el?**
  Helyőrző: `src/components/layout/Header.tsx` és `src/app/layout.tsx`
  Súgó: Konkrét fájlok vagy mappa. Minél szűkebb, annál olcsóbb és pontosabb.

- **Mit szeretnél tudni?**
  Helyőrző: Hol van beállítva a főmenü sorrendje? Van-e mobilos menü, és ha igen, hol?
  Súgó: Kérdésekben fogalmazz. Soronként egy kérdés.

**Generált prompt:**

```
DIAGNOSTIC ONLY — do not modify, create or delete anything.

Read: [mit olvasson el]

Report, in Hungarian:
[kérdések, soronként egy felsorolásponttal]

Quote the relevant lines with their file path and line numbers.
If something is not in these files, say so instead of guessing.

Do not change any file.
```

**Súgó a típus alatt:**
Egy tisztán olvasó kérdés olcsóbb és pontosabb, mint egy módosító prompt, amiben benne van a kérdés is. Ha bizonytalan vagy, előbb kérdezz, utána módosíts.

---

### 2.5 Új fájl létrehozása

**Név:** Új fájl
**Mikor használd:** Nincs még meg, amit építeni akarsz.

**Mezők:**

- **Hol jöjjön létre?**
  Helyőrző (A): `src/app/rolunk/page.tsx`
  Helyőrző (B): `rolunk.html`

- **Mi legyen benne, milyen sorrendben?**
  Helyőrző: 1. Cím és rövid bevezető. 2. Három szolgáltatás felsorolva. 3. Kapcsolati gomb.
  Súgó: Számozott lista. Egy sor, egy szekció.

- **Honnan jön a szöveg?** *(opcionális)*
  Helyőrző: `docs/szovegek/rolunk.md`
  Súgó: Ha van szövegfájlod, add meg. Ha nincs, a modell fog szöveget írni, és azt utána cserélned kell.

**Generált prompt (A — Next.js):**

```
SCOPE: Create ONE new file: [útvonal].
Do not touch any other file. npm run build must pass.

Skeleton only. No design beyond structural minimum.
No colours, no fonts, no spacing decisions yet.

[ha van szövegfájl] Copy: verbatim from [szövegfájl] — read that
one file only. Do not translate, rewrite or re-punctuate.
If something is missing from that file, stop and tell me.
[ha nincs] Use short placeholder text and mark clearly where
real copy is needed.

Sections, in this order:
[számozott lista]

Stop when done. Report in Hungarian:
- what you created
- what you checked
- anything you assumed or could not verify
```

**Generált prompt (B — általános):**

```
SCOPE: Create ONE new file: [útvonal].
Do not touch any other file. Do not add any dependency.

Structure only. No design decisions yet.

[ha van szövegfájl] Copy: verbatim from [szövegfájl].
Do not translate, rewrite or re-punctuate.
[ha nincs] Use short placeholder text and mark clearly where
real copy is needed.

Sections, in this order:
[számozott lista]

Stop when done. Report in Hungarian:
- what you created
- what you checked
- anything you assumed or could not verify
```

---

### 2.6 Megjelenés

**Név:** Megjelenés
**Mikor használd:** A tartalom megvan, most azt akarod, hogy jól is nézzen ki.

**Mezők:**

- **Melyik részt formázza?**
  Helyőrző: `src/components/sections/Hero.tsx`

- **Hogyan nézzen ki?**
  Helyőrző: A cím legyen nagy és balra zárt, alatta egy rövidebb alcím, a kép a jobb oldalon. Mobilon a kép kerüljön a szöveg alá.
  Súgó: Írd le, amit látni szeretnél. Ne osztályneveket adj meg — azokat ő ismeri jobban.

- **Mit ne csináljon?** *(opcionális)*
  Helyőrző: Ne tegyen bele animációt. Ne használjon új színt.
  Súgó: Ez legalább annyit számít, mint amit kérsz. Amit nem tiltasz le, azt hozzá fogja tenni.

**Generált prompt (A — Next.js):**

```
SCOPE: Modify ONLY [fájl útvonala].
Do not touch other files. npm run build must pass.

TASK: [hogyan nézzen ki]

Use only the design tokens already defined in this project.
Do not introduce new colours, fonts or spacing values.
Mobile first: make it correct at 375px, then scale up.
Do not change any text.

[ha van tiltás] Do not: [mit ne csináljon]

Stop when done. Report in Hungarian, and tell me exactly what
to look at and at what screen width.
```

**Generált prompt (B — általános):**

```
SCOPE: Modify ONLY [fájl útvonala].
Do not touch other files. Do not add any dependency or framework.

TASK: [hogyan nézzen ki]

Use only the colours, fonts and spacing already used in this
project. Do not introduce new ones.
Make it correct on a 375px wide screen first, then wider.
Do not change any text.

[ha van tiltás] Do not: [mit ne csináljon]

Stop when done. Report in Hungarian, and tell me exactly what
to look at and at what screen width.
```

**Figyelmeztető szöveg:**
Megjelenésnél a „kész" jelentés nem bizonyíték. Nézd meg a saját szemeddel, azon a szélességen, amit kértél.

---

### 2.7 Szöveg javítása

**Név:** Szöveg
**Mikor használd:** Elírás van az oldalon, vagy nem fér ki egy cím.

**Mezők:**

- **Melyik oldalon vagy fájlban?**
  Helyőrző: `src/app/kapcsolat/page.tsx`

- **Honnan jön a helyes szöveg?**
  Helyőrző: `docs/szovegek/kapcsolat.md`
  Súgó: Előbb a forrásfájlban javítsd, és csak utána futtasd ezt. Ha a kódban javítod, legközelebb újra elromlik.

**Generált prompt:**

```
SCOPE: Modify ONLY [fájl útvonala].
Do not touch other files.

TASK: Update all user-facing text on this page to match the
current content of [szövegfájl]. Copy it verbatim.
Do not translate, rewrite, shorten or re-punctuate anything.

Report every difference you find between the file and the page,
including ones you did not change.

Stop when done. Report in Hungarian.
```

**Súgó a típus alatt:**
A szöveg nem a kódban él, hanem a szövegfájlban. Ha ezt egyszer betartod, soha többé nem kell azon gondolkodnod, melyik verzió az igazi.

---

### 2.8 Biztonsági átnézés

**Név:** Átnézés
**Mikor használd:** Mielőtt bármi élesbe megy, vagy bárki más is látja.

**Mezők:**

- **Mit nézzen át?**
  Helyőrző: Az egész projektet, vagy: `src/app/api/` és `src/lib/`

- **Van olyan, ami szándékosan nyilvános?** *(opcionális)*
  Helyőrző: A mérőkód azonosítója és az oldal címe szándékosan kliensoldali.

**Generált prompt:**

```
DIAGNOSTIC ONLY — do not modify anything.

Read: [mit nézzen át]

Check and report, in Hungarian, with file paths and line numbers:
- any API key, password, token or credential written into the
  code, or exposed to the browser
- any environment variable exposed to the client that should
  not be
- any form input that is not validated on the server
- any place where external or user content is inserted into the
  page without escaping
- any dependency that is clearly unused

[ha van] Intentionally public, do not flag: [amit megadott]

For each finding, say how serious it is and what you would do
about it. Do not fix anything yet.
```

**Figyelmeztető szöveg — kiemelten:**
Ez az átnézés segít, de nem garancia. Egy fájlban megtalálja a kiszivárgott kulcsot, a másikban elnézheti. Ha az oldal más emberek adatait kezeli, fizetést dolgoz fel, vagy bárki elérheti az interneten, nézesse át valaki, aki ért hozzá — élesítés előtt.

---

### 2.9 Beszélgetés újraindítása

**Név:** Újrakezdés
**Mikor használd:** Négy-öt sikertelen javítás után, vagy amikor új feladatra váltasz.

**Mezők:**

- **Min dolgoztatok eddig?**
  Helyőrző: A kapcsolati űrlap e-mail-küldését próbáltuk működésre bírni.

- **Mi az, ami már nem működött?**
  Helyőrző: Kétszer próbálta a mezőneveket átírni, attól nem lett jobb. A hiba a szerver válaszánál jön.
  Súgó: Ez a legfontosabb mező. Enélkül az új beszélgetés ugyanazokat a zsákutcákat fogja bejárni.

- **Mi a jelenlegi állapot?**
  Helyőrző: A build lefut, az űrlap elküldhető, de e-mail nem érkezik meg.

**Generált prompt:**

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

**Súgó a típus alatt:**
A hosszú beszélgetés minden üzenetnél viszi magával a teljes előzményt — a rossz irányokat is. Négy sikertelen javítás után gyorsabb újrakezdeni, mint ötödször próbálkozni. A `/clear` parancs üríti a beszélgetést, a fájljaid érintetlenül maradnak.

---

### 2.10 Mentés és visszaállítás

**Név:** Mentés
**Mikor használd:** A projekt elején egyszer, utána amikor vissza kell lépni.

**Mezők:**

- **Mit szeretnél?**
  Választható: `Mentés beállítása a projekt elején` / `Visszalépés az utolsó működő állapotra`

**Generált prompt (beállítás):**

```
Set up Git for this project if it is not set up yet.

After each completed task, commit the change with a short,
clear message in Hungarian describing what was done.
One task, one commit.

Never commit files containing secrets. Make sure .env and any
local configuration files are ignored.

Report, in Hungarian, what you set up and what is now ignored.
```

**Generált prompt (visszalépés):**

```
DIAGNOSTIC FIRST: Show me the last five commits with their
messages, and tell me which files have uncommitted changes.

Do not revert anything yet. Wait for me to tell you which
point to go back to.

Report in Hungarian.
```

**Súgó a típus alatt:**
Ez a visszavonás gombod. Nem kell értened, hogyan működik — elég, ha a projekt elején egyszer beállítod, és onnantól bármikor vissza tudsz lépni egy működő állapotra.

---

## 3. Ellenőrzések a generálás előtt

Ezek akkor jelennek meg, amikor a felhasználó kitöltötte a mezőket, de mielőtt másolna. Figyelmeztetés, nem tiltás — a prompt attól még elkészül.

**Hiányzó útvonal:**
Nem adtál meg pontos elérési utat. Enélkül az AI maga választja ki, melyik fájlhoz nyúl — és gyakran nem ahhoz, amire gondoltál.

**Kategória útvonal helyett:**
Ez inkább kategóriának tűnik, mint fájlnak. Add meg a teljes elérési utat, például `src/components/layout/Header.tsx`.

**Döntés átengedése:**
A leírásodban szerepel olyan szó, ami döntést enged át az AI-nak („döntsd el", „válaszd ki", „ahogy jónak látod"). Ilyenkor a drága munka rossz helyen történik. Döntsd el te, és írd le.

**Hiányzó hibaüzenet:**
Hibajavításhoz a teljes hibaüzenet kell, vágatlanul. A rövidített vagy átfogalmazott üzenetből az AI találgatni fog.

### Amire nem figyelmeztet

Ezt a kettőt nem tudja automatikusan észrevenni — ezekre neked kell figyelned.

**Két feladat egyben:**
Úgy tűnik, két dolgot kérsz egyszerre. Bontsd ketté: egy prompt, egy változás, egy mentés. Ha egy kérésből nem lesz egyetlen értelmes mentés, túl nagy volt.

**Túl rövid leírás:**
Ez a leírás valószínűleg nem elég ahhoz, hogy azt kapd, amire gondolsz. Írd le, mi történik most, és minek kellene történnie helyette.

---

## 4. Felületi szövegek

**Gombok:**
- Prompt összeállítása
- Másolás
- Kimásolva
- Új prompt
- Mezők ürítése
- Mentés a sajátjaim közé
- Saját promptjaim
- Betöltés
- Törlés
- Letöltés JSON-ban
- Visszatöltés fájlból

**Címkék:**
- Prompt típusa
- Projekt típusa
- A generált prompt
- Figyelmeztetések
- Mit kérj vissza

**Üres állapot:**
Válassz egy típust fent, töltsd ki a mezőket, és itt megjelenik a kész prompt.

**Mentett promptok üres állapota:**
Még nincs mentett promptod. Ha összeállítasz egyet, amit többször is használnál, mentsd el — a saját gépeden marad.

**Adatkezelési megjegyzés:**
Amit ide beírsz, a saját böngésződben marad. Nem küldjük el sehová, és nem tároljuk. Ha törlöd a böngésződ adatait, a mentett promptjaid is eltűnnek — ezért van a letöltés gomb.

---

## 5. A három szabály (kiemelt blokk az eszköz alatt)

**Cím:** Három dolog, ami minden promptnál számít

**1. Pontos hatókör.**
Mondd meg, melyik fájlhoz nyúlhat, és hogy máshoz ne nyúljon. E nélkül szétfut a munka, és a végén nem tudod, mi változott.

**2. Előbb olvasson, aztán írjon.**
Meglévő kódnál kérd, hogy előbb olvassa el és mondja el, mit talált. Feltételezett okra ne adj parancsot.

**3. Zárd le, és kérj jelentést.**
A „Stop when done" nélkül továbbmegy. A kért jelentés nélkül pedig neked kell kitalálnod, mi történt.

**Záró mondat:**
Ha ezt a hármat betartod, a promptjaid nyolcvan százaléka rendben lesz. A maradék húsz a gyakorlatból jön.

---

## 6. A tippek szekció

**Cím:** Tippek és trükkök

**Bevezető:**
Ez a rész változik, ahogy a modellek változnak. Minden bejegyzés dátumozva van — ha régi, kezeld fenntartással.

**Induló bejegyzések:** (legújabb elöl)

**Dátum:** 2026. 09.
**Cím:** Ami beágyazható, azt ne építsd meg
**Szöveg:** Foglalás, térkép, videó: ezekre van kész beágyazás. Az AI szívesen megépíti neked a sajátodat, de azt neked kell karbantartanod.

***

**Dátum:** 2026. 09.
**Cím:** Az „eltűnt a hiba, de nem tudom, miért" gyanús
**Szöveg:** Ez azt jelenti, hogy elnyomta, nem javította. Keress `any`-t, `@ts-ignore`-t és üres `catch` blokkot. Ugyanígy gyanús, ha teljes átírást javasol: az azt jelenti, hogy nem találja a hibát.

***

**Dátum:** 2026. 09.
**Cím:** A képernyőkép a leggyorsabb hibajelentés
**Szöveg:** Vizuális hibánál illeszd be a képet, és írd mellé, mit látsz és mit vártál helyette. Csak a releváns részről készíts képet — a teljes oldalas kép sokba kerül és keveset mond.

***

**Dátum:** 2026. 09.
**Cím:** A kontextus a legdrágább erőforrásod
**Szöveg:** Nem a kimenet kerül sokba, hanem az, hogy minden üzenetnél viszed magaddal az egész előzményt. Ezért olcsó a pontos prompt, és drága a felderítés, a hosszú szál és a teljes képernyős képernyőkép. Feladatonként új beszélgetés.

---

## 7. Lezárás és átvezetés

**Cím:** Ez egy kivonat egy nagyobb rendszerből

**Szöveg:**
Ezek a sablonok egy munkamódszer részei, ami valódi ügyfélprojekteken állt össze. A teljes rendszerben van specifikációs sablon, projektszabályok, élesítés előtti ellenőrzőlista és menetrend arra az esetre, ha elakadsz.

A VibeCoding képzésen ezt tanítom: nem a kódolást, hanem a döntéseket. Mit építs, milyen sorrendben, és honnan tudod, hogy kész van.

**Gomb:** Megnézem a képzést
**Gomb célja:** https://zynai.hu/vibecoding-pilot

**Másodlagos link szövege:** Csatlakozom a Facebook-csoporthoz

---

## 8. Meta

**Oldal címe (title):** Prompt-építő Claude Code-hoz — magyar nyelvű promptgenerátor | ZynAI

**Leírás (description):** Magyarul írod le, mit szeretnél, és pontos hatókörű angol promptot kapsz Claude Code-hoz. Ingyenes eszköz, tíz prompttípussal.
