"use client";

import { useId } from "react";

import { promptTypes } from "@/content/claude-code/prompt-tipusok";

type ClaudeCodeTypeSelectorProps = {
  onSelect: (id: string) => void;
  selectedId: string | null;
};

export function ClaudeCodeTypeSelector({
  onSelect,
  selectedId,
}: ClaudeCodeTypeSelectorProps) {
  const groupName = useId();
  const selected = promptTypes.find((type) => type.id === selectedId) ?? null;

  return (
    <fieldset>
      <ul>
        {promptTypes.map((type) => {
          const inputId = `${groupName}-${type.id}`;
          return (
            <li key={type.id}>
              <input
                checked={selectedId === type.id}
                id={inputId}
                name={groupName}
                onChange={() => onSelect(type.id)}
                type="radio"
                value={type.id}
              />
              <label htmlFor={inputId}>{type.name}</label>
            </li>
          );
        })}
      </ul>
      {selected ? (
        <div>
          <p>{selected.name}</p>
          <p>{selected.whenToUse}</p>
        </div>
      ) : null}
    </fieldset>
  );
}
