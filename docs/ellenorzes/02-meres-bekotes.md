# 2. lépés — GTM, Consent Mode v2, sütibanner, konverziók

> Szabályok: `00-README.md`. Napló: `valtozasnaplo.md` (új „2. lépés”
> szakasz). Előfeltétel: az `01` kész. A döntések (D1, D2, D4, D5) a
> README-ben vannak. Az „ÁLLJ” itt kérdést jelent (README 9. szabály).

## Az elv (minden szeletre érvényes)

- **Egyetlen Google-azonosító a kódban:** a GTM-tárolóé, a
  `NEXT_PUBLIC_GTM_ID` változóból. `G-`, `AW-`, `gtag/js` nem kerül a kódba: a
  GA4-et és az Ads-et a GTM küldi, az oldal csak a `dataLayer`-be ír.
- **Ha a `NEXT_PUBLIC_GTM_ID` üres, semmi nem renderelődik:** se consent
  szkript, se GTM, se banner. Helyben (dev) így nincs mérés, és nem szennyezi
  az éles adatot.
- **A `NEXT_PUBLIC_` változó build-időben kerül a kódba.** Docker-buildnél ez
  build-argumentum, nem futásidejű env (M2).
- **A consent default minden más előtt fut**, a gyökér layout `<head>`-jében,
  nyers `<script>`-ként. A GTM utána tölt, `next/script`-tel,
  `afterInteractive` módon.
- **Személyes adat soha** nem kerül eseménybe, URL-be vagy naplóba.
- **Konverzió csak siker után:** a szerver `ok` válasza, illetve a Cal.com
  `bookingSuccessfulV2` eseménye után. Kattintásra soha.
- A sikeres beküldés után nincs oldalváltás (a komponens saját sikerállapotot
  mutat), ezért elég a sima `track()`, és nem kell megvárni a GTM-et.

---

## M1 — Az analitikai könyvtár

- **Új fájlok:** `lib/analytics/events.ts`, `lib/analytics/track.ts`,
  `lib/analytics/consent.ts`. Más fájlhoz nem nyúlsz.

**`lib/analytics/events.ts`** — szó szerint:

```ts
// Event names and parameters. Decided in docs/ellenorzes/00-README.md (D1).
// Never rename after launch: GA4 key events and Ads conversions depend on
// these exact strings. Never add personal data (name, email, phone,
// message, booking title) to any parameter.
// Do NOT use form_submit or form_start: GA4 enhanced measurement uses them.

export const TRACK_EVENTS = [
  'generate_lead',
  'pilot_application',
  'booking_complete',
  'phone_click',
  'email_click',
] as const

export type TrackEvent = (typeof TRACK_EVENTS)[number]

type CoversEveryEvent<T extends Record<TrackEvent, object>> = T

export type TrackEventParams = CoversEveryEvent<{
  generate_lead: { lead_type: 'contact_form' }
  pilot_application: Record<string, never>
  booking_complete: Record<string, never>
  phone_click: Record<string, never>
  email_click: Record<string, never>
}>
```

**`lib/analytics/track.ts`** — szó szerint:

```ts
import type { TrackEvent, TrackEventParams } from './events'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

/** The only place that writes events to window.dataLayer. No-op on the server. */
export function track<E extends TrackEvent>(
  event: E,
  params: TrackEventParams[E],
): void {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...params })
}
```

**`lib/analytics/consent.ts`** — ezt a viselkedést valósítsd meg:

- `CONSENT_STORAGE_KEY = 'zynai_consent_v1'`, értéke `'granted'` vagy
  `'denied'`.
- `readConsent(): 'granted' | 'denied' | null`. A localStorage
  privát módban kivételt dobhat: ilyenkor `null`.
- `saveConsent(choice)`: elmenti a döntést, és meghívja a
  `window.gtag?.('consent', 'update', {...})` függvényt. Mind a négy
  paraméter (`ad_storage`, `analytics_storage`, `ad_user_data`,
  `ad_personalization`) `granted`, illetve `denied` lesz. **Elutasításnál is
  van update.**
- `OPEN_CONSENT_EVENT = 'zynai:consent-open'` és `openConsentSettings()`,
  amely ezt a `window` eseményt küldi (a lábléc linkje hívja).
- `consentDefaultScript(): string`: a gyökér layout inline szkriptjének
  tartalma. A kulcsot `JSON.stringify(CONSENT_STORAGE_KEY)` illeszti be, hogy
  egy helyen legyen definiálva:

