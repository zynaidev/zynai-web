export type PainPointId =
  | "ajanlatadas"
  | "email_ismetlodo"
  | "adatmasolas"
  | "szamlazas_admin"
  | "riportok"
  | "ugyfelkovetes"
  | "tartalom"
  | "egyeb";

export interface PainPointOption {
  id: PainPointId;
  label: string;
}

/**
 * A kapcsolatfelvételi wizard "mi veszi el a legtöbb időt" lépésének
 * választható elemei. Egy helyen definiálva, mert a kliens (UI) és a
 * szerver (email + n8n payload) is ugyanazt az id → címke leképezést
 * használja.
 */
export const PAIN_POINTS: PainPointOption[] = [
  { id: "ajanlatadas", label: "Ajánlatadás, árajánlat összeállítása" },
  {
    id: "email_ismetlodo",
    label: "Ugyanazokra a kérdésekre válaszolgatás e-mailben",
  },
  {
    id: "adatmasolas",
    label: "Adatok átmásolása egyik rendszerből a másikba",
  },
  { id: "szamlazas_admin", label: "Számlázás, adminisztráció" },
  { id: "riportok", label: "Riportok, kimutatások összerakása" },
  { id: "ugyfelkovetes", label: "Ügyfélkövetés, utánkövetés" },
  { id: "tartalom", label: "Tartalom, marketinganyag írása" },
  { id: "egyeb", label: "Egyéb" },
];

export function painPointLabel(id: string): string | undefined {
  return PAIN_POINTS.find((p) => p.id === id)?.label;
}

/** A kapcsolatfelvételi form által a szervernek küldött JSON body alakja. */
export interface ContactFormPayload {
  name: string;
  email: string;
  company?: string;
  website?: string;
  teamSize?: string;
  painPoints: string[];
  painPointOther?: string;
  aiStage?: string;
  availability?: string;
  privacyAccepted: boolean;
}
