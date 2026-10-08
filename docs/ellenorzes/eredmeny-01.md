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
Commit: (a következő commitban kerül be)
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
