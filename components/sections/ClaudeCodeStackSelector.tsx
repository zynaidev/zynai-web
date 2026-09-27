"use client";

import { useId } from "react";

export type StackChoice = "nextjs" | "generic";

type ClaudeCodeStackSelectorProps = {
  onStackChange: (stack: StackChoice) => void;
  stack: StackChoice;
};

export function ClaudeCodeStackSelector({
  onStackChange,
  stack,
}: ClaudeCodeStackSelectorProps) {
  const groupName = useId();
  const headingId = useId();
  const nextjsId = useId();
  const genericId = useId();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="type-card-heading" id={headingId}>
        Milyen projekten dolgozol?
      </h2>
      <fieldset aria-labelledby={headingId}>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <li className="rounded-lg border border-border-hairline bg-bg-elevated has-[:checked]:border-accent has-[:checked]:bg-bg-glass-strong">
            <label
              className="flex cursor-pointer flex-col gap-3 p-card-mobile md:p-card-desktop"
              htmlFor={nextjsId}
            >
              <input
                checked={stack === "nextjs"}
                className="size-4 accent-accent"
                id={nextjsId}
                name={groupName}
                onChange={() => onStackChange("nextjs")}
                type="radio"
                value="nextjs"
              />
              <h3 className="type-card-heading">Next.js projekt</h3>
              <p className="type-body">
                Next.js App Router, TypeScript, Tailwind. A generált prompt a
                `src/app/` szerkezettel és a `npm run build` ellenőrzéssel
                dolgozik.
              </p>
            </label>
          </li>
          <li className="rounded-lg border border-border-hairline bg-bg-elevated has-[:checked]:border-accent has-[:checked]:bg-bg-glass-strong">
            <label
              className="flex cursor-pointer flex-col gap-3 p-card-mobile md:p-card-desktop"
              htmlFor={genericId}
            >
              <input
                checked={stack === "generic"}
                className="size-4 accent-accent"
                id={genericId}
                name={groupName}
                onChange={() => onStackChange("generic")}
                type="radio"
                value="generic"
              />
              <h3 className="type-card-heading">Bármilyen más projekt</h3>
              <p className="type-body">
                Sima HTML/CSS/JS, Python, WordPress, vagy bármi más. A
                generált prompt nem feltételez keretrendszert, és a build
                helyett a te ellenőrzési módodat kéri.
              </p>
            </label>
          </li>
        </ul>
      </fieldset>
      <p className="type-body text-text-tertiary">
        Ha nem tudod, melyiket válaszd, a másodikat válaszd. Az mindenhol működik.
      </p>
    </div>
  );
}
