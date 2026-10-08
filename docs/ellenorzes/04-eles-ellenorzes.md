# 4. lépés — Ellenőrzés élesben

> Szabályok: `00-README.md`. Napló: `valtozasnaplo.md`.
> Előfeltétel: a kód élesítve, `NEXT_PUBLIC_GTM_ID` build-argumentummal, a K1–K5
> kész, a GTM-tároló közzétéve.
> **Ebben a lépésben az ágens a kódhoz nem nyúl és nem commitol.** Csak a
> `valtozasnaplo.md`-be ír egy „4. lépés — éles ellenőrzés” szakaszt, és a
> fájl élére a **végső összefoglalót** (mi változott az egész munkában, mi
> nyitott). A naplót Ati commitolja.
> A terv itt azt tartalmazza, mely ellenőrzéseket futtatod az élesen
> (csak olvasó kérések), és hogy a rate limit próba (E5) kell-e. Ennek jóváhagyása
> után indulsz.
> Parancsok: PowerShellben `curl.exe`, a `for` ciklust és a `grep`-et fordítsd
> le (README 10. szabály).

Minden pont állapota: **teljesült**, **nem teljesült** vagy **nem
ellenőrzött**, bizonyítékkal (parancskimenet).

---

## A rész — az ágens (parancssor)

**E1. Fejlécek**

```bash
curl -sI https://zynai.hu
```

- A státusz 200.
- Nincs `X-Powered-By`.
- Megvan az öt fejléc a J2-ből, **mindegyik egyszer**. Ha valamelyik
  duplán szerepel (a proxy is küldi), írd le, melyik.

**E2. Átirányítások**

```bash
curl -sI http://zynai.hu | head -3
curl -sI https://www.zynai.hu | head -3
```

Mindkettő egy lépésben a `https://zynai.hu` címre irányít (301 vagy 308).

**E3. Mérés a HTML-ben**

```bash
curl -s https://zynai.hu -o /tmp/zynai.html
grep -boE "consent['\"] *, *['\"]default|googletagmanager\.com/gtm\.js" /tmp/zynai.html | head
grep -o "GTM-[A-Z0-9]*" /tmp/zynai.html | sort -u
```

- A consent default pozíciója kisebb, mint a GTM-é.
- Pontosan egy GTM-azonosító van. Írd ki: ez nem titok, de Ati összeveti a
  tárolójával.
- `grep -c "G-[A-Z0-9]\{6,\}\|gtag/js" /tmp/zynai.html` → `0`.

**E4. Útvonalak**

```bash
for p in / /kapcsolatfelvetel /idopontfoglalas /adatvedelem /blog/brand-foundation /robots.txt /sitemap.xml /opengraph-image /ZynAI_favicon.png; do
  printf "%-28s " "$p"; curl -s -o /dev/null -w "%{http_code} %{content_type}\n" "https://zynai.hu$p"
done
curl -s https://zynai.hu/sitemap.xml | grep -o "<loc>[^<]*</loc>"
```

A `/blog/...` 404, minden más 200. A sitemapben benne van az
`/idopontfoglalas` és az `/adatvedelem`.

**E5. Rate limit és a proxy**

- **Diagnózis előbb:** a `lib/form-guard.ts` és a két route alapján írd le,
  milyen sorrendben fut a rate limit, a honeypot és a validáció.
- **Csak akkor futtasd**, ha van olyan kérés, amelyet a rate limit
  beszámít, de **nem** küld e-mailt és nem hívja az n8n-t (például a
  validáción elbukó törzs, ha a limit előtte számol). Ha nincs ilyen, ezt a
  pontot jelöld „nem ellenőrzött"-nek, és ne küldj kérést.

```bash
for i in 1 2 3 4 5 6 7; do
  curl -s -o /dev/null -w "%{http_code} " -X POST https://zynai.hu/api/contact \
    -H "Content-Type: application/json" -H "X-Forwarded-For: 203.0.113.$i" \
    -d '<a diagnózis szerinti, e-mailt nem küldő törzs>'
done; echo
```

Ha a hetedik kérés sem 429, a proxy továbbengedi a kliens által megadott
`X-Forwarded-For`-t, és a rate limit megkerülhető. Ezt **hibaként** jelöld.
A javítás a proxy beállítása, nem a kód.

---

## B rész — Ati (böngésző és telefon)

Mindig **inkognitóablakban, minden bővítmény kikapcsolva**.

- [ ] **Hozzájárulás:** a Tag Assistantben a Consent fülön a `default`
      (minden tiltott) az első GTM-kérés előtt látszik.
- [ ] **Elfogadás előtt** F12 → Application → Cookies: nincs `_ga` kezdetű süti.
- [ ] **Elutasítás** után sincs. Újratöltés után a banner nem jön vissza. A
      lábléc „Süti-beállítások” linkje visszahozza.
- [ ] **Elfogadás** után a GA4 DebugView-ban vagy valós idejű nézetben:
      - menüből három oldalon végigkattintva pontosan **három `page_view`**,
      - egy valódi kapcsolatfelvétel után pontosan **egy `generate_lead`**,
        `lead_type = contact_form`,
      - egy pilot jelentkezés után egy `pilot_application`,
      - egy valódi Cal.com foglalás után egy `booking_complete` (utána mondd le),
      - telefon- és e-mail-kattintásnál `phone_click`, illetve `email_click`,
      - váratlan nevű esemény nincs.
- [ ] **Hibás adattal** beküldött űrlapnál nincs `generate_lead`.
- [ ] **E-mail:** a tesztüzenet megérkezett a `CONTACT_TO_EMAIL`-re, a saját
      domainről (K1), és nem a spam mappába. A válasz gomb a látogató címére
      válaszol (`replyTo`).
- [ ] **n8n:** a két webhook megkapta a tesztadatot.
- [ ] **Cal.com:** a naptár csak a gombra tölt be (K8: milyen sütit tesz).
- [ ] **Lighthouse**, mobil, az éles domainen: írd fel a négy számot. A
      three.js és a GSAP miatt a Performance várhatóan alacsonyabb: ha 90
      alatt van, a Lighthouse megmutatja az okát, és azt hozd.
- [ ] **Saját telefon, mobilneten:** betölt, a menü működik, a banner gombjai
      elérhetők és nem takarnak ki semmit véglegesen, az űrlap elküldhető.

A B rész pipáit és a Lighthouse négy számát Ati írja be a `valtozasnaplo.md`
„4. lépés” szakaszába (az ágens előkészíti a pipálható listát). Ha a
Lighthouse 90 alatti, a naplóban az ok is szerepeljen, de nem kell
sehova visszavinni: a következő javítási kör ebből indul.
