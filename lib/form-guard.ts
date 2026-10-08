/**
 * Közös szerveroldali védelem az űrlap-végpontokhoz (/api/contact, /api/pilot):
 * honeypot, egyszerű IP-alapú rate limit, e-mail- és hosszellenőrzés,
 * valamint az ismeretlen mezők elutasítása.
 */

/** Rejtett mező neve: ember nem látja és nem tölti ki, a botok igen. */
export const HONEYPOT_FIELD = "zxCheck";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(value: string): boolean {
  return value.length <= 254 && EMAIL_RE.test(value);
}

/** Igaz, ha a honeypot mezőt kitöltötték, vagyis a beküldés szinte biztosan bot. */
export function isHoneypotFilled(body: Record<string, unknown>): boolean {
  const value = body[HONEYPOT_FIELD];
  return typeof value === "string" && value.trim() !== "";
}

/** Az első olyan mező neve, ami nem szerepel az engedélyezettek között. */
export function findUnknownField(
  body: Record<string, unknown>,
  allowed: readonly string[],
): string | undefined {
  return Object.keys(body).find(
    (key) => key !== HONEYPOT_FIELD && !allowed.includes(key),
  );
}

/** Igaz, ha a szöveg hosszabb a megengedettnél. */
export function tooLong(value: unknown, max: number): boolean {
  return typeof value === "string" && value.length > max;
}

/**
 * A kliens IP-címe. Élesben a forgalom a Cloudflare-en jön, amely a
 * látogató valódi címét a cf-connecting-ip fejlécben küldi (a kliens által
 * küldött értéket felülírja); az x-forwarded-for első eleme e mögött nem
 * megbízható. Ha egyik fejléc sincs, undefined, és ilyenkor a rate limit nem
 * lép életbe, hogy a látogatók ne osztozzanak egyetlen közös kereten.
 */
function clientIp(req: Request): string | undefined {
  const cloudflare = req.headers.get("cf-connecting-ip")?.trim();
  if (cloudflare) return cloudflare;
  const forwarded = req.headers.get("x-forwarded-for");
  const first = forwarded?.split(",")[0]?.trim();
  return first || req.headers.get("x-real-ip")?.trim() || undefined;
}

const hits = new Map<string, number[]>();

/**
 * Memóriában tartott csúszóablakos rate limit. Egyetlen futó szerverpéldányra
 * elég; újraindításkor nullázódik. Igazat ad vissza, ha a kérés túllépte a keretet.
 */
export function isRateLimited(
  req: Request,
  scope: string,
  limit: number,
  windowMs: number,
): boolean {
  const ip = clientIp(req);
  if (!ip) return false;

  const now = Date.now();
  const key = `${scope}:${ip}`;
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);

  if (recent.length >= limit) {
    hits.set(key, recent);
    return true;
  }

  recent.push(now);
  hits.set(key, recent);

  // Alkalmi takarítás, hogy a térkép ne nőjön a végtelenségig.
  if (hits.size > 5000) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= windowMs)) hits.delete(k);
    }
  }

  return false;
}
