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
  const headingId = useId();
  const selected = promptTypes.find((type) => type.id === selectedId) ?? null;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="type-card-heading" id={headingId}>
        Prompt típusa
      </h2>
      <fieldset aria-labelledby={headingId}>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {promptTypes.map((type) => {
            const inputId = `${groupName}-${type.id}`;
            return (
              <li
                className="rounded-lg border border-border-hairline bg-bg-elevated has-[:checked]:border-accent has-[:checked]:bg-bg-glass-strong"
                key={type.id}
              >
                <label
                  className="flex min-w-0 cursor-pointer items-center gap-2 px-4 py-3"
                  htmlFor={inputId}
                >
                  <input
                    checked={selectedId === type.id}
                    className="size-4 shrink-0 accent-accent"
                    id={inputId}
                    name={groupName}
                    onChange={() => onSelect(type.id)}
                    type="radio"
                    value={type.id}
                  />
                  <span className="min-w-0 font-display text-sm font-medium text-text-primary">
                    {type.name}
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      </fieldset>
      {selected ? (
        <div className="rounded-lg border border-border-hairline bg-bg-elevated p-card-mobile md:p-card-desktop">
          <p className="type-card-heading">{selected.name}</p>
          <p className="type-body mt-2">{selected.whenToUse}</p>
        </div>
      ) : null}
    </div>
  );
}
