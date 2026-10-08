import type { Metadata } from "next";

import { COMPANY, COMPANY_ADDRESS_LINE } from "@/lib/company";

export const metadata: Metadata = {
  title: "Adatkezelési tájékoztató",
  description:
    "A ZynAI (ZynAI Development Kft.) adatkezelési tájékoztatója: milyen személyes adatokat kezelünk, milyen célból, meddig, és milyen jogaid vannak.",
  alternates: {
    canonical: "/adatvedelem",
  },
  openGraph: {
    title: "Adatkezelési tájékoztató — ZynAI",
    description:
      "A ZynAI (ZynAI Development Kft.) adatkezelési tájékoztatója: milyen személyes adatokat kezelünk, milyen célból, meddig, és milyen jogaid vannak.",
    url: "/adatvedelem",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "ZynAI — AI integráció magyar vállalkozásoknak",
      },
    ],
  },
};

export default function AdatvedelemPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-base)] pt-32 pb-24">
      <div className="max-w-[780px] mx-auto px-6">

        {/* Header */}
        <div className="mb-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#BDFF00] mb-4">
            JOGI DOKUMENTUM
          </p>
          <h1 className="font-display text-[36px] lg:text-[48px] font-medium text-[var(--text-primary)] mb-4">
            Adatkezelési tájékoztató
          </h1>
          <div className="font-mono text-[12px] text-[var(--text-tertiary)] flex gap-4 flex-wrap">
            <span>Hatályos: 2026. október 8.</span>
            <span>GDPR · 2011. évi CXII. tv.</span>
          </div>
          <div className="border-t border-[rgba(255,255,255,0.06)] mt-8" />
        </div>

        {/* Section 1 */}
        <section className="mb-12">
          <h2 className="font-display text-[22px] font-medium text-[var(--text-primary)] mb-6 pb-3 border-b border-[rgba(255,255,255,0.06)]">
            1. Az adatkezelő adatai
          </h2>
          <div className="space-y-4 text-[var(--text-secondary)] text-[15px] leading-[1.85]">
            <p><span className="text-[var(--text-primary)] font-medium">Név:</span> {COMPANY.name} ({COMPANY.shortName})</p>
            <p><span className="text-[var(--text-primary)] font-medium">Székhely:</span> {COMPANY_ADDRESS_LINE}, Magyarország</p>
            <p><span className="text-[var(--text-primary)] font-medium">Cégjegyzékszám:</span> {COMPANY.registrationNumber} ({COMPANY.registryCourt})</p>
            <p><span className="text-[var(--text-primary)] font-medium">Adószám:</span> {COMPANY.taxNumber}</p>
            <p><span className="text-[var(--text-primary)] font-medium">Közösségi adószám:</span> {COMPANY.euVatNumber}</p>
            <p><span className="text-[var(--text-primary)] font-medium">Képviseli:</span> {COMPANY.representative} ügyvezető</p>
            <p><span className="text-[var(--text-primary)] font-medium">Weboldal:</span> zynai.hu</p>
            <p><span className="text-[var(--text-primary)] font-medium">Kapcsolattartási e-mail:</span> info@zynai.hu</p>
          </div>
        </section>

        {/* Section 2 */}
        <section className="mb-12">
          <h2 className="font-display text-[22px] font-medium text-[var(--text-primary)] mb-6 pb-3 border-b border-[rgba(255,255,255,0.06)]">
            2. Általános tudnivalók
          </h2>
          <div className="space-y-4 text-[var(--text-secondary)] text-[15px] leading-[1.85]">
            <p>
              Jelen tájékoztató a természetes személyek személyes adatainak kezelésére vonatkozó, az Európai Parlament
              és a Tanács (EU) 2016/679 rendelete (GDPR), valamint az információs önrendelkezési jogról és az
              információszabadságról szóló 2011. évi CXII. törvény (Info tv.) előírásai alapján készült.
            </p>
            <p>
              Az adatkezelő elkötelezett az érintett személyek adatainak védelme iránt, és megtesz minden ésszerű
              technikai és szervezési intézkedést az adatok biztonságos kezelése érdekében.
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section className="mb-12">
          <h2 className="font-display text-[22px] font-medium text-[var(--text-primary)] mb-6 pb-3 border-b border-[rgba(255,255,255,0.06)]">
            3. Kezelt személyes adatok
          </h2>
          <div className="space-y-4 text-[var(--text-secondary)] text-[15px] leading-[1.85]">
            <h3 className="text-[17px] font-medium text-[var(--text-primary)] mt-8 mb-3">
              3.1. Kapcsolatfelvételi űrlap
            </h3>
            <p>Az érintett az alábbi adatokat adja meg önkéntesen:</p>
            <Bullets
              items={[
                "Név",
                "E-mail cím",
                "Cégnév és a cég weboldala (opcionális)",
                "A cégnél dolgozók száma",
                "A legtöbb időt elvevő munkafolyamatok, és az ezekhez írt saját megjegyzés",
                "Az AI-használat jelenlegi szakasza",
                "Az egyeztetéshez megfelelő időpont",
              ]}
            />
            <p>
              <Label>Adatkezelés célja:</Label> Az érintett megkeresésének fogadása,
              üzleti kapcsolatfelvétel, árajánlat vagy tájékoztatás küldése.
            </p>
            <p>
              <Label>Jogalap:</Label> GDPR 6. cikk (1) bekezdés b) és a) pont.
            </p>
            <p>
              <Label>Megőrzési idő:</Label> A kapcsolatfelvételtől számított 5 év,
              vagy a törvényes elévülési idő.
            </p>

            <h3 className="text-[17px] font-medium text-[var(--text-primary)] mt-8 mb-3">
              3.2. VibeCoding pilot jelentkezés
            </h3>
            <p>Az érintett az alábbi adatokat adja meg önkéntesen:</p>
            <Bullets
              items={[
                "Név",
                "E-mail cím",
                "Telefonszám",
                "A jelentkezés indoklása (szabad szöveg)",
              ]}
            />
            <p>
              <Label>Adatkezelés célja:</Label> A jelentkezés elbírálása, a
              jelentkezővel való kapcsolattartás és az egyeztető beszélgetés
              időpontjának megbeszélése.
            </p>
            <p>
              <Label>Jogalap:</Label> GDPR 6. cikk (1) bekezdés b) és a) pont.
            </p>
            <p>
              <Label>Megőrzési idő:</Label> A jelentkezéstől számított 5 év,
              vagy a törvényes elévülési idő.
            </p>

            <h3 className="text-[17px] font-medium text-[var(--text-primary)] mt-8 mb-3">
              3.3. Időpontfoglalás (Cal.com)
            </h3>
            <p>
              Az időpontfoglaló naptárat a Cal.com, Inc. szolgáltatása biztosítja.
              A naptár csak akkor töltődik be, ha az érintett a „Naptár
              megnyitása” gombra kattint; addig a böngésző nem küld kérést a
              Cal.com felé. A foglaláskor megadott adatokat (név, e-mail cím,
              az esetleges megjegyzés és a választott időpont) a Cal.com kezeli,
              és továbbítja az adatkezelőhöz. A Cal.com saját adatkezeléséről a{" "}
              <a
                href="https://cal.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-primary)] underline underline-offset-2 hover:text-[#BDFF00]"
              >
                Cal.com adatvédelmi tájékoztatója
              </a>{" "}
              ad felvilágosítást.
            </p>
            <p>
              <Label>Adatkezelés célja:</Label> Az egyeztetés időpontjának
              lefoglalása és megtartása.
            </p>
            <p>
              <Label>Jogalap:</Label> GDPR 6. cikk (1) bekezdés b) pont.
            </p>
            <p>
              <Label>Megőrzési idő:</Label> A foglalástól számított 5 év, vagy a
              törvényes elévülési idő.
            </p>

            <h3 className="text-[17px] font-medium text-[var(--text-primary)] mt-8 mb-3">
              3.4. Sütik és mérés
            </h3>
            <p>
              Az oldal első megnyitásakor a sütibanneren lehet dönteni a
              hozzájárulást igénylő sütikről. A döntés bármikor megváltoztatható
              a lábléc „Süti-beállítások” linkjével.
            </p>
            <Bullets
              items={[
                "Szükséges tárolás: a sütidöntés a böngésző helyi tárolójában (zynai_consent_v1). Jogalap: jogos érdek, a döntés megjegyzéséhez szükséges.",
                "Google Analytics (Google Tag Manageren keresztül): látogatottsági mérés. Sütik: _ga, _ga_* (legfeljebb 2 évig). Jogalap: hozzájárulás.",
                "Google Ads és remarketing: hirdetések mérése és célzása. Sütik: például _gcl_au és a Google hirdetési sütijei (legfeljebb 2 évig). Jogalap: hozzájárulás.",
              ]}
            />
            <p>
              Az oldal a Google hozzájárulási módját (Consent Mode) használja.
              Hozzájárulás nélkül a Google-eszközök nem helyeznek el sütit, de
              süti nélküli, azonosítót nem tartalmazó jelzéseket kaphatnak (például
              hogy történt-e oldalmegtekintés), amelyekből a Google összesített
              statisztikát becsül. A Google Analytics adatait az adatkezelő 14
              hónapig őrzi meg.
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section className="mb-12">
          <h2 className="font-display text-[22px] font-medium text-[var(--text-primary)] mb-6 pb-3 border-b border-[rgba(255,255,255,0.06)]">
            4. Adattárolás és biztonság
          </h2>
          <div className="space-y-4 text-[var(--text-secondary)] text-[15px] leading-[1.85]">
            <p>
              A weboldal az adatkezelő által bérelt virtuális szerveren fut,
              amelyet a Hetzner Online GmbH üzemeltet Helsinkiben (Finnország,
              Európai Unió). Az űrlapok adatait a weboldal nem tárolja
              adatbázisban: e-mailben továbbítja az adatkezelő e-mail-fiókjába.
            </p>
            <p>Alkalmazott biztonsági intézkedések:</p>
            <Bullets
              items={[
                "HTTPS titkosított kapcsolat (SSL/TLS tanúsítvány)",
                "Tűzfal és hozzáférés-korlátozás a szerveren",
                "Rendszeres biztonsági mentések",
                "Jelszóvédett adminisztrátori hozzáférés",
                "Minimális adatgyűjtés elve",
              ]}
            />
          </div>
        </section>

        {/* Section 5 */}
        <section className="mb-12">
          <h2 className="font-display text-[22px] font-medium text-[var(--text-primary)] mb-6 pb-3 border-b border-[rgba(255,255,255,0.06)]">
            5. Adatfeldolgozók és adattovábbítás
          </h2>
          <div className="space-y-4 text-[var(--text-secondary)] text-[15px] leading-[1.85]">
            <p>
              Az adatkezelő az érintett személyes adatait harmadik félnek nem
              adja el és nem adja át, kivéve az alábbi adatfeldolgozókat, a
              jogszabályi kötelezettséget, vagy az érintett kifejezett
              hozzájárulását.
            </p>
            <p>Adatfeldolgozók:</p>
            <Bullets
              items={[
                "Hetzner Online GmbH (Németország) — szerverüzemeltetés; a szerver Helsinkiben (Finnország, EU) található.",
                "Cloudflare, Inc. (USA) — tartalomkézbesítés és védelem; a weboldal forgalma rajta halad át, ezért az IP-címet és a kérés technikai adatait kezeli.",
                "Resend, Inc. (USA) — az űrlapüzenetek e-mailben történő kézbesítése az adatkezelőhöz.",
                "Google Ireland Limited és Google LLC — az adatkezelő e-mail-fiókja (Gmail), továbbá hozzájárulás esetén a Google Analytics, a Google Tag Manager és a Google Ads.",
                "Cal.com, Inc. (USA) — időpontfoglalás (lásd 3.3. pont).",
              ]}
            />
            <p>
              Az Európai Unión kívüli (USA) adattovábbítás az EU–USA adatvédelmi
              keretrendszer (Data Privacy Framework) vagy az Európai Bizottság
              által elfogadott általános szerződési feltételek alapján történik.
            </p>
          </div>
        </section>

        {/* Section 6 */}
        <section className="mb-12">
          <h2 className="font-display text-[22px] font-medium text-[var(--text-primary)] mb-6 pb-3 border-b border-[rgba(255,255,255,0.06)]">
            6. Az érintett jogai
          </h2>
          <div className="space-y-4 text-[var(--text-secondary)] text-[15px] leading-[1.85]">
            <p>Az érintett az alábbi jogokat gyakorolhatja (<span className="text-[var(--text-primary)] font-medium">info@zynai.hu</span>):</p>
            <ul className="space-y-2">
              {[
                "Hozzáférési jog — GDPR 15. cikk",
                "Helyesbítési jog — GDPR 16. cikk",
                "Törléshez való jog — GDPR 17. cikk",
                "Adatkezelés korlátozásához való jog — GDPR 18. cikk",
                "Adathordozhatósághoz való jog — GDPR 20. cikk",
                "Tiltakozáshoz való jog — GDPR 21. cikk",
                "Hozzájárulás visszavonásának joga — bármikor, visszamenőleges hatály nélkül",
              ].map((item) => (
                <li key={item} className="flex gap-3 items-start">
                  <span className="w-1 h-1 min-w-[4px] min-h-[4px] bg-[#BDFF00] rounded-sm mt-[10px] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p>Az adatkezelő a kérelmeket 30 napon belül megválaszolja.</p>
          </div>
        </section>

        {/* Section 7 */}
        <section className="mb-12">
          <h2 className="font-display text-[22px] font-medium text-[var(--text-primary)] mb-6 pb-3 border-b border-[rgba(255,255,255,0.06)]">
            7. Jogorvoslat
          </h2>
          <div className="space-y-4 text-[var(--text-secondary)] text-[15px] leading-[1.85]">
            <p>Panasz esetén az érintett a következő hatósághoz fordulhat:</p>
            <p>
              <span className="text-[var(--text-primary)] font-medium">
                Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH)
              </span>
            </p>
            <p><span className="text-[var(--text-primary)] font-medium">Cím:</span> 1055 Budapest, Falk Miksa utca 9–11.</p>
            <p><span className="text-[var(--text-primary)] font-medium">E-mail:</span> ugyfelszolgalat@naih.hu</p>
            <p><span className="text-[var(--text-primary)] font-medium">Web:</span> naih.hu</p>
          </div>
        </section>

        {/* Section 8 */}
        <section className="mb-12">
          <h2 className="font-display text-[22px] font-medium text-[var(--text-primary)] mb-6 pb-3 border-b border-[rgba(255,255,255,0.06)]">
            8. A tájékoztató módosítása
          </h2>
          <div className="space-y-4 text-[var(--text-secondary)] text-[15px] leading-[1.85]">
            <p>
              Az adatkezelő fenntartja a jogot, hogy jelen tájékoztatót egyoldalúan módosítsa. A módosításról az
              érintetteket a weboldalon közzétett értesítéssel tájékoztatja.
            </p>
            <p>
              <span className="text-[var(--text-primary)] font-medium">Hatályos:</span> 2026. október 8.
            </p>
          </div>
        </section>

      </div>
    </main>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[var(--text-primary)] font-medium">{children}</span>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3 items-start">
          <span className="w-1 h-1 min-w-[4px] min-h-[4px] bg-[#BDFF00] rounded-sm mt-[10px] flex-shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  );
}
