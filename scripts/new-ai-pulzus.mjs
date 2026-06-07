#!/usr/bin/env node
// Usage: node scripts/new-ai-pulzus.mjs [YYYY-MM-DD]
// Defaults to today's date if no argument given.

import { writeFileSync, existsSync } from "fs";
import { join } from "path";

const dateArg = process.argv[2];
const date = dateArg ? new Date(dateArg) : new Date();

// ISO week number
function isoWeek(d) {
  const tmp = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  tmp.setUTCDate(tmp.getUTCDate() + 4 - (tmp.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(tmp.getUTCFullYear(), 0, 1));
  return Math.ceil(((tmp - yearStart) / 86400000 + 1) / 7);
}

const year = date.getFullYear();
const week = String(isoWeek(date)).padStart(2, "0");
const dateStr = date.toISOString().slice(0, 10);

const slug = `ai-pulzus-${dateStr}`;
const filename = `${dateStr}-ai-pulzus.json`;
const outPath = join("content", "articles", filename);

if (existsSync(outPath)) {
  console.error(`Már létezik: ${outPath}`);
  process.exit(1);
}

const template = {
  slug,
  title: "",
  date: `${year}. ${date.toLocaleDateString("hu-HU", { month: "long", day: "numeric" }).replace(". ", ". ")}`,
  excerpt: "",
  content: [
    { type: "lead", text: "" },
    { type: "divider", label: "HA CSAK EZT OLVASOD" },
    { type: "summary", label: "A HÉT 5 KULCSPONTJA", items: ["", "", "", "", ""] },
    { type: "divider", label: "RÉSZLETESEN" },
    { type: "conclusion", text: "", label: "HETI VÉGSZÓ" },
    { type: "sources", label: "Források", items: [] },
  ],
  tag: "AI PULZUS",
  isWeekly: true,
  coverImage: `/blog/W${week}/cover.webp`,
};

writeFileSync(outPath, JSON.stringify(template, null, 2), "utf8");
console.log(`Létrehozva: ${outPath}`);
console.log(`Slug: ${slug}`);
console.log(`\nKövetkező lépés: add hozzá az article-loader.ts-hez:`);
console.log(`  import aiPulzusW${week} from "@/content/articles/${filename}";`);
console.log(`  és add az allArticles tömb elejére.`);