```js
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', {
  ad_storage: 'denied',
  analytics_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  wait_for_update: 500
});
try {
  var c = localStorage.getItem(<KEY>);
  if (c === 'granted') {
    gtag('consent', 'update', {
      ad_storage: 'granted', analytics_storage: 'granted',
      ad_user_data: 'granted', ad_personalization: 'granted'
    });
  }
} catch (e) { /* storage blocked (private mode): defaults stay denied */ }
```

> ⚠️ A `gtag` függvény az `arguments` objektumot teszi a `dataLayer`-be. **Ne
> „modernizáld"** rest paraméterre (`(...args) => dataLayer.push(args)`): a GTM
> a consent parancsokat csak `arguments` formában ismeri fel, tömbként csendben
> figyelmen kívül hagyja. Ez az egyetlen engedélyezett kommentes `catch`.

- **Kész, ha:** tsc, lint, build zöld. Az oldal viselkedése nem változott.
- **Commit:** `Add analytics event contract, track helper and consent helpers`

## M2 — GTM és consent default a gyökér layoutban, Docker build-arg

- **Fájlok:** `app/layout.tsx`, `Dockerfile`, `.env.example`
- **Diagnózis előbb:** írd le, mi van most a gyökér layout `<html>`,
  `<head>` és `<body>` elemében, és a Dockerfile builder szakaszának
  sorrendjét.
- **Teendő:**
  1. `const gtmId = process.env.NEXT_PUBLIC_GTM_ID`. Ha üres, a 2–4. pont
     egyike sem renderelődik.
  2. `<head>` elem (ha nincs, létrehozod), benne **egyetlen** nyers
     `<script>`, `dangerouslySetInnerHTML={{ __html: consentDefaultScript() }}`.
     Nem `next/script`. A címek és meták maradnak a Metadata API-ban.
  3. A `<body>` elején a GTM hivatalos `noscript` iframe-je.
  4. A GTM hivatalos snippetje `next/script`-tel: `id="gtm"`,
     `strategy="afterInteractive"`. **`beforeInteractive` tilos.**
  5. `Dockerfile` builder szakasz, a `RUN npm run build` **elé**:
     ```dockerfile
     ARG NEXT_PUBLIC_GTM_ID
     ENV NEXT_PUBLIC_GTM_ID=$NEXT_PUBLIC_GTM_ID
     ```
  6. `.env.example`: `NEXT_PUBLIC_GTM_ID=` és egy komment: „Csak éles
     buildnél, build-argumentumként. Helyben üresen hagyni.”
- **Kész, ha** (a buildelt kimenetet nézed, nem a forrást):
  - `npm run build && npm start` env nélkül: a
    `curl -s http://localhost:3000 | grep -c googletagmanager` eredménye `0`.
  - `NEXT_PUBLIC_GTM_ID=GTM-TEST000 npm run build && npm start`, majd
    `curl -s http://localhost:3000 | grep -boE "consent['\"] *, *['\"]default|googletagmanager\.com/gtm\.js"`:
    a consent default pozíciója kisebb, mint a GTM-é (a két számot írd az
    eredménybe). Utána építsd újra env nélkül.
  - A Docker-build, ha nincs démon: „nem ellenőrzött".
- **Commit:** `Load GTM after Consent Mode v2 default in root layout`

## M3 — Sütibanner és süti-beállítások link

- **Új fájl:** `components/consent/ConsentBanner.tsx` (`"use client"`)
- **Módosul:** `app/layout.tsx` (a bannert a `<body>`-ban rendereli, ha
  van `gtmId`), a lábléc komponense (a feltárás szerint
  `components/layout/Footer.tsx`)
- **Viselkedés:**
  - Mount után `readConsent()`. Ha `null`, a banner megjelenik.
  - **Elfogadom** → `saveConsent('granted')`, a banner bezárul.
  - **Csak a szükségeseket** → `saveConsent('denied')`, a banner bezárul.
  - Az `OPEN_CONSENT_EVENT`-re újra megjelenik.
  - Nincs X gomb és nincs „bezárás döntés nélkül": a két gomb egyenrangú,
    azonos méretű és súlyú.
  - Hozzáférhetőség: `role="dialog"`, `aria-labelledby` a címre,
    billentyűzettel elérhető gombok, látható fókusz, 44 px-es érintési
    felület. A fókuszt nem csapdázza, mert nem modális.
  - Rétegzés: `position: fixed`, alul. A `z-index` a `MatrixBackground` és a
    `Header` fölött van. A gyökér layoutban él, a smooth-scroll (Lenis)
    burkolón kívül. Ha a Lenis mégis elnyeli a görgetést vagy a kattintást a
    bannerben, ÁLLJ.
  - Stílus: a meglévő design tokenek és komponensek (`components/ui`).
    Új szín nincs. Animáció csak `opacity` és `transform`.
