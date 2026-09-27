"use client";

import type { ChangeEvent } from "react";
import { useState, useSyncExternalStore } from "react";

import {
  IMPORT_UNREADABLE_MESSAGE,
  STORAGE_UNAVAILABLE_MESSAGE,
  formatImportResultMessage,
} from "@/content/claude-code/futasideju-uzenetek";
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

const secondaryButtonClass =
  "inline-flex items-center justify-center rounded-md border border-border-default bg-bg-elevated px-4 py-2 text-sm font-medium text-text-primary hover:border-border-accent disabled:cursor-not-allowed disabled:opacity-50";

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
      setImportMessage(IMPORT_UNREADABLE_MESSAGE);
      return;
    }

    setImportMessage(formatImportResultMessage(result.imported, result.skipped));
  }

  const sorted = entries.slice().sort((a, b) => b.savedAt - a.savedAt);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="type-card-heading">Saját promptjaim</h2>

      {!storageOk ? (
        <p className="text-sm text-text-tertiary">
          {STORAGE_UNAVAILABLE_MESSAGE}
        </p>
      ) : null}

      {sorted.length === 0 ? (
        <p className="type-body">
          Még nincs mentett promptod. Ha összeállítasz egyet, amit többször is
          használnál, mentsd el — a saját gépeden marad.
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {sorted.map((entry) => (
            <li
              className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border-hairline bg-bg-elevated px-4 py-3"
              key={entry.id}
            >
              <span className="text-sm text-text-primary">
                {typeName(entry.typeId)} — {formatSavedAt(entry.savedAt)}
              </span>
              <span className="flex gap-2">
                <button
                  className={secondaryButtonClass}
                  onClick={() => onLoad(entry)}
                  type="button"
                >
                  Betöltés
                </button>
                <button
                  className={secondaryButtonClass}
                  disabled={!storageOk}
                  onClick={() => handleDelete(entry.id)}
                  type="button"
                >
                  Törlés
                </button>
              </span>
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <button
          className={secondaryButtonClass}
          disabled={entries.length === 0}
          onClick={handleDownload}
          type="button"
        >
          Letöltés JSON-ban
        </button>

        <label
          className={`${secondaryButtonClass} cursor-pointer${
            storageOk ? "" : " cursor-not-allowed opacity-50"
          }`}
        >
          Visszatöltés fájlból
          <input
            accept="application/json"
            className="sr-only"
            disabled={!storageOk}
            onChange={handleUploadChange}
            type="file"
          />
        </label>
      </div>

      {importMessage ? (
        <p className="text-sm text-text-tertiary">{importMessage}</p>
      ) : null}
    </div>
  );
}
