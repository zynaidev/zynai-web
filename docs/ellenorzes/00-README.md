# Ellenőrzés és mérés — zynai-website

> Készült: 2026. október 8., a `00-feltaras.md` alapján.
> Helye: `docs/ellenorzes/`. Az ágens (Claude Code) ezt a fájlt olvassa el
> először, utána a soron következő munkafájlt.

## Hogyan megy a munka

Az ágens **előbb leírja, mit akar változtatni, és engedélyt kér**. Te csak
jóváhagysz vagy módosítasz. Az eredményt nem kell sehova visszavinned: az
ágens a végén **változásnaplót** ír (`docs/ellenorzes/valtozasnaplo.md`).

1. **Tervmód.** Minden lépést a `/plan` előtaggal indítasz (vagy `Shift+Tab`
   addig, amíg a státuszsorban „plan mode on” látszik). Tervmódban az ágens
   olvas, vizsgál, de a forrást nem módosítja.
2. **Terv.** Az ágens elolvassa a munkafájlt és a kódot, és egy tervet mutat:
   szeletenként mit változtat, mely fájlokban, milyen paranccsal, és mit nem.
3. **Jóváhagyás.** A terv alatt három lehetőség jön:
   - **Yes, manually approve edits** — *ezt válaszd*: minden szerkesztést és
     törlést külön megerősítesz. Itt a legbiztonságosabb, és a törlések
     (J5, J6) is engedélyezhetők.
   - **Yes, and use auto mode** — az ágens kérdés nélkül halad. Gyorsabb, de a
     könyvtártörlést a védelem ilyenkor megtagadhatja.
   - **No, keep planning** — írd meg, mit változtasson a terven.
4. **Munka.** Szeletenként egy helyi commit. Ha az ágens döntést kér (A/B/C),
   a kérdőablakban válaszolsz.
5. **Napló.** Minden szelet commitjába bekerül a `valtozasnaplo.md` frissítése.

