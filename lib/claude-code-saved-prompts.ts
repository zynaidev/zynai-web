import type { StackChoice } from "@/components/sections/ClaudeCodeStackSelector";

export type SavedPromptEntry = {
  fieldValues: string[];
  id: string;
  savedAt: number;
  selectedOptionId: string | null;
  stack: StackChoice;
  typeId: string;
};

const STORAGE_KEY = "claude-code-saved-prompts";
const EMPTY_ENTRIES: readonly SavedPromptEntry[] = [];

function hasWindow(): boolean {
  return typeof window !== "undefined";
}

function computeStorageAvailable(): boolean {
  if (!hasWindow()) return false;
  try {
    const testKey = `${STORAGE_KEY}:availability-check`;
    window.localStorage.setItem(testKey, "1");
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

function isValidEntryShape(value: unknown): value is SavedPromptEntry {
  if (typeof value !== "object" || value === null) return false;
  const entry = value as Record<string, unknown>;
  return (
    typeof entry.id === "string" &&
    typeof entry.typeId === "string" &&
    (entry.stack === "nextjs" || entry.stack === "generic") &&
    Array.isArray(entry.fieldValues) &&
    entry.fieldValues.every((item) => typeof item === "string") &&
    (entry.selectedOptionId === null ||
      typeof entry.selectedOptionId === "string") &&
    typeof entry.savedAt === "number"
  );
}

function readEntriesFromStorage(): SavedPromptEntry[] {
  if (!hasWindow()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isValidEntryShape) : [];
  } catch {
    return [];
  }
}

// A minimal external store: components read it through useSyncExternalStore
// so the server render and the first client render both use the fixed
// snapshots below (empty list, storage assumed available), and the real
// browser state is picked up right after hydration — with no effect-driven
// setState needed.
let cachedEntries: SavedPromptEntry[] | null = null;
let cachedAvailable: boolean | null = null;
const listeners = new Set<() => void>();

function notifyChange(): void {
  cachedEntries = readEntriesFromStorage();
  listeners.forEach((listener) => listener());
}

export function subscribeToSavedPrompts(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSavedPromptsSnapshot(): readonly SavedPromptEntry[] {
  if (cachedEntries === null) {
    cachedEntries = readEntriesFromStorage();
  }
  return cachedEntries;
}

export function getSavedPromptsServerSnapshot(): readonly SavedPromptEntry[] {
  return EMPTY_ENTRIES;
}

export function getStorageAvailableSnapshot(): boolean {
  if (cachedAvailable === null) {
    cachedAvailable = computeStorageAvailable();
  }
  return cachedAvailable;
}

export function getStorageAvailableServerSnapshot(): boolean {
  return true;
}

function persist(entries: SavedPromptEntry[]): boolean {
  if (!hasWindow()) return false;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    notifyChange();
    return true;
  } catch {
    cachedAvailable = false;
    listeners.forEach((listener) => listener());
    return false;
  }
}

function createId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export function addSavedPrompt(
  entry: Omit<SavedPromptEntry, "id" | "savedAt">,
): SavedPromptEntry[] | null {
  const existing = readEntriesFromStorage();
  const next = [...existing, { ...entry, id: createId(), savedAt: Date.now() }];
  return persist(next) ? next : null;
}

export function deleteSavedPrompt(id: string): SavedPromptEntry[] | null {
  const next = readEntriesFromStorage().filter((entry) => entry.id !== id);
  return persist(next) ? next : null;
}

export function exportSavedPromptsAsJson(
  entries: readonly SavedPromptEntry[],
): string {
  return JSON.stringify(entries, null, 2);
}

export function importSavedPrompts(
  fileContents: string,
  existing: readonly SavedPromptEntry[],
  validTypeIds: readonly string[],
): { entries: SavedPromptEntry[]; imported: number; skipped: number } | null {
  let parsed: unknown;
  try {
    parsed = JSON.parse(fileContents);
  } catch {
    return null;
  }
  if (!Array.isArray(parsed)) return null;

  let skipped = 0;
  const imported: SavedPromptEntry[] = [];
  for (const item of parsed) {
    if (!isValidEntryShape(item) || !validTypeIds.includes(item.typeId)) {
      skipped += 1;
      continue;
    }
    imported.push({ ...item, id: createId() });
  }

  const merged = [...existing, ...imported];
  if (!persist(merged)) return null;

  return { entries: merged, imported: imported.length, skipped };
}
