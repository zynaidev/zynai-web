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
Commit: (a következő commitban kerül be)
Fájlok: `app/(marketing)/ai-tartalmak/page.tsx`, `components/reveal-lines.tsx`
Ellenőrzés: tsc ✓ · lint ✓ (0 hiba, csak a `no-img-element` figyelmeztetés, ezt a J7 viszi) · build ✓
Diagnózis:
- `page.tsx:70`: az effect a `?kategoria=` URL-paramétert másolta state-be. Ez „state igazítása, ha a bemenet változik” eset. Javítás: a kezdőérték a paraméterből jön, a későbbi változást az előző paraméter-érték renderkori összevetése kezeli (`prevCategoryParam`). Effect nincs.
- `reveal-lines.tsx:47`: a `canAnimate` „hidratálva vagyunk” jelző volt. Most `useSyncExternalStore` adja (szerver: `false`, kliens: `true`).
- `reveal-lines.tsx:53`: reduced módban állította be az `entered`-et. A `useReducedMotion` hook `true`-val indul, és effectben áll be, ezért ha csak a `canAnimate` cserélődik, kliensoldali navigációnál versenyhelyzet lenne. A komponens ezért a reduced értéket is `useSyncExternalStore`-ral olvassa (szerver: `true`, kliens: a media query), ugyanazzal a mintával, amit a `page.tsx` is használ. Az `entered` csak a `requestAnimationFrame`-callbackben áll be. Reduced módban a `shown` már a reduced miatt igaz, így a viselkedés ugyanaz, és egy későbbi beállításváltás sem játssza le újra a belépést.
Nézd meg: `/ai-tartalmak?kategoria=…` szűr-e (a fejléc lenyílójából is, már a lapon állva), és a főoldali és aloldali címek sor-animációja rendben fut-e, betöltéskor és oldalváltáskor is.
Bizonytalan: két apró eltérés, mindkettő villanást szüntet meg, a végállapot ugyanaz. (1) `?kategoria=` linkkel érkezve a lista azonnal szűrve jelenik meg; korábban egy renderig az „ÖSSZES” állt, és a pill átcsúszhatott. (2) Kliensoldali navigációnál a cím nem villan fel a belépő animáció előtt. A `components/hooks/use-reduced-motion.ts` hook változatlan, máshol továbbra is használatban van.
