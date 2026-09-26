import { Resend } from "resend";

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
  return `<tr><td style="padding:8px 12px;border-bottom:1px solid #e4e4e7;font-weight:600;color:#18181b;width:220px;vertical-align:top">${escapeHtml(label)}</td><td style="padding:8px 12px;border-bottom:1px solid #e4e4e7;color:#3f3f46;white-space:pre-wrap">${escapeHtml(display)}</td></tr>`;
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: "A szerver nincs konfigurálva (hiányzó RESEND_API_KEY)." },
        { status: 500 },
      );
    }

    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return Response.json({ error: "Érvénytelen JSON törzs." }, { status: 400 });
    }

    const { name, email, phone, motivation, privacyAccepted } = body;

    const nameStr = typeof name === "string" ? name.trim() : "";
    const emailStr = typeof email === "string" ? email.trim() : "";
    const phoneStr = typeof phone === "string" ? phone.trim() : "";
    const motivationStr = typeof motivation === "string" ? motivation.trim() : "";

    if (!nameStr || !emailStr || !phoneStr || !motivationStr) {
      return Response.json(
        {
          error:
            "Hiányzó kötelező mezők: név, e-mail, telefonszám és motiváció.",
        },
        { status: 400 },
      );
    }

    if (privacyAccepted !== true) {
      return Response.json(
        { error: "Az adatkezelési hozzájárulás elfogadása kötelező." },
        { status: 400 },
      );
    }

    const resend = new Resend(apiKey);

    const html = `<!DOCTYPE html>
<html lang="hu">
<head><meta charset="utf-8"/></head>
<body style="font-family:system-ui,sans-serif;line-height:1.5;background:#fafafa;padding:24px;">
  <h1 style="font-size:18px;color:#18181b;margin:0 0 16px;">Új VibeCoding 1.0 - Pilot jelentkezés</h1>
  <table style="width:100%;max-width:560px;border-collapse:collapse;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.08);">
    <tbody>
      ${formatField("Név", nameStr)}
      ${formatField("E-mail", emailStr)}
      ${formatField("Telefonszám", phoneStr)}
      ${formatField("Miért szeretne részt venni", motivationStr)}
      ${formatField("Adatkezelés elfogadva", true)}
    </tbody>
  </table>
</body>
</html>`;

    const { error } = await resend.emails.send({
      from: "ZynAI VibeCoding 1.0 - Pilot <onboarding@resend.dev>",
      to: "zynai.dev@gmail.com",
      subject: `Új VibeCoding 1.0 - Pilot jelentkezés: ${nameStr}`,
      html,
    });

    if (error) {
      return Response.json(
        { error: error.message ?? "Az e-mail küldése sikertelen volt." },
        { status: 500 },
      );
    }

    // N8N webhook — fire and forget, nem blokkolja a választ
    try {
      await fetch("https://n8n.zynai.hu/webhook-test/zynai-urlap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "vibecoding-pilot",
          name: nameStr,
          email: emailStr,
          phone: phoneStr,
          motivation: motivationStr,
          submittedAt: new Date().toISOString(),
        }),
      });
    } catch {
      // webhook hiba nem akasztja meg a form beküldést
    }

    return Response.json({ success: true });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Váratlan szerverhiba történt.";
    return Response.json({ error: message }, { status: 500 });
  }
}
