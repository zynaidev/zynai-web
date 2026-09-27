/**
 * A "Tippek és trükkök" szekció bejegyzései.
 *
 * Forrás: content/claude-code/prompt-epito.md, 6. szakasz. Mindkét
 * helyen ugyanaz a szabály: legújabb elöl. Új bejegyzést előbb a
 * markdownban vegyél fel, a lista elejére, és csak utána ide, ebbe
 * a tömbbe — szintén a tömb elejére.
 */

export type TipEntry = {
  body: string;
  date: string;
  title: string;
};

export const tipEntries: readonly TipEntry[] = [
  {
    date: "2026. 09.",
    title: "Ami beágyazható, azt ne építsd meg",
    body: "Foglalás, térkép, videó: ezekre van kész beágyazás. Az AI szívesen megépíti neked a sajátodat, de azt neked kell karbantartanod.",
  },
  {
    date: "2026. 09.",
    title: 'Az „eltűnt a hiba, de nem tudom, miért" gyanús',
    body: "Ez azt jelenti, hogy elnyomta, nem javította. Keress `any`-t, `@ts-ignore`-t és üres `catch` blokkot. Ugyanígy gyanús, ha teljes átírást javasol: az azt jelenti, hogy nem találja a hibát.",
  },
  {
    date: "2026. 09.",
    title: "A képernyőkép a leggyorsabb hibajelentés",
    body: "Vizuális hibánál illeszd be a képet, és írd mellé, mit látsz és mit vártál helyette. Csak a releváns részről készíts képet — a teljes oldalas kép sokba kerül és keveset mond.",
  },
  {
    date: "2026. 09.",
    title: "A kontextus a legdrágább erőforrásod",
    body: "Nem a kimenet kerül sokba, hanem az, hogy minden üzenetnél viszed magaddal az egész előzményt. Ezért olcsó a pontos prompt, és drága a felderítés, a hosszú szál és a teljes képernyős képernyőkép. Feladatonként új beszélgetés.",
  },
];
