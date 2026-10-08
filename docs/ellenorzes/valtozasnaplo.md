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
