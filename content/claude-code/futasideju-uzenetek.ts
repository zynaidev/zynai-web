/**
 * Futásidejű üzenetek (tárolási hibák, visszatöltés eredménye).
 *
 * Forrás: content/claude-code/prompt-epito.md, 4. szakasz,
 * "Futásidejű üzenetek".
 */

export const STORAGE_UNAVAILABLE_MESSAGE =
  "A mentés jelenleg nem érhető el ebben a böngészőben.";

export const SAVE_FAILED_MESSAGE =
  "A mentés nem sikerült — valószínűleg megtelt a böngésző tárhelye, vagy le van tiltva.";

export const IMPORT_UNREADABLE_MESSAGE =
  "A fájl nem olvasható be, vagy a mentés nem sikerült.";

export function formatImportResultMessage(
  imported: number,
  skipped: number,
): string {
  return `${imported} bejegyzés hozzáadva, ${skipped} kihagyva.`;
}
