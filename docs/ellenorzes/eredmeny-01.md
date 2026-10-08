# 1. lépés — Technikai javítások: eredmény

> Munkafájl: `01-javitasok.md`. Indulás: 2026-10-08, `git status` tiszta,
> helyi `node -v` = `v24.14.1`.
> Kiinduló állapot: tsc ✓, lint 3 ismert hiba + 1 `no-img-element`
> figyelmeztetés, build ✓.
>
> A commit nem tartalmazhatja a saját hash-ét, ezért minden szelet hash-e a
> következő szelet commitjában kerül be, az utolsóé a záró commitban.

## J1 — Node 24
Állapot: kész
Commit: 24f1483
Fájlok: `Dockerfile`, `package.json`, `.nvmrc` (új)
Ellenőrzés: tsc ✓ · lint ✓ (a 3 ismert hiba + 1 figyelmeztetés, új nincs) · build ✓ · Docker-build: **nem ellenőrzött** (a Docker-démon nem fut)
Nézd meg: a szerveren a következő Docker-build a `node:24-alpine` képpel menjen át.
Bizonytalan: a `devDependencies`-ben a `@types/node` még `^20`. A szelet hatókörén kívül esik, nem nyúltam hozzá; érdemes később `^24`-re emelni.

## J2 — X-Powered-By és biztonsági fejlécek
Állapot: kész
Commit: 54c84c3
Fájlok: `next.config.ts`
Ellenőrzés: tsc ✓ · lint ✓ (a 3 ismert hiba + 1 figyelmeztetés, új nincs) · build ✓ · `npm start` + `curl -sI` ✓
Nézd meg: nincs
Bizonytalan: a `d627a17` commit üzenete szerint az X-Powered-By már el volt rejtve, de a commit nem tartalmazta a változást; most került be. A Next.js figyelmeztet, hogy `output: "standalone"` mellett a `next start` nem javasolt; a helyi ellenőrzéshez ez nem számít.

`curl -sI http://localhost:3000` kimenete:

```
HTTP/1.1 200 OK
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
X-Frame-Options: SAMEORIGIN
Permissions-Policy: camera=(), microphone=(), geolocation=()
Strict-Transport-Security: max-age=31536000
Vary: rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch, Accept-Encoding
x-nextjs-cache: HIT
x-nextjs-prerender: 1
x-nextjs-prerender: 1
x-nextjs-stale-time: 300
Cache-Control: s-maxage=31536000
ETag: "7fqemrfgdh46nz"
Content-Type: text/html; charset=utf-8
Content-Length: 196711
Date: Thu, 08 Oct 2026 12:51:09 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

## J3 — Edge runtime eltávolítása
Állapot: kész
Commit: 89a7132
Fájlok: `app/opengraph-image.tsx`
Ellenőrzés: tsc ✓ · lint ✓ (a 3 ismert hiba + 1 figyelmeztetés, új nincs) · build ✓, a két edge-figyelmeztetés eltűnt, a `/opengraph-image` statikus (○) · `curl -sI http://localhost:3000/opengraph-image` → `HTTP/1.1 200 OK`, `content-type: image/png`
Diagnózis: a fájl nem használ edge-specifikus API-t (nincs betűtöltés, nincs `import.meta.url`), csak `next/og` `ImageResponse`-t.
Nézd meg: nincs
Bizonytalan: nincs

