# Változásnapló — zynai-website ellenőrzés

> Az 1. lépés (`01-javitasok.md`) szeletei. Az első futás (J1–J4, J8–J10)
> eredményei az `eredmeny-01.md`-ből kerültek át. A hash-ek a szelet saját
> commitjára mutatnak.
> Indulás: 2026-10-08, helyi `node -v` = `v24.14.1`.

## Összesítés

| Szelet | Állapot | Commit |
|---|---|---|
| J1 — Node 24 | kész (Docker-build nem ellenőrzött) | `24f1483` |
| J2 — X-Powered-By és biztonsági fejlécek | kész | `54c84c3` |
| J3 — Edge runtime eltávolítása | kész | `89a7132` |
| J4 — A három lint-hiba | kész | `89b47b3` |
| J5 — `/blog` helyőrző törlése | kész | `588e158` |
| J6 — Nem szabványos favicon | kész | `3be145d` |
| J7 — CDN-ikonok helyi kiszolgálása | kész | (a következő bejegyzésnél) |
| J8 — Sitemap kiegészítése | kész | `c31d5ee` |
| J9 — E-mail és webhook env-be | kész | `e79ceb5` |
| J10 — E-mail-formátum kliensoldalon | kész | `d432abf` |
| J11 — `.env.example` követése | hátravan | — |
| J12 — Hiányzó beállítás ne szivárogjon | kész | `425f3f2` |

---

## J1 — Node 24
Állapot: kész
Commit: 24f1483
Mit és miért: A Node 20 támogatása 2026 áprilisában lejárt, ezért a Dockerfile `node:24-alpine` képet használ, a `package.json` `engines` mezője `>=24`, és új `.nvmrc` rögzíti a 24-es főverziót.
Fájlok: `Dockerfile`, `package.json`, `.nvmrc` (új)
Ellenőrzés: tsc ✓ · lint ✓ (a 3 ismert hiba + 1 figyelmeztetés, új nincs) · build ✓ · Docker-build: **nem ellenőrzött** (a Docker-démon nem futott)
Ati dönt / Ati ellenőrzi: a szerveren a következő Docker-build menjen át a `node:24-alpine` képpel. Az `@types/node` még `^20`; jelezve, nem módosítva.

