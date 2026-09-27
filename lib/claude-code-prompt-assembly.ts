import type { StackChoice } from "@/components/sections/ClaudeCodeStackSelector";
import type {
  ChoicePromptType,
  FieldsPromptType,
  PromptType,
} from "@/content/claude-code/prompt-tipusok";

type ConditionalRule = {
  fieldIndex: number;
  find: { generic: string; nextjs: string };
  includeWhen: "absent" | "present";
};

type ValueToken = {
  fieldIndex: number;
  token: string;
};

type TypeAssemblyConfig = {
  conditionals?: readonly ConditionalRule[];
  valueTokens: readonly ValueToken[];
};

const ASSEMBLY_CONFIG: Record<string, TypeAssemblyConfig> = {
  modositas: {
    valueTokens: [
      { fieldIndex: 0, token: "fájl útvonala" },
      { fieldIndex: 1, token: "mi történik most" },
      { fieldIndex: 2, token: "minek kellene történnie" },
    ],
    conditionals: [
      {
        fieldIndex: 3,
        includeWhen: "present",
        find: {
          nextjs:
            "[ha van szövegzár] Keep all copy exactly as it is. Do not rewrite,\nshorten or re-punctuate any user-facing text.",
          generic: "[ha van szövegzár] Keep all copy exactly as it is.",
        },
      },
    ],
  },
  terv: {
    valueTokens: [
      { fieldIndex: 0, token: "mit szeretnél elérni" },
      { fieldIndex: 1, token: "amihez ne nyúljon" },
      { fieldIndex: 2, token: "megkötések" },
    ],
    conditionals: [
      {
        fieldIndex: 1,
        includeWhen: "present",
        find: {
          nextjs: "[ha van] Do not touch: [amihez ne nyúljon]",
          generic: "[ha van] Do not touch: [amihez ne nyúljon]",
        },
      },
      {
        fieldIndex: 2,
        includeWhen: "present",
        find: {
          nextjs: "[ha van] Constraints: [megkötések]",
          generic: "[ha van] Constraints: [megkötések]",
        },
      },
    ],
  },
  hibajavitas: {
    valueTokens: [
      { fieldIndex: 0, token: "fájl útvonala" },
      { fieldIndex: 1, token: "a teljes hibaüzenet" },
      { fieldIndex: 2, token: "mit csináltatok előtte" },
    ],
    conditionals: [
      {
        fieldIndex: 0,
        includeWhen: "present",
        find: {
          nextjs: "[ha megadta] Modify ONLY [fájl útvonala].\n",
          generic: "[ha megadta] Modify ONLY [fájl útvonala].\n",
        },
      },
      {
        fieldIndex: 0,
        includeWhen: "absent",
        find: {
          nextjs:
            "[ha nem adta meg] Find the cause first. Do not modify anything\nuntil you have told me where the problem is.\n",
          generic:
            "[ha nem adta meg] Find the cause first. Do not modify anything\nuntil you have told me where the problem is.\n",
        },
      },
    ],
  },
  diagnosztika: {
    valueTokens: [
      { fieldIndex: 0, token: "mit olvasson el" },
      { fieldIndex: 1, token: "kérdések, soronként egy felsorolásponttal" },
    ],
  },
  "uj-fajl": {
    valueTokens: [
      { fieldIndex: 0, token: "útvonal" },
      { fieldIndex: 1, token: "számozott lista" },
      { fieldIndex: 2, token: "szövegfájl" },
    ],
    conditionals: [
      {
        fieldIndex: 2,
        includeWhen: "present",
        find: {
          nextjs:
            "[ha van szövegfájl] Copy: verbatim from [szövegfájl] — read that\none file only. Do not translate, rewrite or re-punctuate.\nIf something is missing from that file, stop and tell me.",
          generic:
            "[ha van szövegfájl] Copy: verbatim from [szövegfájl].\nDo not translate, rewrite or re-punctuate.",
        },
      },
      {
        fieldIndex: 2,
        includeWhen: "absent",
        find: {
          nextjs:
            "[ha nincs] Use short placeholder text and mark clearly where\nreal copy is needed.",
          generic:
            "[ha nincs] Use short placeholder text and mark clearly where\nreal copy is needed.",
        },
      },
    ],
  },
  megjelenes: {
    valueTokens: [
      { fieldIndex: 0, token: "fájl útvonala" },
      { fieldIndex: 1, token: "hogyan nézzen ki" },
      { fieldIndex: 2, token: "mit ne csináljon" },
    ],
    conditionals: [
      {
        fieldIndex: 2,
        includeWhen: "present",
        find: {
          nextjs: "[ha van tiltás] Do not: [mit ne csináljon]",
          generic: "[ha van tiltás] Do not: [mit ne csináljon]",
        },
      },
    ],
  },
  szoveg: {
    valueTokens: [
      { fieldIndex: 0, token: "fájl útvonala" },
      { fieldIndex: 1, token: "szövegfájl" },
    ],
  },
  atnezes: {
    valueTokens: [
      { fieldIndex: 0, token: "mit nézzen át" },
      { fieldIndex: 1, token: "amit megadott" },
    ],
    conditionals: [
      {
        fieldIndex: 1,
        includeWhen: "present",
        find: {
          nextjs: "[ha van] Intentionally public, do not flag: [amit megadott]",
          generic:
            "[ha van] Intentionally public, do not flag: [amit megadott]",
        },
      },
    ],
  },
  ujrakezdes: {
    valueTokens: [
      { fieldIndex: 0, token: "min dolgoztatok" },
      { fieldIndex: 1, token: "mi nem működött" },
      { fieldIndex: 2, token: "jelenlegi állapot" },
    ],
  },
};