## J4 — A három lint-hiba
Állapot: kész
Commit: 89b47b3
Fájlok: `app/(marketing)/ai-tartalmak/page.tsx`, `components/reveal-lines.tsx`
Ellenőrzés: tsc ✓ · lint ✓ (0 hiba, csak a `no-img-element` figyelmeztetés, ezt a J7 viszi) · build ✓
Diagnózis:
- `page.tsx:70`: az effect a `?kategoria=` URL-paramétert másolta state-be. Ez „state igazítása, ha a bemenet változik” eset. Javítás: a kezdőérték a paraméterből jön, a későbbi változást az előző paraméter-érték renderkori összevetése kezeli (`prevCategoryParam`). Effect nincs.
- `reveal-lines.tsx:47`: a `canAnimate` „hidratálva vagyunk” jelző volt. Most `useSyncExternalStore` adja (szerver: `false`, kliens: `true`).
- `reveal-lines.tsx:53`: reduced módban állította be az `entered`-et. A `useReducedMotion` hook `true`-val indul, és effectben áll be, ezért ha csak a `canAnimate` cserélődik, kliensoldali navigációnál versenyhelyzet lenne. A komponens ezért a reduced értéket is `useSyncExternalStore`-ral olvassa (szerver: `true`, kliens: a media query), ugyanazzal a mintával, amit a `page.tsx` is használ. Az `entered` csak a `requestAnimationFrame`-callbackben áll be. Reduced módban a `shown` már a reduced miatt igaz, így a viselkedés ugyanaz, és egy későbbi beállításváltás sem játssza le újra a belépést.
Nézd meg: `/ai-tartalmak?kategoria=…` szűr-e (a fejléc lenyílójából is, már a lapon állva), és a főoldali és aloldali címek sor-animációja rendben fut-e, betöltéskor és oldalváltáskor is.
Bizonytalan: két apró eltérés, mindkettő villanást szüntet meg, a végállapot ugyanaz. (1) `?kategoria=` linkkel érkezve a lista azonnal szűrve jelenik meg; korábban egy renderig az „ÖSSZES” állt, és a pill átcsúszhatott. (2) Kliensoldali navigációnál a cím nem villan fel a belépő animáció előtt. A `components/hooks/use-reduced-motion.ts` hook változatlan, máshol továbbra is használatban van.

## J5 — A `/blog` helyőrző törlése (D3)
Állapot: **megállt** (jogosultság)
Commit: —
Fájlok: `app/blog/[slug]/page.tsx` (törlendő)
Ellenőrzés: diagnózis ✓. A `grep -rn "/blog" app components lib content config` szerint semmi nem mutat a `/blog` útvonalra: a találatok a `public/blog/…` képek, plusz külső URL-ek (`openai.com/blog`, `blog.google`, `ramp.com/blog`).
Nézd meg: az ágens Claude Code jogosultsági szabálya (auto mode, „irreversible local destruction”) letiltotta a mappa törlését. Kézzel: `git rm -r app/blog`, majd `npm run build`, és `npm start` után a `curl -sI http://localhost:3000/blog/brand-foundation` 404-et adjon. Commit: `Remove placeholder blog route`.
Bizonytalan: nincs

## J6 — A nem szabványos favicon
Állapot: **megállt** (jogosultság, ugyanaz az ok, mint a J5-nél)
Commit: —
Fájlok: `app/favicon.ico.png` (törlendő)
Ellenőrzés: diagnózis ✓. Az `app/favicon.ico.png`-re semmi nem hivatkozik. Az ikon a `/ZynAI_favicon.png` (`app/layout.tsx:77-79`, `app/manifest.ts:16,21`).
Nézd meg: kézzel `git rm app/favicon.ico.png`, build, commit: `Remove unused favicon file`.
Bizonytalan: nincs

## J7 — A CDN-ikonok helyi kiszolgálása
Állapot: **megállt** (ÁLLJ: hiányzó ikonok)
Commit: —
Fájlok: nincs változás
Ellenőrzés: diagnózis ✓
- A simple-icons aktuális verziója: `16.34.0`. Licenc a csomag `LICENSE.md`-je szerint: **CC0 1.0 Universal**.
- A használt 26 slug: `anthropic, openai, googlegemini, mistralai, meta, perplexity, elevenlabs, huggingface, airtable, notion, slack, discord, telegram, google, n8n, make, zapier, linux, docker, hubspot, stripe, github, vercel, cloudflare, supabase, postgresql`.
- **Nincs meg a 16.34.0-ban (HTTP 404): `openai`, `slack`.** A többi 24 megvan.
Nézd meg: döntés kell a két ikonról (például: a chip ikon nélkül marad, saját vagy a márka hivatalos SVG-je kerül be, vagy a chip kikerül). Mivel az oldal most `@latest`-et tölt, ez a két ikon élesben valószínűleg már most törött képként jelenik meg.
Bizonytalan: nincs

