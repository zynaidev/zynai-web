# 1. lépés — Technikai javítások

> Forrás: `00-feltaras.md`. Szabályok: `00-README.md`. Eredmény:
> `eredmeny-01.md`. A szeletek sorrendje kötött.

---

## J1 — Node 24

A Node 20 élettartama 2026 áprilisában lejárt, a Dockerfile még ezt használja.

- **Fájlok:** `Dockerfile`, `package.json`, új `.nvmrc`
- **Teendő:** a Dockerfile minden `node:20-alpine` hivatkozása legyen
  `node:24-alpine`. A `package.json` kapjon `"engines": { "node": ">=24" }`
  bejegyzést. Az `.nvmrc` tartalma: `24`.
- **ÁLLJ, ha** a helyi `node -v` nem `v24`: írd le a verziót, és ne folytasd
  ezt a szeletet. A többi szelet mehet tovább.
- **Kész, ha:** a build zöld. A Docker-buildet, ha a démon nem fut, jelöld
  „nem ellenőrzött"-nek.
- **Commit:** `Upgrade Node to 24 in Docker and engines`

## J2 — X-Powered-By és biztonsági fejlécek

- **Fájl:** `next.config.ts`
- **Teendő:**
  1. `poweredByHeader: false`
  2. `async headers()` minden útvonalra (`source: "/:path*"`):
     - `X-Content-Type-Options: nosniff`
     - `Referrer-Policy: strict-origin-when-cross-origin`
     - `X-Frame-Options: SAMEORIGIN`
     - `Permissions-Policy: camera=(), microphone=(), geolocation=()`
     - `Strict-Transport-Security: max-age=31536000` (`includeSubDomains` és
       `preload` nélkül, lásd D6)
  3. CSP **nem** kerül be most. A GTM, a Cal.com és a three.js miatt ez
     külön, Report-Only módban induló munka.
- **Kész, ha:** `npm run build && npm start` után a
  `curl -sI http://localhost:3000` kimenetében nincs `X-Powered-By`, és az
  öt fejléc megvan. A kimenetet tedd az eredményfájlba.
- **Commit:** `Hide X-Powered-By and add security headers`

## J3 — Edge runtime eltávolítása

- **Fájl:** `app/opengraph-image.tsx`
- **Teendő:** a `runtime = "edge"` export törlése. A Node runtime az
  alapértelmezés, és a kép így statikusan generálható.
- **Diagnózis előbb:** használ-e a fájl edge-specifikus API-t (például
  `fetch` relatív `new URL(..., import.meta.url)` betűfájlra)? Ha igen, és a
  Node runtime alatt másképp kell, ÁLLJ, és írd le.
- **Kész, ha:** a build-figyelmeztetés eltűnt, és a
  `curl -sI http://localhost:3000/opengraph-image` válasza `200`,
  `content-type: image/png`.
- **Commit:** `Use Node runtime for root OG image`

## J4 — A három lint-hiba

`react-hooks/set-state-in-effect`:
`app/(marketing)/ai-tartalmak/page.tsx:70`, `components/reveal-lines.tsx:47`
és `:53`.

- **Fájlok:** csak ez a kettő. (Ha a `useSearchParams` miatt Suspense-határ
  kell, és az csak a `page.tsx`-ben helyezhető el, az még belefér.)
- **Diagnózis előbb:** fájlonként írd le, miért állít state-et az effect, és
  mi lenne a helyes minta (származtatott érték renderkor, `useSearchParams` a
  `?kategoria=` paraméterhez, ref, vagy eseménykezelő).
- **Teendő:** az okot javítsd. `eslint-disable` tilos. A látható viselkedés
  nem változhat: a `?kategoria=` link ugyanarra a szűrt listára nyíljon, és a
  sor-animáció ugyanúgy fusson.
- **ÁLLJ, ha** a javítás látható viselkedést változtatna.
- **Kész, ha:** `npm run lint` hibátlan (a `no-img-element` figyelmeztetést a
  J7 viszi el).
- **Nézd meg (Ati):** `/ai-tartalmak?kategoria=…` szűr-e, és a sor-animáció
  rendben fut-e.
- **Commit:** `Fix set-state-in-effect lint errors`

## J5 — A `/blog` helyőrző törlése (D3)

- **Diagnózis előbb:** `grep -rn "/blog" app components lib content config`.
  Ha bármi a `/blog`-ra mutat (a `public/blog` képmappát kivéve), ÁLLJ, és
  sorold fel.
- **Teendő:** az `app/blog/` mappa törlése. A `public/blog/` mappa marad,
  mert a cikkek képei vannak benne.
- **Kész, ha:** a build zöld, és a `/blog/brand-foundation` 404-et ad
  (`npm start` után `curl -sI`).
- **Commit:** `Remove placeholder blog route`

## J6 — A nem szabványos favicon

