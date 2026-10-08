# Ellenőrzés és mérés — zynai-website

> Készült: 2026. október 8., a `00-feltaras.md` alapján.
> Helye: `docs/ellenorzes/`. Az ágens (Claude Code) ezt a fájlt olvassa el
> először, utána a soron következő munkafájlt.

## A sorrend

| Lépés | Fájl | Ki csinálja | Eredmény |
|---|---|---|---|
| 0 | — | Ati | A 17 nem commitolt változás átnézve, commitolva, élesítve |
| 1 | `01-javitasok.md` | ágens | `eredmeny-01.md` |
| 2 | `02-meres-bekotes.md` | ágens | `eredmeny-02.md` |
| 3 | `03-kezi-beallitasok.md` | Ati | (Resend, szerver-env, GTM, GA4) |
| — | élesítés | Ati | push + új build a szerveren, `NEXT_PUBLIC_GTM_ID` build-argumentummal |
| 4 | `04-eles-ellenorzes.md` | ágens + Ati | `eredmeny-04.md` |

A 3. lépés egy része (GTM-tároló, GA4-tulajdon) a 2. lépéssel párhuzamosan is
mehet: a kódhoz csak a GTM-azonosító kell, és az is csak a build idején.

**Claude chatbe ezeket hozd vissza:** a három `eredmeny-*.md` fájlt egyben,
és a 3. lépésnél, ha elakadsz, a releváns felület képernyőképét.

## Indítás

Minden lépés **új ágens-sessionben** indul (`/clear` vagy új chat), mert a
hosszú session kontextusa minden lépésnél fizetendő, és a végén pontatlan lesz.

```
Read docs/ellenorzes/00-README.md, then execute docs/ellenorzes/01-javitasok.md.
Follow the rules in 00-README.md exactly.
```

A 2. és 4. lépésnél a fájlnév cserélődik. Ha a session közben megtelik vagy
megszakad, ugyanezt a promptot add ki újra: az ágens az eredményfájlból
folytatja.

Modell: az `01` és a `04` mechanikus, ehhez a gyorsabb modell elég. A `02`
(consent-sorrend, mérési logika) az erősebbet érdemli.

---

## Döntések, mielőtt elindítod

Az alapértelmezést írtam be. Ha valamelyiken változtatsz, itt írd át, az ágens
ezt követi.

| # | Kérdés | Alapértelmezés |
|---|---|---|
| D1 | Eseménynevek | `generate_lead` (kapcsolatfelvétel), `pilot_application`, `booking_complete`, `phone_click`, `email_click`. **Élesítés után nem változnak.** |
| D2 | Consent mód | Advanced: a GTM betölt, a döntés előtt minden tiltott, a Google süti nélküli jelzéseket kap (Ads-modellezéshez kell). Basic esetén a GTM csak elfogadás után tölt. |
| D3 | `/blog/[slug]` (angol helyőrző) | Törlés |
| D4 | Cal.com beágyazás | Kattintásra töltődik be (addig gomb és sima link) |
| D5 | Sütibanner megszólítása | Magázó (a `02` szövegei). Ha az oldal tegez, írd át ott. |
| D6 | HSTS | Az alkalmazás küldi, `includeSubDomains` nélkül. Ha a proxy már küldi, a `04` kimutatja, és kivesszük. |

---

## Szabályok az ágensnek

1. **Előfeltétel:** `git status` tiszta. Ha nem, állj meg, és sorold fel a
   változott fájlokat. Ne commitold őket.
2. **Egy szelet = egy változás = egy commit.** Helyi commit, rövid angol
   felszólító üzenettel. **Push soha.** Csak a szelet fájljait add hozzá
   (`git add <fájlok>`), ne `git add .`-ot.
3. **Diagnózis előbb.** Minden szelet előtt olvasd el az érintett fájlokat. Ha
   a valós állapot eltér attól, amit a munkafájl feltételez, ne igazítsd
   magadhoz: állj meg, és írd le az eltérést.
4. **Hatókör.** Csak a szeletben megnevezett fájlokhoz nyúlsz. Új függőség
   csak akkor, ha a szelet kifejezetten engedi.
5. **Ellenőrzés minden szelet után:** `npx tsc --noEmit`, `npm run lint`,
   `npm run build`. Mindháromnak zöldnek kell lennie. Kivétel: a lint három
   ismert hibája a J4 szeletig megmaradhat, de új hiba nem jöhet.
6. **Szöveg.** Látható szöveget nem találsz ki. Vagy a munkafájl adja szó
   szerint, vagy megállsz és kérdezel.
7. **Titkok.** `.env*` fájlt nem nyitsz meg. Értéket soha nem írsz ki,
   csak változónevet.
8. **Ha ugyanaz a javítás kétszer nem sikerül,** állj meg, és írd le, mit
   találtál. Hibát nem nyomsz el (`any`, `@ts-ignore`, `eslint-disable`, üres
   `catch`).
9. **„D" vagy „ÁLLJ" jelölésnél** megállsz, és kérdezel.
10. **Eredményfájl.** Minden szelet után frissíted a lépés eredményfájlját
    (`docs/ellenorzes/eredmeny-0N.md`), és azt is a szelet commitjába teszed.
    Szeletenként:

    ```
    ## J1 — [cím]
    Állapot: kész / megállt / kihagyva (+ ok)
    Commit: [rövid hash]
    Fájlok: [...]
    Ellenőrzés: tsc ✓ · lint ✓ · build ✓ (+ amit még néztél)
    Nézd meg: [amit Atinak kell kézzel ellenőriznie, vagy „nincs"]
    Bizonytalan: [feltételezés, vagy „nincs"]
    ```

    A fájl végén egy összesítő táblázat, és a „Kézi teendők" lista.
11. **Újraindításnál** először az eredményfájlt olvasod el, és az első nem
    kész szelettel folytatod.
12. **A végén** a lépés összesítését a chatbe is kiírod, magyarul.
