/**
 * A Claude Code prompt-építő tíz prompt-típusának adatai.
 *
 * Forrás: content/claude-code/prompt-epito.md, 2. szakasz. Minden magyar
 * szöveg és minden angol sablon szó szerint, a markdownból változtatás
 * nélkül van átemelve.
 *
 * Helyőrző-szintaxis a `promptNextjs` / `promptGeneric` (és a "mentés"
 * típus két promptjának) szövegében: minden szögletes zárójeles rész
 * `[...]` helyőrző.
 * - A legtöbb esetben az adott mező kitöltött értékét kell a helyére
 *   írni, pl. `[fájl útvonala]` -> a "Melyik fájlt módosíthatja?" mező
 *   értéke.
 * - A `[ha van ...]`, `[ha nincs ...]`, `[ha megadta]`, `[ha nem adta meg]`
 *   kezdetű sorok feltételes sorok: csak akkor kerülnek a végleges
 *   promptba, ha a hivatkozott — általában opcionális — mezőt a
 *   felhasználó kitöltötte. Ilyenkor a sor szövege rögzített, nem az adott
 *   mező tartalma kerül a helyére.
 */

export type PromptFieldInputType = "text" | "textarea";

export type PromptFieldPlaceholder =
  | string
  | { readonly nextjs: string; readonly generic: string };

export interface PromptField {
  readonly label: string;
  readonly placeholder: PromptFieldPlaceholder;
  readonly help?: string;
  readonly optional: boolean;
  readonly inputType: PromptFieldInputType;
}

export interface PromptChoiceOption {
  readonly id: string;
  readonly label: string;
  readonly prompt: string;
}

interface PromptTypeBase {
  readonly id: string;
  readonly name: string;
  readonly whenToUse: string;
  readonly note?: string;
}

export interface FieldsPromptType extends PromptTypeBase {
  readonly kind: "fields";
  readonly fields: readonly PromptField[];
  readonly promptNextjs: string;
  readonly promptGeneric: string;
}

export interface ChoicePromptType extends PromptTypeBase {
  readonly kind: "choice";
  readonly choiceLabel: string;
  readonly options: readonly PromptChoiceOption[];
}

export type PromptType = FieldsPromptType | ChoicePromptType;

