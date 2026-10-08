# 3. lépés — Kézi beállítások (Ati)

> Ezt nem az ágens csinálja. A külső felületek menüi változnak, ezért ha
> elakadsz, a képernyőképpel gyere a Claude chatbe, ne emlékezetből dolgozz.

## K1 — Resend: saját domain

- [ ] A Resendben a domain hozzáadása, és a mutatott DNS-rekordok felvétele
      oda, ahol a `zynai.hu` DNS-ét kezeled. A rekordokat a Resend felülete
      adja.
- [ ] A domain állapota: verified.
- [ ] A `CONTACT_FROM_EMAIL` értéke egy cím ezen a domainen. Amíg nem
      hitelesített, maradhat az `onboarding@resend.dev`: ez csak a
      Resend-fiók saját címére kézbesít, ezért most működik, de nem végleges.

## K2 — Környezeti változók a szerveren

| Változó | Hol | Mikor hat |
|---|---|---|
| `RESEND_API_KEY` | futásidejű env (konténer) | újraindítás után |
| `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | futásidejű env | újraindítás után |
| `N8N_CONTACT_WEBHOOK_URL`, `N8N_PILOT_WEBHOOK_URL` | futásidejű env | újraindítás után |
| `NEXT_PUBLIC_GTM_ID` | **build-argumentum** (`docker build --build-arg NEXT_PUBLIC_GTM_ID=GTM-…`) | csak új build után |

- [ ] Helyben a `.env.local`-ba a négy szerveroldali változó (a
      `NEXT_PUBLIC_GTM_ID` helyben üres marad).
- [ ] A szerveren, ahol a build és a konténer fut, mind az öt.

## K3 — A webhook-URL-ek a Git-történetben

- [ ] Nyilvános a `zynaidev/zynai-web` repó? Ha igen, az n8n webhook-URL-ek a
      történetben olvashatók, ezért az n8n-ben új útvonalat kell generálni
      mindkét webhookhoz, és az új értéket az env-be tenni. Privát repónál ez
      nem sürgős.

## K4 — Google Tag Manager

- [ ] Web-tároló a saját fiókodban. Az azonosító megy a build-argumentumba.
- [ ] A tárolóbeállításokban a consent overview bekapcsolva.
- [ ] **Google tag** (GA4 mérési azonosító), trigger:
      **Initialization – All Pages**. A Google-tagek beépített
      hozzájárulás-ellenőrzéssel működnek. Advanced módban (D2) **ne adj
      hozzájuk** további kötelező hozzájárulást, mert akkor a döntés előtti
      jelzések elmaradnak.
- [ ] Öt **Custom Event** trigger, pontos egyezéssel: `generate_lead`,
      `pilot_application`, `booking_complete`, `phone_click`, `email_click`.
- [ ] Öt **GA4 Event** tag, mindegyik a saját triggerével. A
      `generate_lead`-nél paraméterként a `lead_type` (Data Layer Variable).
      Konverziós tagen nincs All Pages trigger.
- [ ] History Change trigger page_view-ra **nincs**.
- [ ] Közzététel, a verzió kapjon nevet és leírást.

## K5 — GA4

- [ ] Enhanced measurement: **Page changes based on browser history events
      bekapcsolva** (az App Router kliensoldali navigációja miatt), az
      **űrlapinterakciók kikapcsolva**.
- [ ] Kulcsesemény: `generate_lead`, `pilot_application`, `booking_complete`.
      A `phone_click` és az `email_click` döntés kérdése.
- [ ] A `lead_type` eseményszintű egyéni dimenzió, ha riportolni akarod.
- [ ] Adatmegőrzés: 14 hónap.
- [ ] Belső forgalom szűrése a saját IP-dre (opcionális, de a tesztjeid
      különben bekerülnek).

## K6 — Google Ads (ha lesz kampány)

Nem része ennek a körnek. Ha jön: GA4 kulcsesemény-import, vagy Ads
konverziós tag és Conversion Linker a GTM-ben, ugyanazokra a triggerekre.

## K7 — Az adatkezelési tájékoztató (`/adatvedelem`)

A feltárás szerint hiányzik belőle, vagy nem a valóságot írja:

- [ ] A Cal.com (foglalás, saját adatkezelés, link a szabályzatára)
- [ ] Az n8n (az űrlapadatok továbbítása a saját szerveredre) és a Resend
- [ ] A pilot jelentkezési űrlap és a telefonszám mező
- [ ] A Google Analytics és a Tag Manager „tervezett” helyett a tényleges
      működés: hozzájárulás után sütik, előtte süti nélküli jelzések (D2)
- [ ] A „Süti-beállítások” link

Ez jogi tartalom. A szöveget te (vagy szakember) hagyod jóvá. Ha kéred, a
chatben megírom a tervezetet a fenti pontokra.

## K8 — Cal.com sütik (D4 ellenőrzése)

- [ ] Élesben, inkognitóban megnyitod a naptárat, és F12 → Application →
      Cookies alatt megnézed, milyen sütit tesz a `cal.com`. Ha csak
      működéshez szükségeset, a kattintásra betöltés elég. Ha mérőt vagy
      hirdetésit is, a betöltést a hozzájáruláshoz kötjük, és erről szólj.