- **Diagnózis előbb:** hivatkozik-e bármi az `app/favicon.ico.png`-re?
- **Teendő:** ha nem, törlés. Az ikon a `/ZynAI_favicon.png` marad, ahogy a
  `layout.tsx` és a `manifest.ts` beállítja.
- **Commit:** `Remove unused favicon file`

## J7 — A CDN-ikonok helyi kiszolgálása

A `simple-icons@latest` verzió nélküli, és a látogató IP-je hozzájárulás
nélkül megy a jsDelivr-hez.

- **Fájlok:** `components/sections/IntegrationStack.tsx`, új
  `public/icons/integrations/*.svg`
- **Diagnózis előbb:** sorold fel a használt ikonok slugjait, és nézd meg a
  simple-icons aktuális verzióját (`npm view simple-icons version`).
- **Teendő:**
  1. Az ikonok SVG-jének letöltése a **rögzített** verzióból
     (`https://cdn.jsdelivr.net/npm/simple-icons@<verzió>/icons/<slug>.svg`) a
     `public/icons/integrations/` mappába. Npm-függőség nem kerül be.
  2. A komponens a helyi fájlokat használja, `next/image`-dzsel.
  3. A fájl elejére egy komment: a simple-icons verziója és licence (a
     licencet a csomag `LICENSE.md`-jéből ellenőrizd, ne emlékezetből).
- **ÁLLJ, ha** valamelyik ikon nem létezik a rögzített verzióban (a
  simple-icons védjegy miatt eltávolít márkákat). Sorold fel, melyik az.
- **Kész, ha:** a build zöld, a lint figyelmeztetés nélküli, és a forrásban
  nincs `jsdelivr`.
- **Nézd meg (Ati):** a főoldalon az ikonok ugyanúgy jelennek-e meg.
- **Commit:** `Self-host integration icons`

## J8 — A sitemap kiegészítése

- **Fájl:** `app/sitemap.ts`
- **Teendő:** a `/idopontfoglalas` és az `/adatvedelem` felvétele, a meglévő
  bejegyzések mintájára.
- **Kész, ha:** `npm start` után a `curl -s http://localhost:3000/sitemap.xml`
  kimenetében mindkettő szerepel.
- **Commit:** `Add booking and privacy pages to sitemap`

## J9 — E-mail és webhook beállításai környezeti változóba

A címzett kódba írt Gmail-cím, a feladó a Resend próbacíme, és az n8n
webhook-URL-ek is a kódban vannak.

- **Fájlok:** `app/api/contact/route.ts`, `app/api/pilot/route.ts`, új
  `.env.example`
- **Teendő:**
  1. Csak szerveroldali változók:
     - `CONTACT_TO_EMAIL` (címzett)
     - `CONTACT_FROM_EMAIL` (feladó)
     - `N8N_CONTACT_WEBHOOK_URL`
     - `N8N_PILOT_WEBHOOK_URL`
  2. Ha a `CONTACT_TO_EMAIL`, a `CONTACT_FROM_EMAIL` vagy a `RESEND_API_KEY`
     hiányzik, a route 500-at ad, és a szerver naplójába egy sort ír
     (`console.error`, a változó **nevével**, személyes adat nélkül). Ha egy
     n8n-URL hiányzik, az n8n-hívás kimarad, és az űrlap tovább működik.
  3. Az n8n-hívás `catch`-e ne csak kommentet tartalmazzon:
     `console.error` a hiba nevével és a HTTP-státusszal, személyes adat
     nélkül. A látogató válaszát ez nem befolyásolja, mert az e-mail az
     elsődleges csatorna.
  4. `.env.example`: a négy új változó és a `RESEND_API_KEY`, **érték
     nélkül**, egy-egy soros magyar kommenttel.
- **Nézd meg (Ati):** a négy változó értékét **te** írod be a `.env.local`-ba
  és a szerver környezetébe (lásd `03` K2). Addig a helyi űrlap 500-at ad, és
  ez várt viselkedés.
- **Commit:** `Move mail and webhook settings to environment variables`

## J10 — Az e-mail-formátum kliensoldali ellenőrzése

- **Fájl:** `app/(marketing)/kapcsolatfelvetel/page.tsx`
- **Teendő:** a név és az e-mail lépésnél az e-mail-formátum ellenőrzése
  ugyanazzal a mintával, amit a szerver használ (ha a `lib/form-guard.ts`
  exportálja, onnan importáld; ha nem, ÁLLJ, és kérdezz, mielőtt a
  `form-guard.ts`-hez nyúlsz).
- **Szöveg:** ha a fájlban már van e-mail-formátum hibaüzenet, azt használd.
  Ha nincs, ÁLLJ, és kérdezd meg a szöveget.
- **Commit:** `Validate email format on contact form`

---

## A lépés vége

Az `eredmeny-01.md` végén:

1. Összesítő táblázat (szelet · állapot · commit).
2. **Kézi teendők** listája Atinak: amit a „Nézd meg" sorokban gyűjtöttél,
   plusz a J9 környezeti változói.
3. `git log --oneline -15` kimenete.