export const promptTypes: readonly PromptType[] = [
  {
    id: "modositas",
    name: 'Módosítás',
    whenToUse: 'Van egy működő fájl, és meg akarsz benne változtatni valamit.',
    kind: "fields",
    fields: [
      {
        label: 'Melyik fájlt módosíthatja?',
        placeholder: {
          nextjs: '`src/app/kapcsolat/page.tsx`',
          generic: '`index.html` vagy `styles/fooldal.css`',
        },
        help: 'Teljes elérési út, ne kategória. Az „a kapcsolat oldal" nem elég pontos — abból a modell hármat is találhat.',
        optional: false,
        inputType: "text",
      },
      {
        label: 'Mi történik most?',
        placeholder: 'A gomb a szekció alján van, és mobilon kilóg a képernyőből.',
        help: 'Amit a saját szemeddel látsz. Nem a feltételezett ok.',
        optional: false,
        inputType: "textarea",
      },
      {
        label: 'Minek kellene történnie?',
        placeholder: 'A gomb a szöveg alatt legyen, teljes szélességben, és férjen bele 375 pixelen is.',
        help: 'A viselkedést írd le, ne az osztálynevet. „Legyen `flex-col`" helyett „egymás alatt legyenek".',
        optional: false,
        inputType: "textarea",
      },
      {
        label: 'Van olyan szöveg, amihez nem nyúlhat?',
        placeholder: 'Minden látható szöveg maradjon változatlanul.',
        optional: true,
        inputType: "textarea",
      },
    ],
    promptNextjs: `SCOPE: Modify ONLY [fájl útvonala].
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
- anything you assumed or could not verify`,
    promptGeneric: `SCOPE: Modify ONLY [fájl útvonala].
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
- anything you assumed or could not verify`,
  },
  {
    id: "terv",
    name: 'Terv',
    whenToUse: 'Mielőtt bármi nagyobb elindul. Előbb lásd, mit akar csinálni, és csak utána engedd el.',
    kind: "fields",
    fields: [
      {
        label: 'Mit szeretnél elérni?',
        placeholder: 'Egy kapcsolati űrlapot szeretnék a kapcsolat oldalra, ami e-mailt küld nekem.',
        help: 'Nagy vonalakban. A részletek a tervből fognak kiderülni.',
        optional: false,
        inputType: "textarea",
      },
      {
        label: 'Mi az, amihez semmiképp ne nyúljon?',
        placeholder: 'A fejléc és a lábléc maradjon érintetlen.',
        optional: true,
        inputType: "textarea",
      },
      {
        label: 'Van olyan megkötés, amit tudnia kell?',
        placeholder: 'Ne telepítsen új csomagot. Ne használjon külső szolgáltatást.',
        optional: true,
        inputType: "textarea",
      },
    ],
    promptNextjs: `PLAN ONLY — do not write or modify any code yet.

Goal: [mit szeretnél elérni]

[ha van] Do not touch: [amihez ne nyúljon]
[ha van] Constraints: [megkötések]

Report, in Hungarian:
- which files you would create or change, and why each one
- what you would do in what order
- anything in this task that needs a decision from me
- anything you cannot verify from the code

Wait for my approval before making any change.`,
    promptGeneric: `PLAN ONLY — do not write or modify any code yet.

Goal: [mit szeretnél elérni]

[ha van] Do not touch: [amihez ne nyúljon]
[ha van] Constraints: [megkötések]

Report, in Hungarian:
- which files you would create or change, and why each one
- what you would do in what order
- anything in this task that needs a decision from me
- anything you cannot verify from the code

Wait for my approval before making any change.`,
    note: 'Claude Code-ban a `Shift+Tab` is átvált tervezési módba. Ez a prompt akkor is működik, ha nem használod azt.',
  },
  {
    id: "hibajavitas",
    name: 'Hibajavítás',
    whenToUse: 'Kaptál egy hibaüzenetet, vagy valami elromlott az utolsó változtatás után.',
    kind: "fields",
    fields: [
      {
        label: 'Melyik fájlban van a hiba?',
        placeholder: 'Ha nem tudod, hagyd üresen — akkor előbb megkeresi.',
        help: 'Ha nem vagy biztos benne, inkább hagyd üresen, mint hogy rossz helyre küldd.',
        optional: true,
        inputType: "text",
      },
      {
        label: 'Mi a hibaüzenet?',
        placeholder: 'Illeszd be teljes egészében, vágatlanul.',
        help: 'Ne rövidítsd le és ne fogalmazd át. A hibaüzenet legvégén lévő sor gyakran fontosabb, mint az eleje.',
        optional: false,
        inputType: "textarea",
      },
      {
        label: 'Mit csináltatok közvetlenül előtte?',
        placeholder: 'Hozzáadtunk egy új szekciót a főoldalhoz.',
        help: 'Ez a leggyorsabb nyom. A hiba szinte mindig az utolsó változtatásból jön.',
        optional: false,
        inputType: "textarea",
      },
    ],
    promptNextjs: `SCOPE: [ha megadta] Modify ONLY [fájl útvonala].
[ha nem adta meg] Find the cause first. Do not modify anything
until you have told me where the problem is.
Do not touch unrelated files.

Error, verbatim:
[a teljes hibaüzenet]

Last change before this: [mit csináltatok előtte]

DIAGNOSTIC FIRST: Tell me the cause before fixing anything.

Then fix the cause, not the symptom.
Do not silence the error with type casts, @ts-ignore, \`any\`,
or empty catch blocks.
If your first fix does not work, stop and report what you found.
Do not try a second approach without telling me.

Stop when done. Report in Hungarian:
- what the cause was
- what you changed
- what you checked
- anything you assumed or could not verify`,
    promptGeneric: `SCOPE: [ha megadta] Modify ONLY [fájl útvonala].
[ha nem adta meg] Find the cause first. Do not modify anything
until you have told me where the problem is.
Do not touch unrelated files.

Error, verbatim:
[a teljes hibaüzenet]

Last change before this: [mit csináltatok előtte]

DIAGNOSTIC FIRST: Tell me the cause before fixing anything.

Then fix the cause, not the symptom.
Do not silence the error with type casts, @ts-ignore, \`any\`,
or empty catch blocks.
If your first fix does not work, stop and report what you found.
Do not try a second approach without telling me.

Stop when done. Report in Hungarian:
- what the cause was
- what you changed
- what you checked
- anything you assumed or could not verify`,
    note: 'Ha ugyanaz a javítás kétszer nem működik, ne legyen harmadik próbálkozás ugyanabban a beszélgetésben. Vagy diagnosztikai kört futtatsz, vagy új beszélgetést nyitsz. A harmadik kör már a szennyezett előzménnyel dolgozik, és rosszabb lesz, mint az első.',
  },
  {
    id: "diagnosztika",
    name: 'Diagnosztika',
    whenToUse: 'Nem akarsz változtatni, csak meg akarod tudni, mi van a kódban.',
    kind: "fields",
    fields: [
      {
        label: 'Mit olvasson el?',
        placeholder: '`src/components/layout/Header.tsx` és `src/app/layout.tsx`',
        help: 'Konkrét fájlok vagy mappa. Minél szűkebb, annál olcsóbb és pontosabb.',
        optional: false,
        inputType: "textarea",
      },
      {
        label: 'Mit szeretnél tudni?',
        placeholder: 'Hol van beállítva a főmenü sorrendje? Van-e mobilos menü, és ha igen, hol?',
        help: 'Kérdésekben fogalmazz. Soronként egy kérdés.',
        optional: false,
        inputType: "textarea",
      },
    ],
    promptNextjs: `DIAGNOSTIC ONLY — do not modify, create or delete anything.

Read: [mit olvasson el]

Report, in Hungarian:
[kérdések, soronként egy felsorolásponttal]

Quote the relevant lines with their file path and line numbers.
If something is not in these files, say so instead of guessing.

Do not change any file.`,
    promptGeneric: `DIAGNOSTIC ONLY — do not modify, create or delete anything.

Read: [mit olvasson el]

Report, in Hungarian:
[kérdések, soronként egy felsorolásponttal]

Quote the relevant lines with their file path and line numbers.
If something is not in these files, say so instead of guessing.

Do not change any file.`,
    note: 'Egy tisztán olvasó kérdés olcsóbb és pontosabb, mint egy módosító prompt, amiben benne van a kérdés is. Ha bizonytalan vagy, előbb kérdezz, utána módosíts.',
  },
  {
    id: "uj-fajl",
    name: 'Új fájl',
    whenToUse: 'Nincs még meg, amit építeni akarsz.',
    kind: "fields",
    fields: [
      {
        label: 'Hol jöjjön létre?',
        placeholder: {
          nextjs: '`src/app/rolunk/page.tsx`',
          generic: '`rolunk.html`',
        },
        optional: false,
        inputType: "text",
      },
      {
        label: 'Mi legyen benne, milyen sorrendben?',
        placeholder: '1. Cím és rövid bevezető. 2. Három szolgáltatás felsorolva. 3. Kapcsolati gomb.',
        help: 'Számozott lista. Egy sor, egy szekció.',
        optional: false,
        inputType: "textarea",
      },
      {
        label: 'Honnan jön a szöveg?',
        placeholder: '`docs/szovegek/rolunk.md`',
        help: 'Ha van szövegfájlod, add meg. Ha nincs, a modell fog szöveget írni, és azt utána cserélned kell.',
        optional: true,
        inputType: "text",
      },
    ],
    promptNextjs: `SCOPE: Create ONE new file: [útvonal].
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
- anything you assumed or could not verify`,
    promptGeneric: `SCOPE: Create ONE new file: [útvonal].
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
- anything you assumed or could not verify`,
  },
  {
    id: "megjelenes",
    name: 'Megjelenés',
    whenToUse: 'A tartalom megvan, most azt akarod, hogy jól is nézzen ki.',
    kind: "fields",
    fields: [
      {
        label: 'Melyik részt formázza?',
        placeholder: '`src/components/sections/Hero.tsx`',
        optional: false,
        inputType: "text",
      },
      {
        label: 'Hogyan nézzen ki?',
        placeholder: 'A cím legyen nagy és balra zárt, alatta egy rövidebb alcím, a kép a jobb oldalon. Mobilon a kép kerüljön a szöveg alá.',
        help: 'Írd le, amit látni szeretnél. Ne osztályneveket adj meg — azokat ő ismeri jobban.',
        optional: false,
        inputType: "textarea",
      },
      {
        label: 'Mit ne csináljon?',
        placeholder: 'Ne tegyen bele animációt. Ne használjon új színt.',
        help: 'Ez legalább annyit számít, mint amit kérsz. Amit nem tiltasz le, azt hozzá fogja tenni.',
        optional: true,
        inputType: "textarea",
      },
    ],
    promptNextjs: `SCOPE: Modify ONLY [fájl útvonala].
Do not touch other files. npm run build must pass.

TASK: [hogyan nézzen ki]

Use only the design tokens already defined in this project.
Do not introduce new colours, fonts or spacing values.
Mobile first: make it correct at 375px, then scale up.
Do not change any text.

[ha van tiltás] Do not: [mit ne csináljon]

Stop when done. Report in Hungarian, and tell me exactly what
to look at and at what screen width.`,
    promptGeneric: `SCOPE: Modify ONLY [fájl útvonala].
Do not touch other files. Do not add any dependency or framework.

TASK: [hogyan nézzen ki]

Use only the colours, fonts and spacing already used in this
project. Do not introduce new ones.
Make it correct on a 375px wide screen first, then wider.
Do not change any text.

[ha van tiltás] Do not: [mit ne csináljon]

Stop when done. Report in Hungarian, and tell me exactly what
to look at and at what screen width.`,
    note: 'Megjelenésnél a „kész" jelentés nem bizonyíték. Nézd meg a saját szemeddel, azon a szélességen, amit kértél.',
  },
  {
    id: "szoveg",
    name: 'Szöveg',
    whenToUse: 'Elírás van az oldalon, vagy nem fér ki egy cím.',
    kind: "fields",
    fields: [
      {
        label: 'Melyik oldalon vagy fájlban?',
        placeholder: '`src/app/kapcsolat/page.tsx`',
        optional: false,
        inputType: "text",
      },
      {
        label: 'Honnan jön a helyes szöveg?',
        placeholder: '`docs/szovegek/kapcsolat.md`',
        help: 'Előbb a forrásfájlban javítsd, és csak utána futtasd ezt. Ha a kódban javítod, legközelebb újra elromlik.',
        optional: false,
        inputType: "text",
      },
    ],
    promptNextjs: `SCOPE: Modify ONLY [fájl útvonala].
Do not touch other files.

TASK: Update all user-facing text on this page to match the
current content of [szövegfájl]. Copy it verbatim.
Do not translate, rewrite, shorten or re-punctuate anything.

Report every difference you find between the file and the page,
including ones you did not change.

Stop when done. Report in Hungarian.`,
    promptGeneric: `SCOPE: Modify ONLY [fájl útvonala].
Do not touch other files.

TASK: Update all user-facing text on this page to match the
current content of [szövegfájl]. Copy it verbatim.
Do not translate, rewrite, shorten or re-punctuate anything.

Report every difference you find between the file and the page,
including ones you did not change.

Stop when done. Report in Hungarian.`,
    note: 'A szöveg nem a kódban él, hanem a szövegfájlban. Ha ezt egyszer betartod, soha többé nem kell azon gondolkodnod, melyik verzió az igazi.',
  },
  {
    id: "atnezes",
    name: 'Átnézés',
    whenToUse: 'Mielőtt bármi élesbe megy, vagy bárki más is látja.',
    kind: "fields",
    fields: [
      {
        label: 'Mit nézzen át?',
        placeholder: 'Az egész projektet, vagy: `src/app/api/` és `src/lib/`',
        optional: false,
        inputType: "textarea",
      },
      {
        label: 'Van olyan, ami szándékosan nyilvános?',
        placeholder: 'A mérőkód azonosítója és az oldal címe szándékosan kliensoldali.',
        optional: true,
        inputType: "textarea",
      },
    ],
    promptNextjs: `DIAGNOSTIC ONLY — do not modify anything.

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
about it. Do not fix anything yet.`,
    promptGeneric: `DIAGNOSTIC ONLY — do not modify anything.

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
about it. Do not fix anything yet.`,
    note: 'Ez az átnézés segít, de nem garancia. Egy fájlban megtalálja a kiszivárgott kulcsot, a másikban elnézheti. Ha az oldal más emberek adatait kezeli, fizetést dolgoz fel, vagy bárki elérheti az interneten, nézesse át valaki, aki ért hozzá — élesítés előtt.',
  },
  {
    id: "ujrakezdes",
    name: 'Újrakezdés',
    whenToUse: 'Négy-öt sikertelen javítás után, vagy amikor új feladatra váltasz.',
    kind: "fields",
    fields: [
      {
        label: 'Min dolgoztatok eddig?',
        placeholder: 'A kapcsolati űrlap e-mail-küldését próbáltuk működésre bírni.',
        optional: false,
        inputType: "textarea",
      },
      {
        label: 'Mi az, ami már nem működött?',
        placeholder: 'Kétszer próbálta a mezőneveket átírni, attól nem lett jobb. A hiba a szerver válaszánál jön.',
        help: 'Ez a legfontosabb mező. Enélkül az új beszélgetés ugyanazokat a zsákutcákat fogja bejárni.',
        optional: false,
        inputType: "textarea",
      },
      {
        label: 'Mi a jelenlegi állapot?',
        placeholder: 'A build lefut, az űrlap elküldhető, de e-mail nem érkezik meg.',
        optional: false,
        inputType: "textarea",
      },
    ],
    promptNextjs: `Fresh start on this task. Previous attempts are not in your
context, so here is what matters:

Task: [min dolgoztatok]

Already tried, did not work: [mi nem működött]
Do not repeat these approaches.

Current state: [jelenlegi állapot]

DIAGNOSTIC FIRST: Before changing anything, tell me where you
think the problem is and what you need to read to confirm it.

Stop and wait for my answer.`,
    promptGeneric: `Fresh start on this task. Previous attempts are not in your
context, so here is what matters:

Task: [min dolgoztatok]

Already tried, did not work: [mi nem működött]
Do not repeat these approaches.

Current state: [jelenlegi állapot]

DIAGNOSTIC FIRST: Before changing anything, tell me where you
think the problem is and what you need to read to confirm it.

Stop and wait for my answer.`,
    note: 'A hosszú beszélgetés minden üzenetnél viszi magával a teljes előzményt — a rossz irányokat is. Négy sikertelen javítás után gyorsabb újrakezdeni, mint ötödször próbálkozni. A `/clear` parancs üríti a beszélgetést, a fájljaid érintetlenül maradnak.',
  },
  {
    id: "mentes",
    name: 'Mentés',
    whenToUse: 'A projekt elején egyszer, utána amikor vissza kell lépni.',
    kind: "choice",
    choiceLabel: 'Mit szeretnél?',
    options: [
      {
        id: "beallitas",
        label: 'Mentés beállítása a projekt elején',
        prompt: `Set up Git for this project if it is not set up yet.

After each completed task, commit the change with a short,
clear message in Hungarian describing what was done.
One task, one commit.

Never commit files containing secrets. Make sure .env and any
local configuration files are ignored.

Report, in Hungarian, what you set up and what is now ignored.`,
      },
      {
        id: "visszalepes",
        label: 'Visszalépés az utolsó működő állapotra',
        prompt: `DIAGNOSTIC FIRST: Show me the last five commits with their
messages, and tell me which files have uncommitted changes.

Do not revert anything yet. Wait for me to tell you which
point to go back to.

Report in Hungarian.`,
      },
    ],
    note: 'Ez a visszavonás gombod. Nem kell értened, hogyan működik — elég, ha a projekt elején egyszer beállítod, és onnantól bármikor vissza tudsz lépni egy működő állapotra.',
  },
];
