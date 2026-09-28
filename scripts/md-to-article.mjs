import { readFileSync, writeFileSync } from "node:fs";

function usageAndExit() {
  console.error(
    "Használat: node scripts/md-to-article.mjs <input.md> <output.json>",
  );
  process.exit(1);
}

function fail(lineNumber, message) {
  process.stderr.write(`Hiba a(z) ${lineNumber}. sorban: ${message}\n`);
  process.exit(1);
  throw new Error("unreachable");
}

// A renderelő (app/(marketing)/ai-tartalmak/[slug]/page.tsx) mostantól három
// inline jelölést ismer fel: `backtick` (inline kód), **dupla csillag**
// (félkövér) és [szöveg](url) (link) — ez a három minta érintetlenül átmehet.
// A kép (![alt](url)) viszont nem: a renderelőben nincs hozzá case, a
// content típusokban meg külön "image" szakasztípus van rá, nem inline forma.
// Minden más beágyazott formázást továbbra is hibaként kell jelezni, mert a
// renderelő nem tudja hűen visszaadni (sima stringet dob ki, nem parsol
// Markdown-t).
const INLINE_PATTERNS = [
  { name: "kép (![alt](url))", re: /!\[[^\]]*\]\([^)]*\)/ },
  { name: "félkövér (__szöveg__)", re: /__[^_]+__/ },
  { name: "dőlt (*szöveg*)", re: /(?<!\*)\*[^*\n]+\*(?!\*)/ },
  { name: "dőlt (_szöveg_)", re: /(?<!_)_[^_\n]+_(?!_)/ },
];

function assertNoInlineMarkup(text, lineNumber) {
  for (const { name, re } of INLINE_PATTERNS) {
    const match = text.match(re);
    if (match) {
      fail(
        lineNumber,
        `beágyazott Markdown formázást találtam (${name}): "${match[0]}" — ` +
          "a content típusok (lib/article-types.ts) sima stringet várnak, " +
          "ezt nem lehet hűen visszaadni. Told el kézzel a szöveget.",
      );
    }
  }
}