- **Lábléc:** egy „Süti-beállítások" link (gomb szerepű,
  `openConsentSettings()`), az adatvédelmi link mellett. Ha a lábléc szerver
  komponens, a link külön kis kliens komponens:
  `components/consent/ConsentSettingsLink.tsx`.
- **Hangnem (D5):** a szöveg előtt olvasd el a `/kapcsolatfelvetel` és a
  főoldal látható szövegét, és állapítsd meg, tegező vagy magázó-e az oldal.
  Az űrlap szervere tegező („Kérlek, adj meg…”), ezért ez a valószínű. Ha
  vegyes vagy nem egyértelmű, ÁLLJ, és kérdezz. Utána a megfelelő változatot
  használd, szó szerint:
  - Cím (mindkettő): `Sütik`
  - Szöveg, **tegező**: `Az oldal működéséhez szükséges sütiket mindig használunk. Ha elfogadod, a Google Analytics és a Google hirdetési eszközei segítségével mérjük, hogyan használják az oldalt. A döntésedet bármikor megváltoztathatod a lábléc „Süti-beállítások” linkjével.`
  - Szöveg, **magázó**: `Az oldal működéséhez szükséges sütiket mindig használjuk. Ha elfogadja, a Google Analytics és a Google hirdetési eszközei segítségével mérjük, hogyan használják az oldalt. A döntését bármikor megváltoztathatja a lábléc „Süti-beállítások” linkjével.`
  - Link a szöveg után (mindkettő): `Részletek` → `/adatvedelem`
  - Gombok (mindkettő): `Elfogadom` · `Csak a szükségeseket`
  - Lábléc link (mindkettő): `Süti-beállítások`
