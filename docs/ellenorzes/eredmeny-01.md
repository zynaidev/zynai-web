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
Commit: (a következő commitban kerül be)
Fájlok: `Dockerfile`, `package.json`, `.nvmrc` (új)
Ellenőrzés: tsc ✓ · lint ✓ (a 3 ismert hiba + 1 figyelmeztetés, új nincs) · build ✓ · Docker-build: **nem ellenőrzött** (a Docker-démon nem fut)
Nézd meg: a szerveren a következő Docker-build a `node:24-alpine` képpel menjen át.
Bizonytalan: a `devDependencies`-ben a `@types/node` még `^20`. A szelet hatókörén kívül esik, nem nyúltam hozzá; érdemes később `^24`-re emelni.