## J2 — X-Powered-By és biztonsági fejlécek
Állapot: kész
Commit: 54c84c3
Mit és miért: A szerver már nem árulja el, hogy Next.js-t használ (`X-Powered-By` kikapcsolva), és minden válasz öt biztonsági fejlécet kap (`nosniff`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`, HSTS `includeSubDomains` nélkül). CSP még nincs.
Fájlok: `next.config.ts`
Ellenőrzés: tsc ✓ · lint ✓ · build ✓ · `npm start` + `curl -sI http://localhost:3000`: az öt fejléc megvan, `X-Powered-By` nincs.
Ati dönt / Ati ellenőrzi: nincs. Megjegyzés: a `d627a17` commit üzenete már említette az X-Powered-By elrejtését, de a változás akkor nem került be; most igen. A `next start` figyelmeztet, hogy `output: "standalone"` mellett a `node .next/standalone/server.js` az ajánlott indítás.

## J3 — Edge runtime eltávolítása
Állapot: kész
Commit: 89a7132
Mit és miért: A főoldali megosztási kép (`opengraph-image`) edge runtime helyett Node runtime-on fut, így statikusan generálható, és két build-figyelmeztetés eltűnt. A fájl nem használt edge-specifikus API-t.
Fájlok: `app/opengraph-image.tsx`
Ellenőrzés: tsc ✓ · lint ✓ · build ✓ · `curl -sI /opengraph-image` → `200`, `content-type: image/png`
Ati dönt / Ati ellenőrzi: nincs

## J4 — A három lint-hiba
Állapot: kész
Commit: 89b47b3
Mit és miért: Három helyen az effect state-et állított be, ami felesleges extra renderelést okozott. A `/ai-tartalmak` szűrője most a `?kategoria=` paraméterből számolódik renderkor, a `RevealLines` pedig `useSyncExternalStore`-ral olvassa a „hidratáltunk-e” és a „csökkentett mozgás” állapotot.
Fájlok: `app/(marketing)/ai-tartalmak/page.tsx`, `components/reveal-lines.tsx`
Ellenőrzés: tsc ✓ · lint ✓ (0 hiba) · build ✓
Ati dönt / Ati ellenőrzi: `/ai-tartalmak?kategoria=…` szűr-e (a fejléc lenyílójából is, már a lapon állva), és a címek sor-animációja rendben fut-e betöltéskor és oldalváltáskor. Két apró villanás megszűnt: a `?kategoria=` linknél a lista azonnal szűrve jelenik meg, és kliensoldali navigációnál a cím nem villan fel az animáció előtt.

## J8 — A sitemap kiegészítése
Állapot: kész
Commit: c31d5ee
Mit és miért: A `/idopontfoglalas` és az `/adatvedelem` bekerült a sitemapbe, hogy a keresők megtalálják.
Fájlok: `app/sitemap.ts`
Ellenőrzés: tsc ✓ · lint ✓ · build ✓ · a `curl -s /sitemap.xml` kimenetében mindkettő szerepel.
Ati dönt / Ati ellenőrzi: a gyakoriságot és prioritást én választottam (`/idopontfoglalas` monthly / 0.8, `/adatvedelem` yearly / 0.3); ha mást szeretnél, szólj.

## J9 — E-mail és webhook beállításai környezeti változóba
Állapot: kész
Commit: e79ceb5
Mit és miért: A címzett, a feladó és az n8n webhook-címek kikerültek a kódból négy szerveroldali környezeti változóba (`CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `N8N_CONTACT_WEBHOOK_URL`, `N8N_PILOT_WEBHOOK_URL`). Hiányzó e-mail-beállításnál az űrlap 500-at ad és naplóz; hiányzó vagy hibás n8n-hívásnál az űrlap tovább működik, a hiba csak a naplóba kerül.
Fájlok: `app/api/contact/route.ts`, `app/api/pilot/route.ts`, `.env.example` (új)
Ellenőrzés: tsc ✓ · lint ✓ · build ✓ · üres POST mindkét route-ra → 500, a naplóban `[contact]`/`[pilot] Hiányzó környezeti változó: …`
Ati dönt / Ati ellenőrzi: a négy változó értékét te írod be a `.env.local`-ba és a szerver környezetébe (`03` K2); addig az űrlapok 500-at adnak. A korábbi értékek a git-történetben megvannak (`git show c31d5ee:app/api/contact/route.ts`, illetve `…pilot/route.ts`). A `.env.example` `git add -f`-fel került be (lásd J11). A hiányzó változók nevei a kliensnek is megjelentek: ezt a J12 javította.

## J10 — Az e-mail-formátum kliensoldali ellenőrzése
Állapot: kész
Commit: d432abf
Mit és miért: A kapcsolatfelvételi űrlap e-mail lépése már a böngészőben is ellenőrzi a címformátumot, ugyanazzal a mintával, mint a szerver (`isValidEmail` a `lib/form-guard.ts`-ből). A hibaüzenet a szerver szövege: „Kérlek, adj meg egy érvényes e-mail címet.”
Fájlok: `app/(marketing)/kapcsolatfelvetel/page.tsx`
Ellenőrzés: tsc ✓ · lint ✓ · build ✓
Ati dönt / Ati ellenőrzi: a `/kapcsolatfelvetel` e-mail lépésénél például az `abc@x` címre megjelenik-e a hibaüzenet, és érvényes címmel tovább lehet-e lépni.

## J5 — A `/blog` helyőrző törlése (D3)
Állapot: kész
Commit: 588e158
Mit és miért: Az angol nyelvű `/blog/[slug]` helyőrző oldal törölve, mert semmi nem hivatkozott rá (a `/blog` szó csak a `public/blog` képeknél és külső URL-eknél fordult elő). A `public/blog` képmappa megmaradt, a cikkek képei ott vannak.
Fájlok: `app/blog/[slug]/page.tsx` (törölve)
Ellenőrzés: tsc ✓ · lint ✓ · build ✓ · `npm start` után `curl -sI /blog/brand-foundation` → `404 Not Found`
Ati dönt / Ati ellenőrzi: nincs. Megjegyzés: a tsc a build előtt az elavult `.next/types` miatt hibát jelezhet; build után zöld.

## J6 — A nem szabványos favicon
Állapot: kész
Commit: 3be145d
Mit és miért: A `favicon.ico.png` nem szabványos név, és semmi nem hivatkozott rá, ezért törölve. Az oldal ikonja a `/ZynAI_favicon.png`, ahogy a `layout.tsx` és a `manifest.ts` beállítja.
Fájlok: `app/favicon.ico.png` (törölve)
Ellenőrzés: tsc ✓ · lint ✓ · build ✓
Ati dönt / Ati ellenőrzi: a böngészőfülön az ikon továbbra is megjelenik-e.

## J7 — A CDN-ikonok helyi kiszolgálása
Állapot: kész
Commit: bb5c158
Mit és miért: A főoldali integráció-sáv ikonjait eddig a jsDelivr szolgálta ki verzió nélkül (`simple-icons@latest`), így a látogató IP-címe hozzájárulás nélkül egy külső szolgáltatóhoz került. Most a 24 ikon a saját szerverünkről jön, a rögzített simple-icons 16.34.0 verzióból (licenc: CC0 1.0, a csomag `LICENSE.md`-je szerint). Az OpenAI és a Slack ikon nincs meg ebben a verzióban, ezért azok chipje Ati döntése alapján (A változat) csak a névvel jelenik meg.
Fájlok: `components/sections/IntegrationStack.tsx`, `public/icons/integrations/*.svg` (24 új fájl)
Ellenőrzés: tsc ✓ · lint ✓ (figyelmeztetés nélkül) · build ✓ · a forrásban nincs `jsdelivr` · `npm start`: a főoldal HTML-jében az ikonok `/_next/image?url=/icons/integrations/…` címen jönnek, ez `200 image/svg+xml`.
Ati dönt / Ati ellenőrzi: a főoldalon az ikonok ugyanúgy jelennek-e meg (fehérre invertálva), és az OpenAI/Slack chip ikon nélkül is rendben néz-e ki. A `next.config.ts` `cdn.simpleicons.org` engedélye már nem kell semmihez; nem módosítottam (hatókörön kívül).

## J12 — A hiányzó beállítás ne szivárogjon a kliensnek
Állapot: kész
Commit: lásd az összesítő táblázatot és a `git log`-ot (a hash a saját commitjában nem szerepelhet)
Mit és miért: Ha a szerveren hiányzik egy e-mail-beállítás, a látogató eddig a hiányzó változó nevét is látta a hibaüzenetben. Most a már meglévő általános hibaszöveget kapja (`Az e-mail küldése sikertelen volt.`, 500-as státusszal, mint egy sima küldési hibánál). A változónevek csak a szerver naplójába kerülnek.
Fájlok: `app/api/contact/route.ts`, `app/api/pilot/route.ts`
Ellenőrzés: tsc ✓ · lint ✓ · build ✓ · üres POST mindkét route-ra → `{"error":"Az e-mail küldése sikertelen volt."}`, HTTP 500; a szerver naplójában a változónevek megvannak (`[contact]`/`[pilot] Hiányzó környezeti változó: …`). A válasz-objektumokban nincs változónév.
Ati dönt / Ati ellenőrzi: nincs. Megjegyzés: ha a Resend maga ad hibát, az ő `error.message`-e továbbra is a kliensnek megy (a J9 előtti viselkedés, a szelet hatókörén kívül); érdemes később átnézni, hogy ez nem túl bőbeszédű-e.

---

## Kézi teendők (Ati)

1. **J9 környezeti változók** a `.env.local`-ba és a szerver környezetébe (`03` K2): `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` (cím, megjelenítendő név nélkül), `N8N_CONTACT_WEBHOOK_URL`, `N8N_PILOT_WEBHOOK_URL`. A `RESEND_API_KEY` már megvan. Amíg ez nincs meg, az űrlapok 500-at adnak.
2. **J1:** a szerveren a Docker-build menjen át a `node:24-alpine` képpel (helyben nem tudtam ellenőrizni). Az `@types/node` még `^20`; később érdemes `^24`-re emelni (nem módosítottam).
3. **J4:** `/ai-tartalmak?kategoria=…` szűrése, és a címek sor-animációja.
4. **J7:** főoldal, integráció-sáv: az ikonok megjelennek-e, az OpenAI/Slack chip rendben néz-e ki ikon nélkül.
5. **J10:** a `/kapcsolatfelvetel` e-mail lépése érvénytelen címre hibát ad-e.
6. **J6:** a böngészőfül ikonja megvan-e.
7. A `Resend` hibaüzenet kliensnek adása (J12 megjegyzés): döntsd el, kell-e szigorítani.

## git log --oneline -15

```
425f3f2 Hide missing config names from API responses
bb5c158 Track .env.example in git
2edce5b Self-host integration icons
3be145d Remove unused favicon file
588e158 Remove placeholder blog route
614a0e7 Add change log, replacing step 1 result file
0572c6f Update audit runbooks
1b0c18a Add step 1 results summary
d432abf Validate email format on contact form
e79ceb5 Move mail and webhook settings to environment variables
c31d5ee Add booking and privacy pages to sitemap
89b47b3 Fix set-state-in-effect lint errors
89a7132 Use Node runtime for root OG image
54c84c3 Hide X-Powered-By and add security headers
24f1483 Upgrade Node to 24 in Docker and engines
```

---

# 2. lépés — GTM, Consent Mode v2, sütibanner, konverziók

> Munkafájl: `02-meres-bekotes.md`. GTM-tároló: `GTM-KBHN7GX6` (Ati adta meg).
> Az azonosító **nem** kerül a kódba: a `NEXT_PUBLIC_GTM_ID` build-változóból
> jön, élesben Docker build-argumentumként.

| Szelet | Állapot | Commit |
|---|---|---|
| M1 — Analitikai könyvtár | kész | `5e1ea2d` |
| M2 — GTM és consent default | kész | `4a1d68a` |
| M3 — Sütibanner | kész | `a4785b7` |
| M4 — E-mail-kattintás | kész | `e4a5d52` |
| M5 — Űrlapkonverziók | kész | `79c6502` |
| M6 — Cal.com kattintásra | kész | `b5b292f` |
| M7 — Önellenőrzés | kész | ez a napló-commit (`Document analytics self-check in change log`) |

## M1 — Az analitikai könyvtár
Állapot: kész
Commit: 5e1ea2d
Mit és miért: Létrejött a mérés közös alapja. Az `events.ts` rögzíti az öt eseménynevet (D1) és a megengedett paramétereket, a `track.ts` az egyetlen hely, ami a `dataLayer`-be ír, a `consent.ts` pedig a sütidöntés tárolását, a Consent Mode `update` küldését és a fejléc inline alapszkriptjét adja. Az oldal viselkedése még nem változott, mert semmi nem használja.
Fájlok: `lib/analytics/events.ts`, `lib/analytics/track.ts`, `lib/analytics/consent.ts` (mind új)
Ellenőrzés: tsc ✓ · lint ✓ · build ✓
Ati dönt / Ati ellenőrzi: nincs. Megjegyzés: a `saveConsent` a localStorage-hiba esetén `console.warn`-t ír (a hiba nevével), mert üres `catch` nem lehet; a `readConsent` `catch`-e `null`-t ad vissza, ahogy a munkafájl előírja. Az ellenőrzés közben a futó `npm run dev` által generált `.next/dev/types` eltörte a buildet (lásd Kézi teendők); Ati leállította a dev szervert, a generált mappát töröltem.

## M2 — GTM és consent default a gyökér layoutban, Docker build-arg
Állapot: kész
Commit: 4a1d68a
Mit és miért: A gyökér layout `<head>`-jébe került a Consent Mode v2 alapállapot (minden tiltva, nyers inline `<script>`), a `<body>` elejére a GTM `noscript` iframe-je, a végére pedig a GTM hivatalos snippetje `next/script`-tel, `afterInteractive` módban. Így a GTM mindig a hozzájárulás-alapállapot után indul. Mindhárom csak akkor jelenik meg, ha a build idején a `NEXT_PUBLIC_GTM_ID` be van állítva; a Dockerfile ezt build-argumentumként fogadja.
Diagnózis: előtte a layoutban nem volt `<head>` elem, a `<body>` csak a `{children}`-t renderelte; a Dockerfile builder szakasza: `WORKDIR` → `COPY node_modules` → `COPY . .` → `RUN npm run build`. Az `ARG`/`ENV` a `COPY . .` és a `RUN npm run build` közé került.
Fájlok: `app/layout.tsx`, `Dockerfile`, `.env.example`
Ellenőrzés: tsc ✓ · lint ✓ · build ✓
- Env nélküli build, `npm start`: a főoldal HTML-jében `googletagmanager` = 0 találat, `'consent'` = 0 találat.
- `NEXT_PUBLIC_GTM_ID=GTM-KBHN7GX6` build (csak a parancssorban): `<head>` 197–5053. bájt; `consent', 'default` a **4487.** bájtnál; `googletagmanager.com/gtm.js` a **155556.** bájtnál → a consent default előbb van. A `noscript` iframe (`ns.html`) a 5199. bájtnál, a `<body>` elején. Utána újraépítve env nélkül.
- Docker-build: **nem ellenőrzött** (a Docker-démon nem fut).
Ati dönt / Ati ellenőrzi: az éles buildnél a build-argumentum: `docker build --build-arg NEXT_PUBLIC_GTM_ID=GTM-KBHN7GX6 …` (vagy a szerver build-felületén ugyanez). A Google telepítési útmutatója a GTM-et a `<head>` tetejére tenné; ez szándékosan nem így van, mert a consent alapállapotnak a GTM előtt kell futnia.

## M3 — Sütibanner és süti-beállítások link
Állapot: kész
Commit: a4785b7
Mit és miért: Az oldal alján sütibanner jelenik meg, amíg a látogató nem döntött. Az „Elfogadom” és a „Csak a szükségeseket” gomb egyenrangú; mindkettő elmenti a döntést és Consent Mode `update`-et küld. A lábléc új „Süti-beállítások” linkje bármikor visszahozza a bannert. Mindkettő csak akkor jelenik meg, ha a build GTM-azonosítóval készült.
Diagnózis:
- Hangnem (D5): az oldal tegező (`Kérlek` 14×, `neked` 6×, `vállalkozásod` 5×, `Foglalj` 5×); a „magázó” találatok harmadik személyűek (pl. „nem tudja”, a Claude „olvassa el”), tehát a **tegező** szöveg került be, szó szerint a `02`-ből.
- Rétegzés: a fejléc legfelső rétege `z-[80]`, a `MatrixBackground` `zIndex: 0`; a banner `z-[90]`, `position: fixed`, alul. A gyökér layoutban él, a marketing layout `SmoothScroll` burkolóján kívül. A `SmoothScroll` ma már natív görgetés (Lenis nincs bekötve), így nem nyelhet el kattintást.
- A lábléc (`Footer.tsx`) a kliensoldali marketing layoutból töltődik, a link mégis külön kis kliens komponens (`ConsentSettingsLink.tsx`), ahogy a munkafájl kéri.
Megvalósítás: a tárolt döntést `useSyncExternalStore` olvassa (szerveren „nincs adat”, így a banner nem kerül a szerver-HTML-be, és nincs hidratálási eltérés); a visszanyitás a `zynai:consent-open` eseményre történik. Stílus: a meglévő `buttonVariants` (`secondary`) és design tokenek, `min-h-11` (44 px), látható fókuszkeret; az animáció `fade-in` + `slide-in-from-bottom` (csak `opacity` és `transform`).
Fájlok: `components/consent/ConsentBanner.tsx` (új), `components/consent/ConsentSettingsLink.tsx` (új), `app/layout.tsx`, `components/layout/Footer.tsx`
Ellenőrzés: tsc ✓ · lint ✓ · build ✓ · env nélküli build: a HTML-ben se `Süti-beállítások`, se banner · `GTM-KBHN7GX6` build: a lábléc linkje a HTML-ben, a banner kódja a kliens chunkban. Utána újraépítve env nélkül.
Ati dönt / Ati ellenőrzi: böngészőben (éles vagy GTM-es helyi build): a banner megjelenik; döntés után eltűnik; újratöltésre nem jön vissza; a lábléc „Süti-beállítások” linkje visszahozza. Konzolban: `dataLayer.filter(e => e[0] === 'consent')` → egy `default`, döntés után egy `update` a megfelelő értékekkel. **Figyelem:** Advanced módban (D2) a GA4 a döntés előtt is küld süti nélküli jelzéseket, ezért egy helyi próba a valódi tárolóval localhostos találatot ad a GA4-ben; ezt a GA4-ben szűrd, vagy élesben ellenőrizd. A banner mobilon, keskeny kijelzőn hogyan fér el — nézd meg.

## M4 — Telefon- és e-mail-kattintás
Állapot: kész
Commit: e4a5d52
Mit és miért: Az oldal három látható e-mail-linkje kattintáskor `email_click` eseményt küld (a címet nem). A link ugyanúgy megnyitja a levelezőt.
Diagnózis (`grep -rn "tel:\|mailto:" app components`):
- `app/(marketing)/idopontfoglalas/page.tsx:53` — szerver komponens (oldal), `mailto:info@zynai.hu`
- `components/CalEmbed.tsx:165` — kliens komponens, a hibaállapot `mailto:` linkje
- `components/layout/Footer.tsx:167` — a lábléc `mailto:` linkje
- `tel:` link **nincs** az oldalon, ezért a `PhoneLink.tsx` nem készült el (használat nélküli komponens lenne). Ha később telefonszám kerül ki, akkor kell.
- Nem link, nem módosítva: `adatvedelem/page.tsx` (az e-mail-cím sima szöveg), a főoldal JSON-LD-je (`page.tsx:100`).
Fájlok: `components/ui/MailtoLink.tsx` (új), `app/(marketing)/idopontfoglalas/page.tsx`, `components/CalEmbed.tsx`, `components/layout/Footer.tsx`
Ellenőrzés: tsc ✓ · lint ✓ · build ✓ · a forrásban `mailto:` már csak a `MailtoLink.tsx`-ben szerepel.
Ati dönt / Ati ellenőrzi: élesben a GA4 DebugView-ban egy e-mail-linkre kattintva megjelenik-e az `email_click` (elfogadott sütikkel).

## M5 — Űrlapkonverziók
Állapot: kész
Commit: 79c6502
Mit és miért: A kapcsolatfelvételi űrlap sikeres beküldése után `generate_lead` (`lead_type: contact_form`), a pilot-jelentkezés után `pilot_application` esemény megy a `dataLayer`-be. Csak akkor, ha a szerver sikert jelzett; hibánál, hálózati hibánál és kliensoldali validációs hibánál nincs esemény.
Diagnózis:
- `kapcsolatfelvetel/page.tsx`: az `ok`-ság vizsgálata a `!res.ok` (334. sor) és a `!data.success` (338. sor) ágban, a sikerállapot a `setStatus("success")` (341. sor). Az esemény közvetlenül e sor előtt.
- `PilotApplicationForm.tsx`: `!res.ok || !data.success` (75. sor), sikerállapot a 79. sorban. Az esemény közvetlenül előtte.
- Honeypot: a route csendes `{ success: true }` 200-at ad, és a kliens ezt **sikernek veszi** (eseményt is küldene). Nem javítottam: a botok jellemzően nem futtatnak JS-t, így ez nem torzít.
- Dupla beküldés: eddig csak a `status === "loading"` védett, ami egy gyors dupla kattintásnál vagy Enter-nyomásnál (újrarenderelés előtt) átengedhetett egy második kérést. Mindkét űrlap kapott egy `useRef` zárat: egy beküldés = egy kérés és egy esemény. Hiba esetén a zár feloldódik, így újra lehet próbálni.
Fájlok: `app/(marketing)/kapcsolatfelvetel/page.tsx`, `app/(marketing)/vibecoding-pilot/PilotApplicationForm.tsx`
Ellenőrzés: tsc ✓ · lint ✓ · build ✓
Ati dönt / Ati ellenőrzi: élesben, elfogadott sütikkel, a GA4 DebugView-ban egy próbabeküldés után pontosan egy `generate_lead`, illetve `pilot_application` jelenik-e meg. (A J9 környezeti változói nélkül az űrlap 500-at ad, és ilyenkor helyesen nincs esemény.)

## M6 — Cal.com: kattintásra betöltés és foglalási konverzió (D4)
Állapot: kész
Commit: b5b292f
Mit és miért: A Cal.com naptár már nem töltődik be magától: a helyén egy, a naptár magasságát előre lefoglaló doboz áll a „Naptár megnyitása” gombbal, egy magyarázó sorral és egy közvetlen Cal.com-linkkel. Így a látogató böngészője csak akkor kér bármit a cal.com-tól, ha ő maga megnyitja. Sikeres (éles) foglalás után `booking_complete` esemény megy a `dataLayer`-be, foglalásonként egyszer, személyes adat nélkül.
Diagnózis:
- `@calcom/embed-react` 1.5.3; `getCalApi(options?: { embedJsUrl?, namespace? })`; a komponens a `felmeres` namespace-t használja, a `getCalApi({ namespace })` a namespace-es API-t adja vissza, így a figyelő azon fut.
- A telepített típusokban megvan a `bookingSuccessfulV2` (payload: `uid`, `title`, `startTime`, …), a `bookingSuccessful` `@deprecated`. A `dryRunBookingSuccessfulV2` a típusokban még nincs, de a csomag az `embed.js`-t futásidőben az `app.cal.com`-ról tölti, és a Cal.com hivatalos „Embed Events” oldala (2026-10-08-án lekérve) szerint a teszt módú foglalás külön esemény (`dryRunBookingSuccessfulV2`). Eltérés tehát nincs: csak a `bookingSuccessfulV2`-t figyeljük.
- Az `embed.js` beszúrása a csomagban csak a `getCalApi()` hívásakor, illetve a `<Cal>` mountolásakor történik; mindkettő a gombnyomás után fut.
Megvalósítás: a korábbi betöltő logika (időtúllépés, `linkReady`/`linkFailed`, hibaállapot) változatlanul a belső `CalInline` komponensben van; a külső `CalEmbed` csak a megnyitás állapotát kezeli, ezért a két felhasználási helyen (`/idopontfoglalas`, a kapcsolatfelvétel sikerképernyője) nem kellett a propokon változtatni. A foglalás-uid-ek egy modul szintű `Set`-ben vannak; ha a Cal.com nem küldene `uid`-t, az esemény ettől még elmegy (nincs mi alapján szűrni).
Szövegek (tegező, M3 szerint, szó szerint a `02`-ből): „Naptár megnyitása”, „A foglalási naptárat a Cal.com biztosítja. Megnyitáskor a Cal.com oldala töltődik be.”, „Vagy foglalj közvetlenül a Cal.com oldalán”.
Fájlok: `components/CalEmbed.tsx`
Ellenőrzés: tsc ✓ · lint ✓ · build ✓ · `npm start`, `/idopontfoglalas` HTML: `embed/embed.js` = 0, Cal.com iframe = 0, a gomb és a link megvan.
Ati dönt / Ati ellenőrzi: böngészőben a hálózati fülön a gombnyomás előtt nincs `cal.com` kérés, utána a naptár betölt. Élesben valódi tesztfoglalás → egy `booking_complete` a GA4 DebugView-ban, utána a foglalás lemondása. A kapcsolatfelvételi sikerképernyőn a naptár mostantól szintén gombnyomásra nyílik.

## M7 — Önellenőrzés
Állapot: kész (csak diagnózis, kódváltozás nincs)
Commit: `Document analytics self-check in change log` (a saját hash-ét nem tartalmazhatja; lásd `git log`)
Mit és miért: A mérés bekötésének tíz kritikus pontját ellenőriztem a kódban és a buildelt HTML-ben.
Fájlok: `docs/ellenorzes/valtozasnaplo.md`

1. **Consent default inline `<script>` a `<head>`-ben, a GTM előtt?** Igen. `app/layout.tsx:102–109`: a `<head>`-ben egyetlen nyers `<script dangerouslySetInnerHTML={{ __html: consentDefaultScript() }}>`; a GTM `next/script` `afterInteractive` (`:124`). Buildelt HTML-ben (`GTM-KBHN7GX6`): `consent', 'default` a 4487. bájtnál a `<head>`-en (197–5053) belül, `googletagmanager.com/gtm.js` a 155556. bájtnál.
2. **Mind a négy paraméter `denied` a defaultban?** Igen: `lib/analytics/consent.ts`, `consentDefaultScript()`: `ad_storage`, `analytics_storage`, `ad_user_data`, `ad_personalization` = `'denied'`, `wait_for_update: 500`.
3. **Elfogadás és elutasítás is küld `update`-et?** Igen: `saveConsent(choice)` mindkét ágon `window.gtag?.('consent', 'update', {…: choice})`; a banner mindkét gombja ezt hívja (`ConsentBanner.tsx`, `choose`).
4. **A tárolt döntés minden betöltéskor újra érvényesül az inline szkriptben?** Igen: az inline szkript `localStorage.getItem("zynai_consent_v1")`, és `'granted'` esetén `update` granted-re, még a GTM előtt. `'denied'`-nél a default marad (minden tiltva). A `gtag` az `arguments`-et teszi a `dataLayer`-be.
5. **`grep -rn "G-[A-Z0-9]\{6,\}\|AW-[0-9]\|gtag/js\|googleadservices" app components lib` → üres?** Igen, üres. Google-azonosító a kódban nincs; a GTM-ID is csak a `NEXT_PUBLIC_GTM_ID` változóból jön.
6. **Van kódból küldött `page_view`?** Nincs (`grep page_view` üres).
7. **Eseménynevek a D1 szerint? `form_submit`/`form_start`?** A `track()` hívások: `generate_lead` (`kapcsolatfelvetel/page.tsx:345`), `pilot_application` (`PilotApplicationForm.tsx:83`), `booking_complete` (`CalEmbed.tsx:140`), `email_click` (`MailtoLink.tsx:19`). A `phone_click` a szerződésben van, de nincs `tel:` link, így nem hívódik. `form_submit`/`form_start` csak az `events.ts` tiltó kommentjében szerepel.
8. **Minden konverzió csak siker után szól?** Igen: a két űrlapnál a `!res.ok` és a `!data.success` ág után, közvetlenül a `setStatus("success")` előtt; hibánál nincs esemény, és a `useRef` zár miatt egy beküldés egy esemény. A foglalás csak a `bookingSuccessfulV2` után (a teszt foglalás külön esemény, nem figyeljük), uid szerint egyszer. Az `email_click` kattintási esemény, nem konverzió.
9. **Kerül személyes adat a `track()`-be vagy a `dataLayer`-be?** Nem. A paraméterek: `{ lead_type: "contact_form" }` (konstans), a többi `{}`; a típus (`TrackEventParams`) mást nem enged. A Cal.com payloadból csak az `uid` kerül egy memóriabeli `Set`-be, az eseménybe semmi. A `MailtoLink` a címet nem küldi. A `dataLayer`-be máshol nem írunk (`grep dataLayer` csak a hivatalos GTM-snippetben).
10. **`NEXT_PUBLIC_GTM_ID` nélkül a buildelt HTML-ben nincs mérés?** Igen: env nélküli build után a főoldal HTML-jében `googletagmanager` = 0, `'consent'` = 0, `Süti-beállítások` = 0, banner = 0. A munkakönyvtárban most is env nélküli build van.

---

## Kézi teendők (Ati) — 2. lépés

A kód ezeket feltételezi (`03-kezi-beallitasok.md`):

1. **K2 — build-argumentum:** az éles Docker-build `--build-arg NEXT_PUBLIC_GTM_ID=GTM-KBHN7GX6`-tal fusson; enélkül élesben nincs se mérés, se banner. Csak új build után hat. Helyben a `.env.local`-ban maradjon üresen.
2. **K4 — GTM (`GTM-KBHN7GX6`):** consent overview bekapcsolva; Google tag (GA4 mérési azonosító) **Initialization – All Pages** triggerrel, további kötelező hozzájárulás nélkül; öt Custom Event trigger pontos egyezéssel (`generate_lead`, `pilot_application`, `booking_complete`, `phone_click`, `email_click`); öt GA4 Event tag, a `generate_lead`-nél `lead_type` paraméterrel (Data Layer Variable); History Change page_view trigger nincs; közzététel. A GA4 mérési azonosítót **csak a GTM-be** kell beírni, a kódba nem.
3. **K5 — GA4:** enhanced measurement: history-alapú oldalváltás be, űrlapinterakciók ki; kulcsesemények: `generate_lead`, `pilot_application`, `booking_complete`; adatmegőrzés 14 hónap; belső forgalom szűrése (a helyi és saját tesztek miatt).
4. **K7 — `/adatvedelem`:** a tényleges működés (GA4/GTM hozzájárulás után sütikkel, előtte süti nélküli jelzésekkel; Cal.com; n8n; Resend; pilot űrlap; „Süti-beállítások” link). Jogi szöveg, te hagyod jóvá.
5. **K8 — Cal.com sütik:** élesben, inkognitóban a naptár megnyitása után nézd meg a `cal.com` sütijeit; ha mérő/hirdetési is van, szólj, és a betöltést a hozzájáruláshoz kötjük.
6. **Böngészős ellenőrzések** (M3, M5, M6 „Ati ellenőrzi”): banner és lábléc link működése, `dataLayer` consent default/update, GA4 DebugView-ban `generate_lead`, `pilot_application`, `booking_complete`, `email_click`, a Cal.com csak gombnyomásra tölt. Helyi próbánál a valódi tárolóval (Advanced mód) localhostos találatok kerülhetnek a GA4-be.
7. **Fejlesztői figyelmeztetés:** a `npm run dev` (webpack) által generált `.next/dev/types` szigorúbb típusellenőrzést ad, és az `app/(marketing)/ai-tartalmak/[slug]/page.tsx` `generateMetadata` paramétertípusa (`Promise<…> | { slug: string }`) miatt dev futás után a `npm run build` elbukik, amíg a `.next/dev` mappa ott van. Megoldás: dev szerver leállítása és `.next/dev` törlése, vagy a típus javítása (külön, a `02` hatókörén kívül).

## git log --oneline -15 (2. lépés, a záró commit előtt)

```
b5b292f Load Cal.com embed on click and track completed bookings
79c6502 Fire lead events after confirmed form submissions
e4a5d52 Track phone and email link clicks
a4785b7 Add cookie consent banner and settings link
4a1d68a Load GTM after Consent Mode v2 default in root layout
5e1ea2d Add analytics event contract, track helper and consent helpers
b5c0780 Finalize step 1 change log
425f3f2 Hide missing config names from API responses
bb5c158 Track .env.example in git
2edce5b Self-host integration icons
3be145d Remove unused favicon file
588e158 Remove placeholder blog route
614a0e7 Add change log, replacing step 1 result file
0572c6f Update audit runbooks
1b0c18a Add step 1 results summary
```

---

## Search Console igazoló fájl
Állapot: kész
Mit és miért: A Search Console HTML-fájlos tulajdonigazolásához a `google7ff5886834f0ffb9.html` a `public/` mappába került, a Google által adott tartalommal, így az oldal gyökerén (`/google7ff5886834f0ffb9.html`) elérhető. Ez teszi lehetővé, hogy a Search Console-ban igazolni lehessen a `zynai.hu` tulajdonosát és beküldeni a sitemapet.
Fájlok: `public/google7ff5886834f0ffb9.html`
Ellenőrzés: tsc ✓ · lint ✓ · build ✓ · `npm start`: `HTTP 200`, a tartalom megegyezik a Google fájljával.
Ati dönt / Ati ellenőrzi: élesítés (push + build) után a Search Console-ban az „Igazolás” gomb. A fájlt ne töröld, a Google időnként újraellenőrzi. Utána a sitemap beküldése: `https://zynai.hu/sitemap.xml`.
A GA4 mérési azonosítója (`G-W3HP0TW3GC`, adatfolyam: zynai.hu) szándékosan **nem** került a kódba: a GTM-ben (`GTM-KBHN7GX6`) kell Google tag-ként beállítani, Initialization – All Pages triggerrel.

## Docker-kép: a képgyorsítótár írási joga
Állapot: kész (Docker-build helyben nem ellenőrzött)
Mit és miért: Élesben a naplót elárasztotta az `EACCES: permission denied, mkdir '/app/.next/cache'` hiba: a konténer a `nextjs` felhasználóval fut, a `.next` mappát viszont a root hozta létre, így a Next.js nem tudta menteni a feldolgozott képeket, és minden kérésnél újra feldolgozta őket. A Dockerfile most létrehozza a `.next` mappát a `nextjs` felhasználó tulajdonában, és a standalone szervert és a statikus fájlokat is az ő tulajdonában másolja be (a Next.js hivatalos Docker-példájának mintájára).
Fájlok: `Dockerfile`
Ellenőrzés: tsc ✓ · lint ✓ · build ✓ · Docker-build: **nem ellenőrzött** (a Docker-démon helyben nem fut)
Ati dönt / Ati ellenőrzi: push és új build után a Coolify **Logs** fülén ne jelenjen meg több `EACCES … /app/.next/cache` sor (nyiss meg néhány képes oldalt, például az `/ai-tartalmak`-ot). Mivel a Dockerfile változik, a build nem maradhat ki.

## Cégadatok: ZynAI Development Kft.
Állapot: kész
Mit és miért: A Kft. bejegyzése (Budapest Környéki Törvényszék Cégbírósága, Cg.13-09-249560/5, 2026. 10. 07.) után minden céges megjelenés az új cégadatokat mutatja. A cégadatok egy helyen, a `lib/company.ts`-ben vannak, a lábléc, az adatkezelési tájékoztató és a strukturált adat innen olvas. A régi egyéni vállalkozói adatok (nyilvántartási szám, adószám) kikerültek. A végzés személyes adatai (anyja neve, születési idő, adóazonosító jel) és a statisztikai számjel, EUID, jegyzett tőke nem kerültek az oldalra.
- Adatkezelési tájékoztató, 1. szakasz: név (teljes és rövidített), székhely, cégjegyzékszám a cégbírósággal, adószám, közösségi adószám, „Képviseli: Bakos Attila ügyvezető” (Ati döntése). A metaleírásban „(ZynAI Development Kft.)”. A „Hatályos” dátum mindkét helyen 2026. október 8. (Ati döntése).
- Lábléc: `© 2026 ZynAI Development Kft. · Minden jog fenntartva`, alatta `Székhely: 2119 Pécel, Maglódi út 66. · Cg. 13-09-249560 · Adószám: 33137254-2-13`.
- Strukturált adat: a főoldal `ProfessionalService` kapott `legalName`, `vatID`, `taxID` és `address` mezőt; a cikkek kiadója (`publisher`) `legalName`-et.
- Nem változott: a „Bakos Attila” név a személyes megjelenéseknél (hero, Rólam, cikkszerzőség, OG-kép, metaadatok szerzője), mert ezek a személyre vonatkoznak.
Fájlok: `lib/company.ts` (új), `app/(marketing)/adatvedelem/page.tsx`, `components/layout/Footer.tsx`, `app/(marketing)/page.tsx`, `lib/article-seo.ts`
Ellenőrzés: tsc ✓ · lint ✓ · build ✓ · `npm start`: az `/adatvedelem` és a lábléc az új adatokat mutatja, a főoldal JSON-LD-jében `legalName`, `vatID`, `taxID` megvan; a régi `e.v.`, `59341763`, `90189021` sehol.
Ati dönt / Ati ellenőrzi: az adatkezelési tájékoztató többi része (K7: Google Analytics és Tag Manager „tervezett” helyett a tényleges működés, Cal.com, pilot-űrlap, „Süti-beállítások” link) még a régi; a dátum már a mai, ezért a K7 szövegét is érdemes mielőbb frissíteni. A számlázási és egyéb céges felületeken (Google, Cal.com, Resend, LinkedIn) a cégadatok frissítése külön teendő.

## Lábléc: a székhelyes apróbetűs sor kivéve
Állapot: kész
Mit és miért: Ati kérésére a lábléc második (székhely · cégjegyzékszám · adószám) sora kikerült; a láblécben csak a `© 2026 ZynAI Development Kft. · Minden jog fenntartva` marad. A teljes cégadat az adatkezelési tájékoztatóban és a strukturált adatban továbbra is megvan.
Fájlok: `components/layout/Footer.tsx`
Ellenőrzés: tsc ✓ · lint ✓ · build ✓
Ati dönt / Ati ellenőrzi: nincs

## A cikkoldal `generateMetadata` típusa
Állapot: kész
Mit és miért: Az `/ai-tartalmak/[slug]` oldal `generateMetadata` függvénye a `params`-ot `Promise | objektum` uniónak deklarálta. A `next dev --webpack` által generált szigorúbb típusellenőrzés (`.next/dev/types`) ezt elutasította, ezért egy dev futás után a `npm run build` elbukott, amíg a `.next/dev` mappa ott volt. Most a függvény ugyanazt a típust használja, mint maga az oldal (`params: Promise<{ slug }>`).
Fájlok: `app/(marketing)/ai-tartalmak/[slug]/page.tsx`
Ellenőrzés: tsc ✓ · lint ✓ · build ✓ · egy rövid `next dev --webpack` futás után, a generált `.next/dev/types`-szal együtt is tsc ✓; utána a `.next/dev` mappa törölve.
Ati dönt / Ati ellenőrzi: nincs

## Az API-hibák ne szivárogjanak a böngészőbe
Állapot: kész
Mit és miért: Ha a Resend elutasította a küldést, a hibaüzenete (ami e-mail-címet is tartalmazhat) változatlanul a látogatóhoz került; ugyanígy a route-ok váratlan hibáinak nyers üzenete. Most a látogató a meglévő általános szöveget kapja („Az e-mail küldése sikertelen volt.”, illetve „Váratlan szerverhiba történt.”), 500-as státusszal. A szerver naplójába a Resend hibakódja és HTTP-státusza, illetve a váratlan hiba neve kerül, személyes adat nélkül.
Fájlok: `app/api/contact/route.ts`, `app/api/pilot/route.ts`
Ellenőrzés: tsc ✓ · lint ✓ · build ✓ · a route-okban a kliensnek adott válaszban már nincs `message`.
Ati dönt / Ati ellenőrzi: nincs. Ha élesben egy beküldés hibát ad, a Coolify Logs-ban a `[contact] Resend hiba: …` sor mutatja az okot.

## Adatkezelési tájékoztató (K7) a tényleges működés szerint
Állapot: kész, **jogi átnézésre vár**
Mit és miért: A tájékoztató 3–5. szakasza most azt írja le, ami az oldalon ténylegesen történik. Korábban a Google Analytics „tervezett”-ként szerepelt, a kapcsolatfelvételi űrlap mezőlistája nem egyezett a valódival, hiányzott a pilot-jelentkezés, a Cal.com, a Cloudflare és a tárhelyszolgáltató, és azt állította, hogy harmadik fél felhőszolgáltatójához nem kerül adat.
- 3.1 Kapcsolatfelvételi űrlap: a valódi mezők (név, e-mail, cégnév és weboldal, létszám, időrabló folyamatok és saját megjegyzés, AI-szakasz, időpont). Cél, jogalap, megőrzés (5 év) változatlan.
- 3.2 VibeCoding pilot jelentkezés (új): név, e-mail, telefonszám, indoklás. Jogalap: b) és a) pont; megőrzés: 5 év, **a kapcsolatfelvétellel azonosra vettem, Ati nem adott meg külön időt**.
- 3.3 Időpontfoglalás (új): Cal.com, kattintásra töltődik, a Cal.com saját tájékoztatójának linkje.
- 3.4 Sütik és mérés: a sütidöntés helyi tárolása; Google Analytics (`_ga`, `_ga_*`); Google Ads és remarketing (Ati szerint használni fogja); a Consent Mode süti nélküli jelzéseinek leírása; GA-adatmegőrzés 14 hónap; a „Süti-beállítások” link.
- 4 Adattárolás: Hetzner Online GmbH, Helsinki (Finnország, EU); az űrlapadatokat az oldal nem tárolja adatbázisban, e-mailben továbbítja.
- 5 Adatfeldolgozók: Hetzner, Cloudflare, Resend, Google (Gmail, és hozzájárulás esetén Analytics, Tag Manager, Ads), Cal.com; EU-n kívüli továbbítás DPF vagy általános szerződési feltételek alapján.
- A 1., 2., 6., 7. és 8. szakasz változatlan (a cégadatokat és a dátumot az előző bejegyzés már frissítette).
Fájlok: `app/(marketing)/adatvedelem/page.tsx`
Ellenőrzés: tsc ✓ · lint ✓ · build ✓ · a buildelt `/adatvedelem` HTML-ben megvannak az új szakaszok; a „tervezett”, az „Üzenet szövege” és a „harmadik fél felhőszolgáltatójának” kifejezés sehol.
Ati dönt / Ati ellenőrzi: **a szöveget jogász vagy adatvédelmi szakember nézze át** élesítés előtt vagy mielőbb utána. Különösen: (1) a pilot és a foglalás megőrzési ideje; (2) a jogalapok; (3) hogy a Resend, a Cloudflare és a Cal.com az EU–USA keretrendszer tagja-e, vagy általános szerződési feltételekkel dolgozik (a szöveg mindkettőt lefedi, de a konkrétumot érdemes ellenőrizni); (4) a Google Ads-sütik pontos listája a kampány indulásakor; (5) a Google Analytics adatmegőrzése a GA4-ben valóban 14 hónapra legyen állítva (K5).
