"use client";

import type { ChangeEvent } from "react";
import { useState, useSyncExternalStore } from "react";

import { promptTypes } from "@/content/claude-code/prompt-tipusok";
import {
  deleteSavedPrompt,
  exportSavedPromptsAsJson,
  getSavedPromptsServerSnapshot,
  getSavedPromptsSnapshot,
  getStorageAvailableServerSnapshot,
  getStorageAvailableSnapshot,
  importSavedPrompts,
  subscribeToSavedPrompts,
  type SavedPromptEntry,
} from "@/lib/claude-code-saved-prompts";

type ClaudeCodeSavedPromptsProps = {
  onLoad: (entry: SavedPromptEntry) => void;
};

function formatSavedAt(savedAt: number): string {
  return new Date(savedAt).toLocaleDateString("hu-HU");
}

function typeName(typeId: string): string {
  return promptTypes.find((type) => type.id === typeId)?.name ?? typeId;
}

export function ClaudeCodeSavedPrompts({ onLoad }: ClaudeCodeSavedPromptsProps) {
  const entries = useSyncExternalStore(
    subscribeToSavedPrompts,
    getSavedPromptsSnapshot,
    getSavedPromptsServerSnapshot,
  );
  const storageOk = useSyncExternalStore(
    subscribeToSavedPrompts,
    getStorageAvailableSnapshot,
    getStorageAvailableServerSnapshot,
  );
  const [importMessage, setImportMessage] = useState<string | null>(null);

  function handleDelete(id: string) {
    deleteSavedPrompt(id);
  }

  function handleDownload() {
    const json = exportSavedPromptsAsJson(entries);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "claude-code-promptok.json";
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  }

  async function handleUploadChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    const text = await file.text();
    const validTypeIds = promptTypes.map((type) => type.id);
    const result = importSavedPrompts(text, entries, validTypeIds);

    if (!result) {
      setImportMessage("A fájl nem olvasható be, vagy a mentés nem sikerült.");
      return;
    }

    setImportMessage(
      `${result.imported} bejegyzés hozzáadva, ${result.skipped} kihagyva.`,
    );
  }

  const sorted = entries.slice().sort((a, b) => b.savedAt - a.savedAt);

  return (
    <div>
      <h2>Saját promptjaim</h2>

      {!storageOk ? (
        <p>A mentés jelenleg nem érhető el ebben a böngészőben.</p>
      ) : null}

      {sorted.length === 0 ? (
        <p>
          Még nincs mentett promptod. Ha összeállítasz egyet, amit többször is
          használnál, mentsd el — a saját gépeden marad.
        </p>
      ) : (
        <ul>
          {sorted.map((entry) => (
            <li key={entry.id}>
              <span>
                {typeName(entry.typeId)} — {formatSavedAt(entry.savedAt)}
              </span>
              <button onClick={() => onLoad(entry)} type="button">
                Betöltés
              </button>
              <button
                disabled={!storageOk}
                onClick={() => handleDelete(entry.id)}
                type="button"
              >
                Törlés
              </button>
            </li>
          ))}
        </ul>
      )}

      <button
        disabled={entries.length === 0}
        onClick={handleDownload}
        type="button"
      >
        Letöltés JSON-ban
      </button>

      <label>
        Visszatöltés fájlból
        <input
          accept="application/json"
          disabled={!storageOk}
          onChange={handleUploadChange}
          type="file"
        />
      </label>

      {importMessage ? <p>{importMessage}</p> : null}
    </div>
  );
}