## J8 — A sitemap kiegészítése
Állapot: kész
Commit: c31d5ee
Fájlok: `app/sitemap.ts`
Ellenőrzés: tsc ✓ · lint ✓ (0 hiba, 1 ismert figyelmeztetés: a `no-img-element` a J7 megállása miatt maradt) · build ✓ · a `curl -s http://localhost:3000/sitemap.xml` kimenetében ott van a `https://zynai.hu/idopontfoglalas` és a `https://zynai.hu/adatvedelem`
Nézd meg: nincs
Bizonytalan: a munkafájl nem adott értékeket, ezeket én választottam: `/idopontfoglalas` monthly / 0.8 (konverziós oldal, a `/kapcsolatfelvetel` után), `/adatvedelem` yearly / 0.3.

## J9 — E-mail és webhook beállításai környezeti változóba
Állapot: kész
Commit: e79ceb5
Fájlok: `app/api/contact/route.ts`, `app/api/pilot/route.ts`, `.env.example` (új)
Ellenőrzés: tsc ✓ · lint ✓ (0 hiba, 1 ismert figyelmeztetés a J7 miatt) · build ✓ · `npm start` után üres POST mindkét route-ra → `HTTP 500`, a szervernaplóban `[contact] Hiányzó környezeti változó: CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL` (a pilotnál ugyanez). A konfigurációs ellenőrzés fut le elsőként, e-mail nem ment ki.
- Hiányzó `RESEND_API_KEY`, `CONTACT_TO_EMAIL` vagy `CONTACT_FROM_EMAIL` → 500 és egy `console.error` sor, benne csak a változók nevével.
- Hiányzó n8n-URL → az n8n-hívás kimarad, az űrlap működik. n8n-hiba esetén: nem 2xx válasznál `console.error` a HTTP-státusszal, kivételnél a hiba nevével (`err.name`). Személyes adat nem kerül a naplóba.
- A `from` megjelenítendő neve (`ZynAI Kapcsolatfelvétel`, illetve `ZynAI VibeCoding 1.0 – Pilot`) a kódban maradt, a `CONTACT_FROM_EMAIL` csak a címet adja.
- A `.gitignore` a `.env*` mintával kizárja a `.env.example`-t. Hozzá nem nyúltam (a szelet hatókörén kívül esik), a fájl `git add -f`-fel került be. Ettől kezdve követett fájl.
Nézd meg: a négy új változó értékét (`CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `N8N_CONTACT_WEBHOOK_URL`, `N8N_PILOT_WEBHOOK_URL`) te írod be a `.env.local`-ba és a szerver környezetébe (`03` K2). Addig a helyi űrlap 500-at ad, ez várt viselkedés. A korábbi értékek: a címzett a régi kódba írt Gmail-cím, a feladó a Resend próbacíme, a két webhook-URL pedig a git-történetben megvan (`git show c31d5ee:app/api/contact/route.ts`, illetve `…:app/api/pilot/route.ts`).
Bizonytalan: a látogatónak küldött hibaüzenet szövegét nem írtam át, csak a változónevek listája bővült (`A szerver nincs konfigurálva (hiányzó …).`). Ez a változóneveket a böngészőnek is megmutatja, ahogy korábban is; ha ezt nem szeretnéd, kell egy új szöveg.

## J10 — Az e-mail-formátum kliensoldali ellenőrzése
Állapot: kész
Commit: d432abf
Fájlok: `app/(marketing)/kapcsolatfelvetel/page.tsx`
Ellenőrzés: tsc ✓ · lint ✓ (0 hiba, 1 ismert figyelmeztetés a J7 miatt) · build ✓
- A minta közös: a `lib/form-guard.ts` exportálja az `isValidEmail`-t, a komponens onnan importálja. A `form-guard.ts`-hez nem nyúltam.
- Szöveg: a fájlban nem volt e-mail-formátum hibaüzenet (ÁLLJ). Ati döntése szerint a szerver szövege került be: „Kérlek, adj meg egy érvényes e-mail címet.”
Nézd meg: a `/kapcsolatfelvetel` e-mail lépésénél például az `abc@x` címre megjelenik-e a hibaüzenet, és érvényes címmel tovább lehet-e lépni.
Bizonytalan: nincs

---

## Összesítés

| Szelet | Állapot | Commit |
|---|---|---|
| J1 — Node 24 | kész (Docker-build nem ellenőrzött) | `24f1483` |
| J2 — X-Powered-By és biztonsági fejlécek | kész | `54c84c3` |
| J3 — Edge runtime eltávolítása | kész | `89a7132` |
| J4 — A három lint-hiba | kész | `89b47b3` |
| J5 — `/blog` helyőrző törlése | **megállt** (jogosultság: törlés tiltva) | — |
| J6 — Nem szabványos favicon | **megállt** (jogosultság: törlés tiltva) | — |
| J7 — CDN-ikonok helyi kiszolgálása | **megállt** (ÁLLJ: `openai`, `slack` hiányzik a 16.34.0-ból) | — |
| J8 — Sitemap kiegészítése | kész | `c31d5ee` |
| J9 — E-mail és webhook env-be | kész | `e79ceb5` |
| J10 — E-mail-formátum kliensoldalon | kész | `d432abf` |

Ez a fájl a záró commitban kapja meg az utolsó hash-t, ezért a záró commit (`Add step 1 results summary`) is a lépés része.

Végállapot: tsc ✓ · lint: 0 hiba, 1 figyelmeztetés (`no-img-element`, `IntegrationStack.tsx:63`; a J7-tel megy el) · build ✓.

## Kézi teendők

1. **J5:** `git rm -r app/blog`, build, `curl -sI http://localhost:3000/blog/brand-foundation` → 404. Commit: `Remove placeholder blog route`.
2. **J6:** `git rm app/favicon.ico.png`, build. Commit: `Remove unused favicon file`.
3. **J7:** döntés az `openai` és a `slack` ikonról (a simple-icons 16.34.0-ból hiányzik). Utána a szelet újraindítható.
4. **J9 környezeti változók** a `.env.local`-ba és a szerver környezetébe (`03` K2): `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` (cím, megjelenítendő név nélkül), `N8N_CONTACT_WEBHOOK_URL`, `N8N_PILOT_WEBHOOK_URL`. A `RESEND_API_KEY` már megvan. Addig az űrlapok 500-at adnak.
5. **J1:** a szerveren a Docker-build menjen át a `node:24-alpine` képpel. Később érdemes a `@types/node`-ot `^24`-re emelni.
6. **J4:** `/ai-tartalmak?kategoria=…` szűr-e (a fejléc lenyílójából is, már a lapon állva), és a címek sor-animációja rendben fut-e betöltéskor és oldalváltáskor.
7. **J10:** a `/kapcsolatfelvetel` e-mail lépése érvénytelen címre hibát ad-e, érvényessel továbbenged-e.
8. **J9 (döntés):** a 500-as válasz továbbra is kiírja a böngészőnek a hiányzó változók nevét. Ha ez nem kell, adj új szöveget.

## `git log --oneline -15` (a záró commit előtt)

```
d432abf Validate email format on contact form
e79ceb5 Move mail and webhook settings to environment variables
c31d5ee Add booking and privacy pages to sitemap
89b47b3 Fix set-state-in-effect lint errors
89a7132 Use Node runtime for root OG image
54c84c3 Hide X-Powered-By and add security headers
24f1483 Upgrade Node to 24 in Docker and engines
9c2dae0 Add audit and tracking runbooks
cddef78 before fix
d627a17 Remove card top line, unify card animation, hide X-Powered-By
fdf0ed6 header2
cbeff38 header
449c3af promptepito
24ef2b0 header,footer fix
3255013 final pilot
```