// A `backtick` és a **dupla csillag** most átmegy, de ha az egyik pár
// nélkül marad ugyanabban a sorban, az majdnem mindig elgépelés — a
// renderelő szó szerinti karakterként jeleníti meg, nem hibaként áll le,
// csak figyelmeztet.
function warnUnmatchedInlineMarkers(line, lineNumber) {
  const backtickCount = (line.match(/`/g) ?? []).length;
  if (backtickCount % 2 !== 0) {
    console.warn(
      `Figyelmeztetés a(z) ${lineNumber}. sorban: pár nélküli backtick (\`) — ` +
        `a renderelő szó szerinti karakterként jeleníti meg, valószínűleg elgépelés: "${line.trim()}"`,
    );
  }

  const boldMarkerCount = (line.match(/\*\*/g) ?? []).length;
  if (boldMarkerCount % 2 !== 0) {
    console.warn(
      `Figyelmeztetés a(z) ${lineNumber}. sorban: pár nélküli "**" — ` +
        `a renderelő szó szerinti karakterként jeleníti meg, valószínűleg elgépelés: "${line.trim()}"`,
    );
  }
}

function wordCount(text) {
  const trimmed = text.trim();
  return trimmed ? trimmed.split(/\s+/).length : 0;
}

function splitTableRow(row) {
  let r = row.trim();
  if (r.startsWith("|")) r = r.slice(1);
  if (r.endsWith("|")) r = r.slice(0, -1);
  return r.split("|").map((cell) => cell.trim());
}

const [, , inputPath, outputPath] = process.argv;
if (!inputPath || !outputPath) usageAndExit();

let raw;
try {
  raw = readFileSync(inputPath, "utf8");
} catch (err) {
  console.error(`Nem sikerült beolvasni a(z) "${inputPath}" fájlt: ${err.message}`);
  process.exit(1);
}

const lines = raw.split(/\r\n|\r|\n/);

const sections = [];
const counts = {};
let totalWords = 0;
let isFirstParagraph = true;

function pushSection(section) {
  sections.push(section);
  counts[section.type] = (counts[section.type] ?? 0) + 1;
}

let i = 0;
while (i < lines.length) {
  const line = lines[i];
  const trimmed = line.trim();
  const lineNo = i + 1;

  if (trimmed === "") {
    i++;
    continue;
  }

  // Nyers HTML blokk — nincs a leképezésben.
  if (/^</.test(trimmed)) {
    fail(lineNo, `nyers HTML ("${trimmed}") nincs a leképezésben.`);
  }

  // Hivatkozás-definíció (reference link) — nincs a leképezésben.
  if (/^\[[^\]]+\]:\s*\S+/.test(trimmed)) {
    fail(lineNo, `hivatkozás-definíció ("${trimmed}") nincs a leképezésben.`);
  }

  // Kerítéses kódblokk: ``` vagy ~~~, opcionális nyelvcímkével.
  const fenceMatch = line.match(/^(`{3,}|~{3,})\s*(\S*)\s*$/);
  if (fenceMatch) {
    const fenceChar = fenceMatch[1][0];
    const fenceLen = fenceMatch[1].length;
    const language = fenceMatch[2] || undefined;
    const codeLines = [];
    let j = i + 1;
    let closed = false;
    const closeRe = new RegExp(`^${fenceChar}{${fenceLen},}$`);
    while (j < lines.length) {
      if (closeRe.test(lines[j].trim())) {
        closed = true;
        break;
      }
      codeLines.push(lines[j]);
      j++;
    }
    if (!closed) {
      fail(lineNo, "lezáratlan kódblokk — nincs záró kerítés a fájl végéig.");
    }
    const code = codeLines.join("\n");
    pushSection(
      language ? { type: "code", code, language } : { type: "code", code },
    );
    totalWords += wordCount(code);
    i = j + 1;
    continue;
  }

  // "---" / "***" / "___" — elválasztó, csak ha üres sor előzi meg (különben
  // egy Markdown setext-címsor aljának is tekinthető, ami nincs a leképezésben).
  if (/^-{3,}$/.test(trimmed) || /^\*{3,}$/.test(trimmed) || /^_{3,}$/.test(trimmed)) {
    if (i > 0 && lines[i - 1].trim() !== "") {
      fail(
        lineNo,
        `"${trimmed}" közvetlenül szöveg után — ez egy Markdown setext-címsor ` +
          "alja is lehetne, ami nincs a leképezésben. Válaszd el üres sorral, ha elválasztó jelet szántál ide.",
      );
    }
    pushSection({ type: "divider" });
    i++;
    continue;
  }

  // ATX címsor: "# " -> h2 (fejezetcím), "## " -> h3 (alcím). "### "-nak
  // (és mélyebbnek) nincs hova mennie, nincs h3 alatti szint.
  const headingMatch = trimmed.match(/^(#{1,6})\s+(.*)$/);
  if (headingMatch) {
    const level = headingMatch[1].length;
    if (level >= 3) {
      fail(
        lineNo,
        `"${"#".repeat(level)}" — H${level} címsor nincs a leképezésben (csak # és ## támogatott, nincs h3 alatti szint).`,
      );
    }
    const text = headingMatch[2].replace(/\s+#+\s*$/, "").trim();
    assertNoInlineMarkup(text, lineNo);
    warnUnmatchedInlineMarkers(text, lineNo);
    pushSection({ type: level === 2 ? "h3" : "h2", text });
    totalWords += wordCount(text);
    i++;
    continue;
  }

  // Blockquote: egymást követő "> " sorok egyetlen quote szakasszá állnak össze.
  if (/^>/.test(trimmed)) {
    const quoteLines = [];
    let j = i;
    while (j < lines.length && /^\s*>/.test(lines[j])) {
      const m = lines[j].match(/^\s*>\s?(.*)$/);
      const content = m ? m[1] : "";
      warnUnmatchedInlineMarkers(content, j + 1);
      quoteLines.push(content);
      j++;
    }
    // A sortörés itt a forrás tördeléséből jön, nem szándékos — egy szóköz
    // veszi át a helyét, a kódblokkal és a táblázatcellákkal ellentétben.
    const text = quoteLines.map((l) => l.trim()).join(" ");
    assertNoInlineMarkup(text, lineNo);
    pushSection({ type: "quote", text });
    totalWords += wordCount(text);
    i = j;
    continue;
  }

  // Lapos "-" lista.
  if (/^-\s+/.test(trimmed)) {
    const items = [];
    let j = i;
    while (j < lines.length) {
      const rawLine = lines[j];
      const t = rawLine.trim();
      if (t === "") break;
      if (!/^-\s+/.test(t)) break;
      if (/^\s+\S/.test(rawLine)) {
        fail(
          j + 1,
          `behúzott listaelem ("${t}") — a szkript csak lapos "-" listákat támogat, beágyazott listát nem.`,
        );
      }
      const m = t.match(/^-\s+(.*)$/);
      items.push(m[1]);
      warnUnmatchedInlineMarkers(m[1], j + 1);
      j++;
    }
    for (const item of items) assertNoInlineMarkup(item, lineNo);
    pushSection({ type: "list", items });
    totalWords += items.reduce((sum, it) => sum + wordCount(it), 0);
    i = j;
    continue;
  }

  // Más listajelölők — nincsenek a leképezésben.
  if (/^[*+]\s+/.test(trimmed)) {
    fail(lineNo, `"${trimmed}" — a "*" / "+" listajelölő nincs a leképezésben, csak a "-" jelölő.`);
  }
  if (/^\d+[.)]\s+/.test(trimmed)) {
    fail(lineNo, `"${trimmed}" — számozott lista nincs a leképezésben.`);
  }

  // Markdown táblázat: fejléc sor + elválasztó sor + törzs sorok.
  if (trimmed.includes("|")) {
    const headerCells = splitTableRow(trimmed);
    const sepLine = lines[i + 1];
    const sepPattern = /^\s*\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)*\|?\s*$/;
    if (sepLine === undefined || !sepPattern.test(sepLine.trim()) || sepLine.trim() === "") {
      fail(
        lineNo + 1,
        `hiányzó vagy érvénytelen táblázat-elválasztó sor a fejléc ("${trimmed}") alatt.`,
      );
    }
    warnUnmatchedInlineMarkers(trimmed, lineNo);
    let j = i + 2;
    const rows = [];
    while (j < lines.length && lines[j].trim() !== "" && lines[j].includes("|")) {
      const cells = splitTableRow(lines[j]);
      if (cells.length !== headerCells.length) {
        fail(
          j + 1,
          `a táblázat sora ${cells.length} cellát tartalmaz a fejléc ${headerCells.length} oszlopa helyett: "${lines[j].trim()}"`,
        );
      }
      warnUnmatchedInlineMarkers(lines[j], j + 1);
      rows.push(cells);
      j++;
    }
    for (const cell of headerCells) assertNoInlineMarkup(cell, lineNo);
    for (const row of rows) for (const cell of row) assertNoInlineMarkup(cell, lineNo);
    pushSection({ type: "table", headers: headerCells, rows });
    totalWords += [headerCells, ...rows]
      .flat()
      .reduce((sum, cell) => sum + wordCount(cell), 0);
    i = j;
    continue;
  }

  // Bekezdés (lead az első, minden további paragraph): a következő üres
  // sorig / új blokk kezdetéig tartó, egymást követő sima sorok.
  {
    const paraLines = [];
    let j = i;
    while (j < lines.length) {
      const t = lines[j].trim();
      if (t === "") break;
      if (/^(`{3,}|~{3,})/.test(lines[j])) break;
      if (/^-{3,}$|^\*{3,}$|^_{3,}$/.test(t)) break;
      if (/^#{1,6}\s+/.test(t)) break;
      if (/^>/.test(t)) break;
      if (/^-\s+/.test(t) || /^[*+]\s+/.test(t) || /^\d+[.)]\s+/.test(t)) break;
      if (/^</.test(t)) break;
      if (t.includes("|")) break;
      warnUnmatchedInlineMarkers(lines[j], j + 1);
      paraLines.push(lines[j]);
      j++;
    }
    // A sortörés itt a forrás tördeléséből jön, nem szándékos — egy szóköz
    // veszi át a helyét, a kódblokkal és a táblázatcellákkal ellentétben.
    const text = paraLines.map((l) => l.trim()).join(" ");
    assertNoInlineMarkup(text, lineNo);
    const type = isFirstParagraph ? "lead" : "paragraph";
    isFirstParagraph = false;
    pushSection({ type, text });
    totalWords += wordCount(text);
    i = j;
    continue;
  }
}

const article = {
  slug: "",
  title: "",
  excerpt: "",
  tag: "",
  date: "",
  publishedAt: "",
  featured: false,
  content: sections,
};

writeFileSync(outputPath, JSON.stringify(article, null, 2) + "\n", "utf8");

console.log(`Kész: ${outputPath}`);
console.log("Szakaszok típusonként:");
for (const [type, count] of Object.entries(counts)) {
  console.log(`  ${type}: ${count}`);
}
console.log(`Összes szószám: ${totalWords}`);
