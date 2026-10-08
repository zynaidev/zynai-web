/**
 * A cég hivatalos adatai (cégbejegyző végzés, Cg.13-09-249560/5, 2026. 10. 07.).
 * Minden céges megjelenés (lábléc, adatkezelési tájékoztató, strukturált adat)
 * innen olvas, hogy egy helyen kelljen módosítani.
 */
export const COMPANY = {
  name: "ZynAI Development Korlátolt Felelősségű Társaság",
  shortName: "ZynAI Development Kft.",
  address: {
    postalCode: "2119",
    city: "Pécel",
    street: "Maglódi út 66.",
    country: "HU",
  },
  registrationNumber: "13-09-249560",
  registryCourt: "Budapest Környéki Törvényszék Cégbírósága",
  taxNumber: "33137254-2-13",
  euVatNumber: "HU33137254",
  representative: "Bakos Attila",
  email: "info@zynai.hu",
} as const;

export const COMPANY_ADDRESS_LINE = `${COMPANY.address.postalCode} ${COMPANY.address.city}, ${COMPANY.address.street}`;
