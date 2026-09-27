"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import { ClaudeCodePromptForm } from "@/components/sections/ClaudeCodePromptForm";
import { ClaudeCodeSavedPrompts } from "@/components/sections/ClaudeCodeSavedPrompts";
import {
  ClaudeCodeStackSelector,
  type StackChoice,
} from "@/components/sections/ClaudeCodeStackSelector";
import { ClaudeCodeTypeSelector } from "@/components/sections/ClaudeCodeTypeSelector";
import { Container } from "@/components/ui/container";
import { promptTypes } from "@/content/claude-code/prompt-tipusok";
import {
  assembleClaudeCodePrompt,
  detectClaudeCodeWarnings,
} from "@/lib/claude-code-prompt-assembly";
import {
  addSavedPrompt,
  getStorageAvailableServerSnapshot,
  getStorageAvailableSnapshot,
  subscribeToSavedPrompts,
  type SavedPromptEntry,
} from "@/lib/claude-code-saved-prompts";

const EMPTY_STATE_TEXT =
  "Válassz egy típust fent, töltsd ki a mezőket, és itt megjelenik a kész prompt.";

export function ClaudeCodePromptBuilder() {
  const [stack, setStack] = useState<StackChoice>("generic");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [fieldValues, setFieldValues] = useState<string[]>([]);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(
    null,
  );
  const [copyLabel, setCopyLabel] = useState<"Kimásolva" | "Másolás">(
    "Másolás",
  );
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [resetForId, setResetForId] = useState<string | null>(null);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const storageAvailable = useSyncExternalStore(
    subscribeToSavedPrompts,
    getStorageAvailableSnapshot,
    getStorageAvailableServerSnapshot,
  );

  const selectedType =
    promptTypes.find((type) => type.id === selectedId) ?? null;

  if (resetForId !== selectedId) {
    setResetForId(selectedId);
    setFieldValues(
      selectedType && selectedType.kind === "fields"
        ? selectedType.fields.map(() => "")
        : [],
    );
    setSelectedOptionId(null);
    setCopyLabel("Másolás");
  }

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    };
  }, []);

  const assembled = selectedType
    ? assembleClaudeCodePrompt({
        fieldValues,
        selectedOptionId,
        stack,
        type: selectedType,
      })
    : null;
  const warnings = selectedType
    ? detectClaudeCodeWarnings(selectedType, fieldValues)
    : [];

  async function handleCopy() {
    if (!assembled) return;
    await navigator.clipboard.writeText(assembled);
    setCopyLabel("Kimásolva");
    if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    copyTimeoutRef.current = setTimeout(() => setCopyLabel("Másolás"), 2000);
  }

  function handleSave() {
    if (!selectedType || !assembled) return;
    const result = addSavedPrompt({
      fieldValues,
      selectedOptionId,
      stack,
      typeId: selectedType.id,
    });
    if (result) {
      setSaveMessage(null);
    } else {
      setSaveMessage(
        "A mentés nem sikerült — valószínűleg megtelt a böngésző tárhelye, vagy le van tiltva.",
      );
    }
  }

  function handleLoadEntry(entry: SavedPromptEntry) {
    const type = promptTypes.find((candidate) => candidate.id === entry.typeId);
    if (!type) return;

    const nextFieldValues =
      type.kind === "fields"
        ? type.fields.map((_, index) => entry.fieldValues[index] ?? "")
        : [];
    const nextSelectedOptionId =
      type.kind === "choice" &&
      type.options.some((option) => option.id === entry.selectedOptionId)
        ? entry.selectedOptionId
        : null;

    setSelectedId(entry.typeId);
    setResetForId(entry.typeId);
    setStack(entry.stack);
    setFieldValues(nextFieldValues);
    setSelectedOptionId(nextSelectedOptionId);
    setCopyLabel("Másolás");
    setSaveMessage(null);
  }

  return (
    <>
      <section>
        <Container>
          <ClaudeCodeStackSelector onStackChange={setStack} stack={stack} />
        </Container>
      </section>

      <section>
        <Container>
          <ClaudeCodeTypeSelector
            onSelect={setSelectedId}
            selectedId={selectedId}
          />
        </Container>
      </section>

      <section>
        <Container>
          {selectedType ? (
            <ClaudeCodePromptForm
              fieldValues={fieldValues}
              onFieldValuesChange={setFieldValues}
              onSelectOption={setSelectedOptionId}
              selectedOptionId={selectedOptionId}
              stack={stack}
              type={selectedType}
            />
          ) : (
            <p>{EMPTY_STATE_TEXT}</p>
          )}
        </Container>
      </section>

      <section>
        <Container>
          {assembled ? (
            <>
              {warnings.length > 0 ? (
                <div>
                  <h2>Figyelmeztetések</h2>
                  <ul>
                    {warnings.map((warning) => (
                      <li key={warning.id}>
                        <strong>{warning.title}</strong> {warning.text}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              <pre>{assembled}</pre>
              <button onClick={handleCopy} type="button">
                {copyLabel}
              </button>
              {storageAvailable ? (
                <button onClick={handleSave} type="button">
                  Mentés a sajátjaim közé
                </button>
              ) : (
                <p>A mentés jelenleg nem érhető el ebben a böngészőben.</p>
              )}
              {saveMessage ? <p>{saveMessage}</p> : null}
            </>
          ) : (
            <p>{EMPTY_STATE_TEXT}</p>
          )}
        </Container>
      </section>

      <section>
        <Container>
          <ClaudeCodeSavedPrompts onLoad={handleLoadEntry} />
        </Container>
      </section>
    </>
  );
}
