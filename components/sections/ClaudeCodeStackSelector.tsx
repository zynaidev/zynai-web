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
    <>
      <h2 id={headingId}>Milyen projekten dolgozol?</h2>
      <fieldset aria-labelledby={headingId}>
        <ul>
          <li>
            <input
              checked={stack === "nextjs"}
              id={nextjsId}
              name={groupName}
              onChange={() => onStackChange("nextjs")}
              type="radio"
              value="nextjs"
            />
            <h3>
              <label htmlFor={nextjsId}>Next.js projekt</label>
            </h3>
            <p>
              Next.js App Router, TypeScript, Tailwind. A generált prompt a
              `src/app/` szerkezettel és a `npm run build` ellenőrzéssel
              dolgozik.
            </p>
          </li>
          <li>
            <input
              checked={stack === "generic"}
              id={genericId}
              name={groupName}
              onChange={() => onStackChange("generic")}
              type="radio"
              value="generic"
            />
            <h3>
              <label htmlFor={genericId}>Bármilyen más projekt</label>
            </h3>
            <p>
              Sima HTML/CSS/JS, Python, WordPress, vagy bármi más. A
              generált prompt nem feltételez keretrendszert, és a build
              helyett a te ellenőrzési módodat kéri.
            </p>
          </li>
        </ul>
      </fieldset>
      <p>Ha nem tudod, melyiket válaszd, a másodikat válaszd. Az mindenhol működik.</p>
    </>
  );
}
