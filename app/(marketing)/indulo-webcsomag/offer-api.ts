/**
 * Az Induló csomag kampányoldal és az n8n közötti szerződés (kliensoldal).
 *
 * GET  {BASE}/indulo-ajanlat?t=<token>  → ajánlat adatai
 * POST {BASE}/info  (t=<token>, form-urlencoded) → { ok, uzenet }
 *
 * Személyes adat (név, e-mail, telefon) sehol nem kerül URL-be vagy eseménybe;
 * a token egy véletlen, kitalálhatatlan azonosító.
 */

const DEFAULT_BASE = "https://n8n.zynai.hu/webhook";

// NEXT_PUBLIC_*: build-időben kerül a kódba; helyi teszthez felülírható.
export const API_BASE = (process.env.NEXT_PUBLIC_INDULO_API_BASE || DEFAULT_BASE).replace(/\/$/, "");

const OFFER_TIMEOUT_MS = 3000;
const INFO_TIMEOUT_MS = 10_000;

export type OfferData = {
  cegnev: string;
  javasoltOldalak: string[];
  /** YYYY-MM-DD: a dátum kiírására. */
  kedvezmenyLejarat: string | null;
  /** ISO időpont időzónával: a visszaszámláló ezt használja. */
  kedvezmenyVege: string | null;
};

export type Source = "idopont" | "info" | "ismeretlen";

export type LandingParams = {
  token: string | null;
  source: Source;
};

const TOKEN_RE = /^[a-z0-9]{16,40}$/;
const YMD_RE = /^\d{4}-\d{2}-\d{2}$/;

/** A címsorból olvassa a tokent és a forrást; a token csak [a-z0-9]{16,40} lehet. */
export function readParams(search: string): LandingParams {
  const q = new URLSearchParams(search);
  const t = q.get("t");
  const f = q.get("forras");
  return {
    token: t && TOKEN_RE.test(t) ? t : null,
    source: f === "idopont" || f === "info" ? f : "ismeretlen",
  };
}

function cleanText(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const text = value.trim();
  return text ? text.slice(0, max) : null;
}

function validIso(value: unknown): string | null {
  if (typeof value !== "string") return null;
  return Number.isNaN(new Date(value).getTime()) ? null : value;
}

/** Az n8n válaszának ellenőrzése: ismeretlen vagy hibás törzs esetén null. */
export function parseOffer(body: unknown): OfferData | null {
  if (typeof body !== "object" || body === null) return null;
  const b = body as Record<string, unknown>;
  if (b.ok !== true) return null;

  const cegnev = cleanText(b.cegnev, 120);
  const pages = Array.isArray(b.javasolt_oldalak)
    ? b.javasolt_oldalak
        .map((p) => cleanText(p, 240))
        .filter((p): p is string => p !== null)
        .slice(0, 8)
    : [];
  const lejarat =
    typeof b.kedvezmeny_lejarat === "string" && YMD_RE.test(b.kedvezmeny_lejarat)
      ? b.kedvezmeny_lejarat
      : null;
  const vege = validIso(b.kedvezmeny_lejarat_vege);

  if (!cegnev || pages.length === 0 || (!lejarat && !vege)) return null;
  return { cegnev, javasoltOldalak: pages, kedvezmenyLejarat: lejarat, kedvezmenyVege: vege };
}

async function withTimeout<T>(ms: number, run: (signal: AbortSignal) => Promise<T>): Promise<T> {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), ms);
  try {
    return await run(controller.signal);
  } finally {
    window.clearTimeout(timer);
  }
}

/** Az ajánlat lekérése; bármilyen hiba, időtúllépés vagy `ok:false` esetén null. */
export async function fetchOffer(token: string): Promise<OfferData | null> {
  try {
    return await withTimeout(OFFER_TIMEOUT_MS, async (signal) => {
      const res = await fetch(`${API_BASE}/indulo-ajanlat?t=${encodeURIComponent(token)}`, {
        method: "GET",
        cache: "no-store",
        credentials: "omit",
        signal,
      });
      if (!res.ok) return null;
      return parseOffer(await res.json());
    });
  } catch {
    // Hálózati hiba vagy időtúllépés: az oldal az általános változatot mutatja.
    return null;
  }
}

export type InfoResult = { ok: boolean; message: string | null };

/** Az info-kérés elküldése; a szerver `uzenet` mezőjét adja vissza kiírásra. */
export async function requestInfo(token: string): Promise<InfoResult> {
  try {
    return await withTimeout(INFO_TIMEOUT_MS, async (signal) => {
      const res = await fetch(`${API_BASE}/info`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ t: token }).toString(),
        credentials: "omit",
        signal,
      });
      const body: unknown = await res.json().catch(() => null);
      const data = typeof body === "object" && body !== null ? (body as Record<string, unknown>) : {};
      return {
        ok: res.ok && data.ok === true,
        message: cleanText(data.uzenet, 300),
      };
    });
  } catch {
    return { ok: false, message: null };
  }
}
