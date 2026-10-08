import { Resend } from "resend";

import { painPointLabel } from "@/lib/contact-types";
import {
  findUnknownField,
  isHoneypotFilled,
  isRateLimited,
  isValidEmail,
  tooLong,
} from "@/lib/form-guard";

const ALLOWED_FIELDS = [
  "name",
  "email",
  "company",
  "website",
  "teamSize",
  "painPoints",
  "painPointOther",
  "aiStage",
  "availability",
  "privacyAccepted",
] as const;

function escapeHtml(value: unknown): string {
  if (value === null || value === undefined) return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatField(label: string, value: unknown): string {
  const display =
    value === null || value === undefined || value === ""
      ? "—"
      : typeof value === "boolean"
        ? value
          ? "Igen"
          : "Nem"
        : String(value);
  return `<tr><td style="padding:8px 12px;border-bottom:1px solid #e4e4e7;font-weight:600;color:#18181b;width:220px;vertical-align:top">${escapeHtml(label)}</td><td style="padding:8px 12px;border-bottom:1px solid #e4e4e7;color:#3f3f46">${escapeHtml(display)}</td></tr>`;
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail = process.env.CONTACT_FROM_EMAIL;
    if (!apiKey || !toEmail || !fromEmail) {
      const missing = [
        !apiKey && "RESEND_API_KEY",
        !toEmail && "CONTACT_TO_EMAIL",
        !fromEmail && "CONTACT_FROM_EMAIL",
      ].filter(Boolean);
      console.error(`[contact] Hiányzó környezeti változó: ${missing.join(", ")}`);
      return Response.json(
        { error: "Az e-mail küldése sikertelen volt." },
        { status: 500 },
      );
    }

    if (isRateLimited(req, "contact", 5, 10 * 60 * 1000)) {
      return Response.json(
        { error: "Túl sok próbálkozás. Kérlek, próbáld újra néhány perc múlva." },
        { status: 429 },
      );
    }

    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return Response.json({ error: "Érvénytelen JSON törzs." }, { status: 400 });
    }

    if (typeof body !== "object" || body === null || Array.isArray(body)) {
      return Response.json({ error: "Érvénytelen JSON törzs." }, { status: 400 });
    }

    // Bot: csendes "siker", e-mail és webhook nélkül.
    if (isHoneypotFilled(body)) {
      return Response.json({ success: true });
    }

    if (findUnknownField(body, ALLOWED_FIELDS)) {
      return Response.json({ error: "Ismeretlen mező a kérésben." }, { status: 400 });
    }

    const {
      name,
      email,
      company,
      website,
      teamSize,
      painPoints,
      painPointOther,
      aiStage,
      availability,
      privacyAccepted,
    } = body;

    const nameStr = typeof name === "string" ? name.trim() : "";
    const emailStr = typeof email === "string" ? email.trim() : "";
    const websiteStr = typeof website === "string" ? website.trim() : "";
    const painPointIds = Array.isArray(painPoints)
      ? painPoints.filter((p): p is string => typeof p === "string")
      : [];
    const painPointOtherStr =
      typeof painPointOther === "string" ? painPointOther.trim() : "";

    if (!nameStr || !emailStr || painPointIds.length === 0) {
      return Response.json(
        {
          error:
            "Hiányzó kötelező mezők: név, e-mail és legalább egy időrabló folyamat kötelező.",
        },
        { status: 400 },
      );
    }

    if (
      tooLong(nameStr, 200) ||
      tooLong(emailStr, 254) ||
      tooLong(company, 200) ||
      tooLong(websiteStr, 500) ||
      tooLong(teamSize, 100) ||
      tooLong(aiStage, 100) ||
      tooLong(availability, 500) ||
      tooLong(painPointOtherStr, 2000) ||
      painPointIds.length > 20 ||
      painPointIds.some((id) => id.length > 100)
    ) {
      return Response.json(
        { error: "Valamelyik mező túl hosszú. Kérlek, rövidítsd." },
        { status: 400 },
      );
    }

    if (!isValidEmail(emailStr)) {
      return Response.json(
        { error: "Kérlek, adj meg egy érvényes e-mail címet." },
        { status: 400 },
      );
    }

    if (privacyAccepted !== true) {
      return Response.json(
        { error: "Az adatvédelmi nyilatkozat elfogadása kötelező." },
        { status: 400 },
      );
    }

    const resend = new Resend(apiKey);

    const painPointLabels = painPointIds.map((id) => painPointLabel(id) ?? id);

    const html = `<!DOCTYPE html>
<html lang="hu">
<head><meta charset="utf-8"/></head>
<body style="font-family:system-ui,sans-serif;line-height:1.5;background:#fafafa;padding:24px;">
  <h1 style="font-size:18px;color:#18181b;margin:0 0 16px;">Új kapcsolatfelvételi űrlap</h1>
  <table style="width:100%;max-width:560px;border-collapse:collapse;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.08);">
    <tbody>
      ${formatField("Név", nameStr)}
      ${formatField("E-mail", emailStr)}
      ${formatField("Cég", company)}
      ${formatField("Cég weboldala", websiteStr ? websiteStr : "Nem adta meg")}
      ${formatField("Csapatméret", teamSize)}
      ${formatField("Időrabló folyamatok", painPointLabels.join(", "))}
      ${painPointOtherStr ? formatField("Egyéb (saját megfogalmazás)", painPointOtherStr) : ""}
      ${formatField("AI szakasz", aiStage)}
      ${formatField("Elérhetőség / időpont", availability)}
      ${formatField("Adatvédelem elfogadva", true)}
    </tbody>
  </table>
</body>
</html>`;

    const { error } = await resend.emails.send({
      from: `ZynAI Kapcsolatfelvétel <${fromEmail}>`,
      to: toEmail,
      replyTo: emailStr,
      subject: `Új megkeresés: ${nameStr}`,
      html,
    });

    if (error) {
      // A Resend üzenete címet is tartalmazhat: a látogató csak általános
      // hibát kap, a naplóba a hibakód és a státusz kerül.
      console.error(
        `[contact] Resend hiba: ${error.name} (HTTP ${error.statusCode ?? "?"})`,
      );
      return Response.json(
        { error: "Az e-mail küldése sikertelen volt." },
        { status: 500 },
      );
    }

    // N8N webhook: hiba esetén csak naplózunk, az e-mail az elsődleges csatorna.
    const webhookUrl = process.env.N8N_CONTACT_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        const res = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: AbortSignal.timeout(5000),
          body: JSON.stringify({
            name: nameStr,
            email: emailStr,
            company: company ?? "",
            website: websiteStr,
            teamSize: teamSize ?? "",
            painPoints: painPointIds,
            painPointLabels,
            painPointOther: painPointOtherStr,
            aiStage: aiStage ?? "",
            availability: availability ?? "",
            submittedAt: new Date().toISOString(),
          }),
        });
        if (!res.ok) {
          console.error(`[contact] n8n webhook hiba: HTTP ${res.status}`);
        }
      } catch (err) {
        const errName = err instanceof Error ? err.name : "UnknownError";
        console.error(`[contact] n8n webhook hiba: ${errName}`);
      }
    }

    return Response.json({ success: true });
  } catch (err) {
    const errName = err instanceof Error ? err.name : "UnknownError";
    console.error(`[contact] Váratlan hiba: ${errName}`);
    return Response.json(
      { error: "Váratlan szerverhiba történt." },
      { status: 500 },
    );
  }
}
