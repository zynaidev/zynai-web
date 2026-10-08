"use client";

import type { ComponentProps } from "react";

import { track } from "@/lib/analytics/track";

type MailtoLinkProps = Omit<ComponentProps<"a">, "href"> & {
  /** Az e-mail-cím, `mailto:` előtag nélkül. */
  email: string;
};

/** `mailto:` link, amely kattintáskor `email_click` eseményt küld. A címet nem. */
export function MailtoLink({ email, onClick, ...props }: MailtoLinkProps) {
  return (
    <a
      {...props}
      href={`mailto:${email}`}
      onClick={(e) => {
        track("email_click", {});
        onClick?.(e);
      }}
    />
  );
}