function isFieldFilled(value: string | undefined): boolean {
  return (value ?? "").trim().length > 0;
}

function resolveConditional(
  template: string,
  rule: ConditionalRule,
  stack: StackChoice,
  fieldValues: readonly string[],
): string {
  const isPresent = isFieldFilled(fieldValues[rule.fieldIndex]);
  const shouldInclude = rule.includeWhen === "present" ? isPresent : !isPresent;
  const find = rule.find[stack];
  const replacement = shouldInclude
    ? find.replace(/^\[[^\]]+\]\s*/, "")
    : "";
  return template.replace(find, () => replacement);
}

function substituteValueTokens(
  template: string,
  tokens: readonly ValueToken[],
  fieldValues: readonly string[],
): string {
  return tokens.reduce((result, { fieldIndex, token }) => {
    const value = fieldValues[fieldIndex] ?? "";
    return result.split(`[${token}]`).join(value);
  }, template);
}

function collapseBlankLines(text: string): string {
  return text.replace(/\n{3,}/g, "\n\n").trim();
}

function assembleFieldsPrompt(
  type: FieldsPromptType,
  stack: StackChoice,
  fieldValues: readonly string[],
): string | null {
  const config = ASSEMBLY_CONFIG[type.id];
  if (!config) return null;

  const hasRequiredValue = type.fields.some(
    (field, index) => !field.optional && isFieldFilled(fieldValues[index]),
  );
  if (!hasRequiredValue) return null;

  let template = stack === "nextjs" ? type.promptNextjs : type.promptGeneric;

  for (const rule of config.conditionals ?? []) {
    template = resolveConditional(template, rule, stack, fieldValues);
  }

  template = substituteValueTokens(template, config.valueTokens, fieldValues);

  return collapseBlankLines(template);
}

function assembleChoicePrompt(
  type: ChoicePromptType,
  selectedOptionId: string | null,
): string | null {
  if (!selectedOptionId) return null;
  const option = type.options.find((candidate) => candidate.id === selectedOptionId);
  return option ? option.prompt : null;
}

export function assembleClaudeCodePrompt(input: {
  fieldValues: readonly string[];
  selectedOptionId: string | null;
  stack: StackChoice;
  type: PromptType;
}): string | null {
  const { fieldValues, selectedOptionId, stack, type } = input;

  if (type.kind === "choice") {
    return assembleChoicePrompt(type, selectedOptionId);
  }

  return assembleFieldsPrompt(type, stack, fieldValues);
}

export type PromptWarning = {
  id: string;
  text: string;
  title: string;
};

const DECISION_HANDOFF_PHRASES = ["döntsd el", "válaszd ki", "ahogy jónak látod"];

function looksLikeCategoryDescription(value: string): boolean {
  const trimmed = value.trim();
  if (trimmed.includes("/")) return false;
  if (/\.[a-zA-Z0-9]{1,5}$/.test(trimmed)) return false;
  return /\s/.test(trimmed);
}

export function detectClaudeCodeWarnings(
  type: PromptType,
  fieldValues: readonly string[],
): PromptWarning[] {
  if (type.kind === "choice") return [];

  const warnings: PromptWarning[] = [];

  const requiredPathFields = type.fields
    .map((field, index) => ({ field, index }))
    .filter(({ field }) => field.inputType === "text" && !field.optional);

  if (
    requiredPathFields.some(
      ({ index }) => !isFieldFilled(fieldValues[index]),
    )
  ) {
    warnings.push({
      id: "hianyzo-utvonal",
      title: "Hiányzó útvonal:",
      text: "Nem adtál meg pontos elérési utat. Enélkül az AI maga választja ki, melyik fájlhoz nyúl — és gyakran nem ahhoz, amire gondoltál.",
    });
  }

  if (
    requiredPathFields.some(({ index }) => {
      const value = fieldValues[index] ?? "";
      return isFieldFilled(value) && looksLikeCategoryDescription(value);
    })
  ) {
    warnings.push({
      id: "kategoria-utvonal-helyett",
      title: "Kategória útvonal helyett:",
      text: "Ez inkább kategóriának tűnik, mint fájlnak. Add meg a teljes elérési utat, például `src/components/layout/Header.tsx`.",
    });
  }

  if (
    type.fields.some((_, index) => {
      const value = (fieldValues[index] ?? "").toLowerCase();
      return DECISION_HANDOFF_PHRASES.some((phrase) => value.includes(phrase));
    })
  ) {
    warnings.push({
      id: "dontes-atengedese",
      title: "Döntés átengedése:",
      text: 'A leírásodban szerepel olyan szó, ami döntést enged át az AI-nak („döntsd el", „válaszd ki", „ahogy jónak látod"). Ilyenkor a drága munka rossz helyen történik. Döntsd el te, és írd le.',
    });
  }

  if (type.id === "hibajavitas" && !isFieldFilled(fieldValues[1])) {
    warnings.push({
      id: "hianyzo-hibauzenet",
      title: "Hiányzó hibaüzenet:",
      text: "Hibajavításhoz a teljes hibaüzenet kell, vágatlanul. A rövidített vagy átfogalmazott üzenetből az AI találgatni fog.",
    });
  }

  return warnings;
}