(Forrás: Claude Code dokumentáció, „Choose a permission mode”,
https://code.claude.com/docs/en/permission-modes)

## A sorrend

| Lépés | Fájl | Ki csinálja |
|---|---|---|
| 0 | — | Ati: a nem commitolt változások átnézve, commitolva |
| 1 | `01-javitasok.md` | ágens |
| 2 | `02-meres-bekotes.md` | ágens |
| 3 | `03-kezi-beallitasok.md` | Ati (Resend, szerver-env, GTM, GA4) |
| — | élesítés | Ati: push + új build a szerveren, `NEXT_PUBLIC_GTM_ID` build-argumentummal |
| 4 | `04-eles-ellenorzes.md` | ágens + Ati |

A 3. lépés egy része (GTM-tároló, GA4-tulajdon) a 2. lépéssel párhuzamosan is
mehet: a kódhoz csak a GTM-azonosító kell, és az is csak a build idején.

## Indítás

Minden lépés **új ágens-sessionben** indul, mert a hosszú session kontextusa
minden lépésnél fizetendő, és a végén pontatlan lesz.

```
/plan Read docs/ellenorzes/00-README.md, then execute docs/ellenorzes/01-javitasok.md.
Follow the rules in 00-README.md exactly.
```

A 2. és 4. lépésnél a fájlnév cserélődik. Ha a session megszakad, ugyanezt
add ki újra: az ágens a `valtozasnaplo.md` alapján az első nem kész
szelettel folytatja.

Modell: az `01` és a `04` mechanikus, ehhez a gyorsabb modell elég. A `02`
(consent-sorrend, mérési logika) az erősebbet érdemli.

---

## Döntések

Az alapértelmezést írtam be. Ha valamelyiken változtatsz, itt írd át, az ágens
ezt követi.

| # | Kérdés | Alapértelmezés |
|---|---|---|
| D1 | Eseménynevek | `generate_lead` (kapcsolatfelvétel), `pilot_application`, `booking_complete`, `phone_click`, `email_click`. **Élesítés után nem változnak.** |
| D2 | Consent mód | Advanced: a GTM betölt, a döntés előtt minden tiltott, a Google süti nélküli jelzéseket kap (Ads-modellezéshez kell). Basic esetén a GTM csak elfogadás után tölt. |
| D3 | `/blog/[slug]` (angol helyőrző) | Törlés |
| D4 | Cal.com beágyazás | Kattintásra töltődik be (addig gomb és sima link) |
| D5 | Sütibanner és Cal.com szövegek megszólítása | Az ágens az oldal meglévő szövegéből állapítja meg (a `02` M3 diagnózisa), mindkét változat benne van. Valószínűleg tegező. |
| D6 | HSTS | Az alkalmazás küldi, `includeSubDomains` nélkül. Ha a proxy már küldi, a `04` kimutatja, és kivesszük. |

---

## Szabályok az ágensnek

1. **Terv előbb, engedély után munka.** Tervmódban (vagy ha a session nem
   tervmódban indult, az első lépésként) a lépés **összes szeletéről** egy
   tervet adsz: szelet · érintett fájlok · mit változtatsz · mit nem · a
   futtatandó parancsok (törlés, telepítés külön megjelölve). Látható
   szöveget a tervben nem találsz ki. Engedély nélkül nem módosítasz,
   nem commitolsz.
2. **Előfeltétel:** `git status` tiszta. Ha nem, sorold fel a változott
   fájlokat, és kérdezz. Ne commitold őket.
3. **Egy szelet = egy változás = egy commit.** Helyi commit, rövid angol
   felszólító üzenettel. **Push soha.** Csak a szelet fájljait add hozzá
   (`git add <fájlok>`), ne `git add .`-ot. A `valtozasnaplo.md` frissítése a
   szelet commitjába kerül.
4. **Diagnózis előbb.** Minden szelet előtt olvasd el az érintett fájlokat. Ha
   a valós állapot eltér attól, amit a munkafájl feltételez, ne igazítsd
   magadhoz: kérdezd meg Atit (lásd 9.).
5. **Hatókör.** Csak a szeletben megnevezett fájlokhoz nyúlsz. Új függőség
   csak akkor, ha a szelet kifejezetten engedi.
6. **Ellenőrzés minden szelet után:** `npx tsc --noEmit`, `npm run lint`,
   `npm run build`. Mindháromnak zöldnek kell lennie. Új hiba nem jöhet. Hibát
   nem nyomsz el (`any`, `@ts-ignore`, `eslint-disable`, üres `catch`).
   Ha ugyanaz a javítás kétszer nem sikerül, megállsz és kérdezel.
7. **Szöveg.** Látható szöveget nem találsz ki. Vagy a munkafájl adja szó
   szerint, vagy a meglévő oldalról veszed, vagy megkérdezed Atit.
8. **Titkok.** `.env*` fájlt nem nyitsz meg (az `.env.example` kivétel: az
   nem titok). Értéket soha nem írsz ki, csak változónevet.
9. **Kérdés, nem megállás.** Ahol a munkafájl „ÁLLJ” vagy „kérdezz” jelölést
   ad, vagy a valóság eltér a feltételezéstől, a kérdezős eszközzel
   (AskUserQuestion) kérdezel: 2–4 válaszlehetőség, mindegyiknél egy sor
   következmény, **az ajánlottat te jelölöd meg elsőnek**. A válasz után
   folytatod. Nem hagyod abba a munkát, és nem várod, hogy Ati a chatben
   magyarázzon.
10. **Parancsok és a shell.** A gép Windows. Mielőtt parancsot futtatsz,
    állapítsd meg a shellt (`$PSVersionTable` PowerShellben, `echo $SHELL`
    bashben). PowerShellben: **ne láncolj `&&`-sel** (a régi PowerShell nem
    ismeri), külön parancsokként add; HTTP-hez `curl.exe`, nem `curl`; a
    `grep` helyett `Select-String`; a munkafájlokban bash-szintaxis
    szerepel, azt fordítsd le. Törlés: `git rm`.
11. **Változásnapló** (`docs/ellenorzes/valtozasnaplo.md`). Az első
    szeletnél létrehozod, utána minden szelet után bővíted. Szeletenként:

    ```
    ## J1 — [cím]
    Állapot: kész / kihagyva / Ati döntésére vár (+ ok)
    Commit: [rövid hash]
    Mit és miért: [2–3 mondat, magyarul, laikusnak is érthetően]
    Fájlok: [...]
    Ellenőrzés: tsc ✓ · lint ✓ · build ✓ (+ amit még néztél)
    Ati dönt / Ati ellenőrzi: [amit kézzel kell megnézni, vagy „nincs”]
    ```

    A munkafájlokban a „Nézd meg (Ati)” sor a napló „Ati ellenőrzi” mezőjébe
    kerül; az „ÁLLJ” a 9. szabály szerinti kérdés, nem végleges megállás.

    A fájl elején rövid összefoglaló és táblázat (szelet · állapot · commit),
    a végén a „Kézi teendők” lista.
12. **Újraindításnál** a `valtozasnaplo.md`-t olvasod el először, és az első
    nem kész szelettel folytatod. Új tervet csak a hátralévő szeletekről adsz.
13. **A lépés végén** a chatben egy rövid magyar összegzést írsz: mi kész, mi
    vár Atira. A teljes leírás a `valtozasnaplo.md`-ben van; Atinak nem kell
    semmit visszavinnie.
