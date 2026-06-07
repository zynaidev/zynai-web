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
  return `<tr><td style="padding:8px 12px;border-bottom:1px solid #e4e4e7;font-weight:600;color:#18181b;width:220px;vertical-align:top">${escapeHtml(label)}</td><td style="padding:8px 12px;border-bottom:1px solid #e4e4e7;color:#3f3f46">${escapeHtml(display)}</td></tr>`;
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

    const {
      name,
      email,
      company,
      website,
      teamSize,
      biggestChallenge,
      aiStage,
      availability,
      privacyAccepted,
    } = body;

    const nameStr = typeof name === "string" ? name.trim() : "";
    const emailStr = typeof email === "string" ? email.trim() : "";
    const websiteStr = typeof website === "string" ? website.trim() : "";
    const challengeStr =
      typeof biggestChallenge === "string" ? biggestChallenge.trim() : "";

    if (!nameStr || !emailStr || !challengeStr) {
      return Response.json(
        {
          error:
            "Hiányzó kötelező mezők: név, e-mail és legnagyobb kihívás kötelező.",
        },
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
      ${formatField("Legnagyobb kihívás", challengeStr)}
      ${formatField("AI szakasz", aiStage)}
      ${formatField("Elérhetőség / időpont", availability)}
      ${formatField("Adatvédelem elfogadva", true)}
    </tbody>
  </table>
</body>
</html>`;

    const { error } = await resend.emails.send({
      from: "ZynAI Kapcsolatfelvétel <onboarding@resend.dev>",
      to: "zynai.dev@gmail.com",
      subject: `Új megkeresés: ${nameStr}`,
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
      await fetch("https://n8n.zynai.hu/webhook/zynai-urlap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nameStr,
          email: emailStr,
          company: company ?? "",
          website: websiteStr,
          teamSize: teamSize ?? "",
          biggestChallenge: challengeStr,
          aiStage: aiStage ?? "",
          availability: availability ?? "",
          submittedAt: new Date().toISOString(),
        }),
      })
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
