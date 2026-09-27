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
    <div>
      <label htmlFor={inputId}>
        {field.label}
        {field.optional ? " (opcionális)" : null}
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
          id={inputId}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            onChange(event.target.value)
          }
          placeholder={placeholder}
          type="text"
          value={value}
        />
      )}
      {field.help ? <p id={helpId}>{field.help}</p> : null}
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
    <div>
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
    <fieldset>
      <legend>{type.choiceLabel}</legend>
      <ul>
        {type.options.map((option) => {
          const inputId = `${groupName}-${option.id}`;
          return (
            <li key={option.id}>
              <input
                checked={selectedOptionId === option.id}
                id={inputId}
                name={groupName}
                onChange={() => onSelectOption(option.id)}
                type="radio"
                value={option.id}
              />
              <label htmlFor={inputId}>{option.label}</label>
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
