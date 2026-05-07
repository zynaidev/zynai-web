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
            <span>Hatályos: 2025. május 7.</span>
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
            <p><span className="text-[var(--text-primary)] font-medium">Név:</span> Bakos Attila egyéni vállalkozó</p>
            <p><span className="text-[var(--text-primary)] font-medium">Székhely:</span> 2119 Pécel, Maglódi út 66., Magyarország</p>
            <p><span className="text-[var(--text-primary)] font-medium">Nyilvántartási szám:</span> 59341763</p>
            <p><span className="text-[var(--text-primary)] font-medium">Adószám:</span> 90189021-1-33</p>
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
            <p>Az érintett az alábbi személyes adatokat adja meg önkéntesen:</p>
            <ul className="space-y-2">
              {[
                "Teljes név",
                "E-mail cím",
                "Vállalkozás neve (opcionális)",
                "Weboldal URL (opcionális)",
                "Üzenet szövege",
              ].map((item) => (
                <li key={item} className="flex gap-3 items-start">
                  <span className="w-1 h-1 min-w-[4px] min-h-[4px] bg-[#BDFF00] rounded-sm mt-[10px] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p>
              <span className="text-[var(--text-primary)] font-medium">Adatkezelés célja:</span> Az érintett
              megkeresésének fogadása, üzleti kapcsolatfelvétel megvalósítása, árajánlat vagy tájékoztatás küldése.
            </p>
            <p>
              <span className="text-[var(--text-primary)] font-medium">Jogalap:</span> GDPR 6. cikk (1) bekezdés b) és a) pont.
            </p>
            <p>
              <span className="text-[var(--text-primary)] font-medium">Megőrzési idő:</span> Az adatokat az adatkezelő
              a kapcsolatfelvételtől számított 5 évig, vagy a törvényes elévülési ideig kezeli.
            </p>

            <h3 className="text-[17px] font-medium text-[var(--text-primary)] mt-8 mb-3">
              3.2. Sütikezelés (cookie)
            </h3>
            <p>A weboldal az alábbi sütiket alkalmazza:</p>
            <ul className="space-y-2">
              {[
                "Technikailag szükséges sütik — a weboldal működéséhez elengedhetetlenek (jogalap: jogos érdek)",
                "Google Analytics sütik (tervezett) — látogatottsági mérés céljából (jogalap: hozzájárulás)",
                "Google Ads / remarketing sütik (tervezett) — célzott hirdetések megjelenítéséhez (jogalap: hozzájárulás)",
              ].map((item) => (
                <li key={item} className="flex gap-3 items-start">
                  <span className="w-1 h-1 min-w-[4px] min-h-[4px] bg-[#BDFF00] rounded-sm mt-[10px] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p>
              A hozzájárulást igénylő sütikhez az érintett a sütibanneren keresztül adhat hozzájárulást, amelyet
              bármikor visszavonhat.
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
              A weboldal és az érintett adatai az adatkezelő által üzemeltetett, dedikált virtuális privát szerveren
              (VPS) kerülnek tárolásra, az Európai Unió területén. Az adatkezelő harmadik fél felhőszolgáltatójának
              szervereire az érintett személyes adatait nem továbbítja.
            </p>
            <p>Alkalmazott biztonsági intézkedések:</p>
            <ul className="space-y-2">
              {[
                "HTTPS titkosított kapcsolat (SSL/TLS tanúsítvány)",
                "Tűzfal és hozzáférés-korlátozás a szerveren",
                "Rendszeres biztonsági mentések",
                "Jelszóvédett adminisztrátori hozzáférés",
                "Minimális adatgyűjtés elve",
              ].map((item) => (
                <li key={item} className="flex gap-3 items-start">
                  <span className="w-1 h-1 min-w-[4px] min-h-[4px] bg-[#BDFF00] rounded-sm mt-[10px] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Section 5 */}
        <section className="mb-12">
          <h2 className="font-display text-[22px] font-medium text-[var(--text-primary)] mb-6 pb-3 border-b border-[rgba(255,255,255,0.06)]">
            5. Adattovábbítás
          </h2>
          <div className="space-y-4 text-[var(--text-secondary)] text-[15px] leading-[1.85]">
            <p>
              Az adatkezelő az érintett személyes adatait harmadik félnek nem adja át, kivéve jogszabályi
              kötelezettség vagy az érintett kifejezett hozzájárulása esetén.
            </p>
            <p>Adatfeldolgozók:</p>
            <ul className="space-y-2">
              {[
                "Resend Inc. — e-mail kézbesítési szolgáltatás (kapcsolatfelvételi üzenetek továbbítása az adatkezelőhöz)",
                "Google LLC (tervezett) — Google Analytics és Google Ads szolgáltatások; az EU–US Data Privacy Framework keretrendszer résztvevője",
              ].map((item) => (
                <li key={item} className="flex gap-3 items-start">
                  <span className="w-1 h-1 min-w-[4px] min-h-[4px] bg-[#BDFF00] rounded-sm mt-[10px] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
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
              <span className="text-[var(--text-primary)] font-medium">Hatályos:</span> 2025. május 7.
            </p>
          </div>
        </section>

      </div>
    </main>
  );
}
