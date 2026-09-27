"use client";

import type { ChangeEvent } from "react";
import { useEffect, useId, useRef } from "react";

import type { StackChoice } from "@/components/sections/ClaudeCodeStackSelector";
import type {
  ChoicePromptType,
  FieldsPromptType,
  PromptField,
  PromptFieldPlaceholder,
  PromptType,
} from "@/content/claude-code/prompt-tipusok";

const fieldControlClass =
  "w-full rounded-md border border-border-default bg-bg-base px-4 py-3 text-text-primary placeholder:text-text-tertiary outline-none focus:border-accent";

function resolvePlaceholder(
  placeholder: PromptFieldPlaceholder,
  stack: StackChoice,
): string {
  return typeof placeholder === "string" ? placeholder : placeholder[stack];
}

type AutoGrowTextareaProps = {
  "aria-describedby"?: string;
  id: string;
  onChange: (value: string) => void;
  placeholder: string;
  value: string;
};

function AutoGrowTextarea({
  id,
  onChange,
  placeholder,
  value,
  "aria-describedby": ariaDescribedBy,
}: AutoGrowTextareaProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);

  return (
    <textarea
      aria-describedby={ariaDescribedBy}
      className={`${fieldControlClass} resize-none overflow-hidden`}
      id={id}
      onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
        onChange(event.target.value)
      }
      placeholder={placeholder}
      ref={ref}
      rows={1}
      value={value}
    />
  );
}

type ClaudeCodeFormFieldProps = {
  field: PromptField;
  onChange: (value: string) => void;
  stack: StackChoice;
  value: string;
};

function ClaudeCodeFormField({
  field,
  onChange,
  stack,
  value,
}: ClaudeCodeFormFieldProps) {
  const inputId = useId();
  const helpId = useId();
  const placeholder = resolvePlaceholder(field.placeholder, stack);

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-text-primary" htmlFor={inputId}>
        {field.label}
        {field.optional ? (
          <span className="text-text-tertiary"> (opcionális)</span>
        ) : null}
      </label>
      {field.inputType === "textarea" ? (
        <AutoGrowTextarea
          aria-describedby={field.help ? helpId : undefined}
          id={inputId}
          onChange={onChange}
          placeholder={placeholder}
          value={value}
        />
      ) : (
        <input
          aria-describedby={field.help ? helpId : undefined}
          className={fieldControlClass}
          id={inputId}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            onChange(event.target.value)
          }
          placeholder={placeholder}
          type="text"
          value={value}
        />
      )}
      {field.help ? (
        <p className="text-sm text-text-tertiary" id={helpId}>
          {field.help}
        </p>
      ) : null}
    </div>
  );
}

function ClaudeCodeManualChecksNote() {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-medium text-text-tertiary">
        Amire nem figyelmeztet
      </h3>
      <p className="text-sm text-text-tertiary">
        Ezt a kettőt nem tudja automatikusan észrevenni — ezekre neked kell
        figyelned.
      </p>
      <p className="text-sm text-text-tertiary">
        <strong className="font-medium text-text-secondary">
          Két feladat egyben:
        </strong>{" "}
        Úgy tűnik, két dolgot kérsz egyszerre. Bontsd ketté: egy prompt, egy
        változás, egy mentés. Ha egy kérésből nem lesz egyetlen értelmes
        mentés, túl nagy volt.
      </p>
      <p className="text-sm text-text-tertiary">
        <strong className="font-medium text-text-secondary">
          Túl rövid leírás:
        </strong>{" "}
        Ez a leírás valószínűleg nem elég ahhoz, hogy azt kapd, amire
        gondolsz. Írd le, mi történik most, és minek kellene történnie
        helyette.
      </p>
    </div>
  );
}

type ClaudeCodeFieldsFormProps = {
  fieldValues: readonly string[];
  onFieldValuesChange: (values: string[]) => void;
  stack: StackChoice;
  type: FieldsPromptType;
};

function ClaudeCodeFieldsForm({
  fieldValues,
  onFieldValuesChange,
  stack,
  type,
}: ClaudeCodeFieldsFormProps) {
  return (
    <div className="flex flex-col gap-6">
      {type.fields.map((field, index) => (
        <ClaudeCodeFormField
          field={field}
          key={index}
          onChange={(value) => {
            const next = fieldValues.slice();
            next[index] = value;
            onFieldValuesChange(next);
          }}
          stack={stack}
          value={fieldValues[index] ?? ""}
        />
      ))}
      <ClaudeCodeManualChecksNote />
    </div>
  );
}

type ClaudeCodeChoiceFormProps = {
  onSelectOption: (id: string) => void;
  selectedOptionId: string | null;
  type: ChoicePromptType;
};

function ClaudeCodeChoiceForm({
  onSelectOption,
  selectedOptionId,
  type,
}: ClaudeCodeChoiceFormProps) {
  const groupName = useId();

  return (
    <fieldset className="flex flex-col gap-4">
      <legend className="type-card-heading">{type.choiceLabel}</legend>
      <ul className="flex flex-col gap-3 sm:flex-row">
        {type.options.map((option) => {
          const inputId = `${groupName}-${option.id}`;
          return (
            <li
              className="flex-1 rounded-lg border border-border-hairline bg-bg-elevated has-[:checked]:border-accent has-[:checked]:bg-bg-glass-strong"
              key={option.id}
            >
              <label
                className="flex h-full cursor-pointer items-center gap-3 p-card-mobile md:p-card-desktop"
                htmlFor={inputId}
              >
                <input
                  checked={selectedOptionId === option.id}
                  className="size-4 shrink-0 accent-accent"
                  id={inputId}
                  name={groupName}
                  onChange={() => onSelectOption(option.id)}
                  type="radio"
                  value={option.id}
                />
                <span className="text-sm font-medium text-text-primary">
                  {option.label}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
}

type ClaudeCodePromptFormProps = {
  fieldValues: readonly string[];
  onFieldValuesChange: (values: string[]) => void;
  onSelectOption: (id: string) => void;
  selectedOptionId: string | null;
  stack: StackChoice;
  type: PromptType;
};

export function ClaudeCodePromptForm({
  fieldValues,
  onFieldValuesChange,
  onSelectOption,
  selectedOptionId,
  stack,
  type,
}: ClaudeCodePromptFormProps) {
  if (type.kind === "choice") {
    return (
      <ClaudeCodeChoiceForm
        onSelectOption={onSelectOption}
        selectedOptionId={selectedOptionId}
        type={type}
      />
    );
  }

  return (
    <ClaudeCodeFieldsForm
      fieldValues={fieldValues}
      onFieldValuesChange={onFieldValuesChange}
      stack={stack}
      type={type}
    />
  );
}