- **Kész, ha:** tsc, lint, build zöld. `GTM-TEST000` builddel helyben: a
  banner megjelenik, a döntés után eltűnik, újratöltésre nem jön vissza, a
  lábléc linkje visszahozza. A konzolban
  `dataLayer.filter(e => e[0] === 'consent')` → egy `default`, és döntés után
  egy `update` a megfelelő értékekkel. (A konzolellenőrzést, ha nincs
  böngésződ, jelöld a „Nézd meg" sorban Atinak.)
- **Commit:** `Add cookie consent banner and settings link`

## M4 — Telefon- és e-mail-kattintás

- **Diagnózis előbb:** `grep -rn "tel:\|mailto:" app components`. Sorold
  fel a találatokat (fájl, sor, szerver vagy kliens komponens).
- **Új fájlok:** `components/ui/PhoneLink.tsx`, `components/ui/MailtoLink.tsx`
  (`"use client"`). Egy `<a>`, `onClick`-re `track('phone_click', {})`, illetve
  `track('email_click', {})`. A navigációt nem akadályozza.
- **Módosul:** csak a diagnózisban talált fájlok, ahol a `tel:`/`mailto:`
  link a látható felületen van. A JSON-LD-ben és a cikkek szövegében lévő
  címekhez nem nyúlsz.
- **ÁLLJ, ha** 6-nál több fájlt érintene: sorold fel, és kérdezz.
- **Commit:** `Track phone and email link clicks`

## M5 — Űrlapkonverziók

- **Fájlok:** `app/(marketing)/kapcsolatfelvetel/page.tsx`,
  `app/(marketing)/vibecoding-pilot/PilotApplicationForm.tsx`
- **Diagnózis előbb:** fájlonként azt a sort, ahol a válasz `ok`-ságát
  vizsgálja, és ahol a sikerállapotra vált. A honeypotnál a route csendes
  200-at ad: ellenőrizd, hogy a kliens ezt is sikernek veszi-e. Ha igen, írd
  le (nem javítod, csak jelzed: a bot nem futtat JS-t, ezért ez nem torzít).
- **Teendő:** a sikerállapotra váltás előtt, kizárólag `ok` válasz után:
  - kapcsolatfelvétel: `track('generate_lead', { lead_type: 'contact_form' })`
  - pilot: `track('pilot_application', {})`

  Hibás válasznál, hálózati hibánál és kliensoldali validációs hibánál
  nincs esemény. Egy beküldés pontosan egy eseményt adhat (dupla kattintás,
  újrarenderelés ne küldjön kettőt).
- **Commit:** `Fire lead events after confirmed form submissions`

## M6 — Cal.com: kattintásra betöltés és foglalási konverzió (D4)

- **Fájl:** `components/CalEmbed.tsx`. Ha a két felhasználási helyen
  (`/idopontfoglalas`, a kapcsolatfelvétel sikerképernyője) a propokon kell
  változtatni, azok is.
- **Diagnózis előbb:**
  1. A telepített `@calcom/embed-react` verziója, a `getCalApi` szignatúrája
     a csomag típusdefiníciójából, és hogy a komponens használ-e
     `namespace`-t.
  2. A Cal.com hivatalos dokumentációja szerint
     ([Embed Events](https://cal.com/help/embedding/embed-events)) a sikeres
     foglalás eseménye a `bookingSuccessfulV2` (a `bookingSuccessful`
     elavult). A teszt módú foglalás külön esemény
     (`dryRunBookingSuccessfulV2`), azt **nem** mérjük. Namespace esetén a
     figyelő a namespace-es API-n fut. Ha a telepített csomag mást mutat, ÁLLJ.
- **Teendő:**
  1. Alapállapot: egy fenntartott magasságú doboz (a beágyazás várható
     magassága, hogy a betöltés ne ugrassza az oldalt), benne egy gomb és egy
     sima link a `https://cal.com/zynai/felmeres` címre (`target="_blank"`,
     `rel="noopener noreferrer"`).
  2. Gombnyomásra mountol a beágyazás.
  3. Mount után `getCalApi(...)`, majd
     `cal('on', { action: 'bookingSuccessfulV2', callback })`. A callback
     `track('booking_complete', {})`-t hív. A payload egyetlen mezője sem
     kerül az eseménybe: a `title` nevet tartalmazhat. A `uid` alapján egy
     foglalás csak egyszer számít (modul szintű `Set`).
- **Szövegek — szó szerint (a hangnem az M3-ban megállapított, D5):**
  - Gomb (mindkettő): `Naptár megnyitása`
  - Magyarázó sor (mindkettő): `A foglalási naptárat a Cal.com biztosítja. Megnyitáskor a Cal.com oldala töltődik be.`
  - Link, **tegező**: `Vagy foglalj közvetlenül a Cal.com oldalán`
  - Link, **magázó**: `Vagy foglaljon közvetlenül a Cal.com oldalán`
- **Kész, ha:** tsc, lint, build zöld. A beágyazás csak kattintásra tölt
  (a hálózati fülön előtte nincs `cal.com` kérés).
- **Nézd meg (Ati):** valódi tesztfoglalás élesben → egy `booking_complete`
  a GA4 DebugView-ban, utána a foglalás lemondása.
- **Commit:** `Load Cal.com embed on click and track completed bookings`

## M7 — Önellenőrzés (csak diagnózis, nincs commit a kódhoz)

Olvasd el a `app/layout.tsx`, a `lib/analytics/*`, a banner, a lábléc, az M4–M6
fájljait, és válaszolj a `valtozasnaplo.md` M7 szakaszában, bizonyítékkal:

1. A consent default inline `<script>` a `<head>`-ben, és a GTM előtt fut?
2. Mind a négy paraméter `denied` a defaultban?
3. Elfogadás és elutasítás is küld `update`-et?
4. A tárolt döntés minden oldalbetöltéskor újra érvényesül (az inline
   szkriptben)?
5. `grep -rn "G-[A-Z0-9]\{6,\}\|AW-[0-9]\|gtag/js\|googleadservices" app components lib`
   → üres?
6. Van-e kódból küldött `page_view`? (Nem lehet.)
7. Az eseménynevek pontosan a D1 szerintiek? Van-e `form_submit` vagy
   `form_start`?
8. Minden konverzió csak siker után szól?
9. Kerül-e személyes adat a `track()`-be vagy a `dataLayer`-be?
10. `NEXT_PUBLIC_GTM_ID` nélkül a buildelt HTML-ben nincs semmi mérés?

A napló végén a **Kézi teendők**: a `03-kezi-beallitasok.md` pontjai,
amelyeket a kód feltételez. Az M7 válaszait a szelet-commitba teszed
(`Document analytics self-check in change log`), ez az egyetlen commit, amely
csak a naplót érinti.

A lépés végén a chatben rövid magyar összegzés (README 13. szabály).
