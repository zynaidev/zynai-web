"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function CodeBlock({
  code,
  language,
}: {
  code: string;
  language?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard access denied or unavailable — no-op
    }
  }

  return (
    <div
      className="my-10 overflow-hidden rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)]"
    >
      <div className="flex items-center justify-between border-b border-[var(--border-hairline)] px-4 py-2.5">
        <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--text-tertiary)]">
          {language || "kód"}
        </span>
        <button
          aria-label="Kód másolása"
          className="flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--text-tertiary)] transition-colors duration-200 hover:text-[var(--text-primary)]"
          onClick={handleCopy}
          type="button"
        >
          {copied ? (
            <>
              <Check aria-hidden size={12} />
              Másolva
            </>
          ) : (
            <>
              <Copy aria-hidden size={12} />
              Másolás
            </>
          )}
        </button>
      </div>
      <div className="overflow-x-auto">
        <pre className="min-w-full px-5 py-4">
          <code className="font-mono text-[13px] leading-[1.7] text-[var(--text-secondary)]">
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
}
