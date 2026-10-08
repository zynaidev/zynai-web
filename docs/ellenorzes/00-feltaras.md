# Feltárás: zynai-website

> Készült: 2026. október 8. · Csak diagnosztika, a projektben semmi nem módosult (ez az egy fájl kivételével).
> A munkakönyvtárban 17 nem commitolt változás van egy korábbi munkamenetből (Next-frissítés, SEO-, űrlap- és 404-javítások), a riport **ezt az állapotot** írja le, nem az élesen futó verziót (`git status --short` → 17 sor).

## 1. Projekt

**Framework és verziók** (`package.json` + `package-lock.json`)

| Csomag | package.json | Telepített |
|---|---|---|
| next | ^16.3.8 | 16.3.8 |
| react / react-dom | 19.2.4 | 19.2.4 |
| typescript (dev) | ^5 | 5.9.3 |
| tailwindcss, @tailwindcss/postcss (dev) | ^4 | 4.3.0 |
| framer-motion | ^12.38.0 | 12.40.0 |
| three / @react-three/fiber / drei / postprocessing | ^0.184.0 / ^9.6.0 / ^10.7.7 / ^3.0.4 | 0.184.0 / 9.6.1 / 10.7.7 / 3.0.4 |
| gsap / @gsap/react / lenis | ^3.15.0 / ^2.1.2 / ^1.3.23 | 3.15.0 / 2.1.2 / 1.3.23 |
| resend | ^6.12.2 | 6.12.4 |
| @calcom/embed-react | ^1.5.3 | 1.5.3 |
| radix-ui, lucide-react, clsx, cva, tailwind-merge, tw-animate-css | – | 1.4.3, 1.16.0, 2.1.1, 0.7.1, 3.6.0, 1.4.0 |
| eslint / eslint-config-next (dev) | ^9 / 16.3.8 | 9.39.4 / 16.3.8 |
| shadcn (dev) | ^4.4.0 | 4.8.0 |

- **Csomagkezelő:** npm (`package-lock.json`; yarn/pnpm/bun lockfile nincs).
- **Node-követelmény:** `engines` nincs, `.nvmrc` nincs. A Dockerfile `node:20-alpine` képet használ (`Dockerfile:1`). A Next 16.3.8 `>=20.9.0`-t kér.
- **TypeScript:** igen (`tsconfig.json`, `strict: true`).
- **Hosting:** `Dockerfile` (többlépcsős, `output: "standalone"` – `next.config.ts:4`), `.dockerignore`. `vercel.json`, `netlify.toml`, CI-fájl (`.github/`) nincs.
- **Agent-fájlok:** `AGENTS.md` (327 bájt), `CLAUDE.md` (11 bájt, `@AGENTS.md` hivatkozás). `.cursor/rules`, `.cursorrules`, `.github/copilot-instructions.md`: nincs.

**Mappaszerkezet (3 szint, node_modules / .next / .git nélkül)**

```
app/
  (marketing)/  adatvedelem, ai-tartalmak, claude-code, esettanulmanyok,
                idopontfoglalas, kapcsolatfelvetel, vibecoding-pilot
  api/          contact, pilot
  blog/         [slug]
  style-guide/
components/     animations, brand, common, hooks, layout, sections, three, ui, visuals
config/
content/        articles, claude-code (og)
docs/           ellenorzes (ez a riport)
hooks/
lib/
public/         blog (W20–W24, ai-munkaprofil, claude-code), brand (attila),
                claude-code, esettanulmanyok, vibecoding (previews)
scripts/
```

## 2. Oldalak és tartalom

| Útvonal | Fájl | Típus (build) | noindex |
|---|---|---|---|
| / | app/(marketing)/page.tsx | statikus | nem |
| /kapcsolatfelvetel | app/(marketing)/kapcsolatfelvetel/page.tsx (+ layout.tsx a metaadathoz) | statikus, kliens | nem |
| /vibecoding-pilot | app/(marketing)/vibecoding-pilot/page.tsx | statikus | nem |
| /claude-code | app/(marketing)/claude-code/page.tsx | statikus | nem |
| /esettanulmanyok | app/(marketing)/esettanulmanyok/page.tsx | statikus | nem |
| /esettanulmanyok/aedificium-design | …/aedificium-design/page.tsx (+ layout.tsx) | statikus, kliens | nem |
| /esettanulmanyok/silverlimo | …/silverlimo/page.tsx (+ layout.tsx) | statikus, kliens | nem |
| /idopontfoglalas | app/(marketing)/idopontfoglalas/page.tsx | statikus | nem |
| /adatvedelem | app/(marketing)/adatvedelem/page.tsx | statikus | nem |
| /ai-tartalmak | app/(marketing)/ai-tartalmak/page.tsx (+ layout.tsx) | statikus, kliens | nem |
| /ai-tartalmak/[slug] | …/ai-tartalmak/[slug]/page.tsx | SSG, 12 cikk (`generateStaticParams`) | nem |
| /ai-tartalmak/[slug]/opengraph-image | …/[slug]/opengraph-image.tsx | dinamikus | – |
| /blog/[slug] | app/blog/[slug]/page.tsx | **dinamikus**, angol helykitöltő tartalom (`brand-foundation`, `motion-and-depth`) | **nem** |
| /style-guide | app/style-guide/page.tsx | statikus | igen (`noindex, nofollow`) |
| 404 | app/not-found.tsx | statikus | igen (`noindex, follow`) |
| /opengraph-image | app/opengraph-image.tsx | dinamikus, `runtime = "edge"` | – |
| /api/contact, /api/pilot | app/api/*/route.ts | dinamikus, POST | – |
| /robots.txt, /sitemap.xml, /manifest.webmanifest | app/robots.ts, sitemap.ts, manifest.ts | statikus | – |

(Típusok forrása: `npm run build` kimenete.)

**A látható szövegek helye**
- Nagyrészt **keménykódolva a komponensekben**: `app/(marketing)/*/page.tsx`, `components/sections/*.tsx`, `components/layout/header.tsx`, `Footer.tsx`.
- Cikkek: `content/articles/*.json` (betöltés: `lib/article-loader.ts`).
- Promptépítő: `content/claude-code/*.ts` és `*.md`.
- Űrlapopciók: `lib/contact-types.ts`.
- `docs/szovegek` vagy hasonló szövegforrás-mappa: nincs.

**Layoutok és minden oldalon megjelenő elemek**
- `app/layout.tsx`: `<html lang="hu">`, betűk (`next/font/google`), gyökér-metaadat.
- `app/(marketing)/layout.tsx` (`"use client"`): `SmoothScroll`, `MatrixBackground`, `Header` (rejtett a `/vibecoding-pilot` és `/claude-code` útvonalon, 22–23. sor), `Footer`.
- `app/(marketing)/ai-tartalmak/layout.tsx`: metaadat + JSON-LD.
- Sütibanner: nincs.

## 3. Mérés (Google Analytics / Tag Manager)

- Keresés (`GTM-`, `G-`, `AW-`, `gtag`, `googletagmanager`, `google-analytics`, `dataLayer`, `consent`, `@next/third-parties`, `react-ga`, `analytics`, `fbq`, `hotjar`, `clarity`) az `app`, `components`, `lib`, `hooks`, `config`, `scripts` mappákban: **nincs mérőkód**.
  - Egyetlen „analytics" találat szöveg: `app/(marketing)/adatvedelem/page.tsx:123` és `:182` (a Google Analytics „tervezett").
- Mérőszkript betöltése: nincs. A három `<script>` mind JSON-LD (`app/(marketing)/page.tsx:79`, `ai-tartalmak/layout.tsx:46`, `ai-tartalmak/[slug]/page.tsx:125`).
- Consent Mode alapértelmezés, sütibanner, döntés tárolása: nincs.
- dataLayer-események: nincs. Kézi `page_view`: nincs.
- Mérési azonosító (keménykódolt vagy env): nincs.

## 4. Űrlapok és e-mail

**Űrlapok**

| Űrlap | Fájl | Mezők | Kliensoldali validáció | Cél |
|---|---|---|---|---|
| Pilot jelentkezés | app/(marketing)/vibecoding-pilot/PilotApplicationForm.tsx | name (text), email (email), phone (tel), motivation (textarea), privacyAccepted (checkbox), zxCheck (rejtett honeypot) | nem üres név/e-mail/telefon/motiváció, elfogadott hozzájárulás | POST `/api/pilot`, JSON |
| Kapcsolatfelvétel (többlépéses) | app/(marketing)/kapcsolatfelvetel/page.tsx | name (text), email (email), company, website, teamSize, aiStage, availability (gombválasztó), painPoints (többválasztós), painPointOther (textarea), privacyAccepted (checkbox), zxCheck (honeypot) | lépésenként: nem üres név és e-mail (formátum nincs, 349–364. sor), min. 1 painPoint, „egyéb" esetén min. 3 karakter, hozzájárulás | POST `/api/contact`, JSON (309–326. sor) |

**API-végpontok** (`app/api/pilot/route.ts`, `app/api/contact/route.ts`, mindkettő POST)
- Validáció: kötelező mezők, e-mail-formátum, hosszkorlátok, ismeretlen mezők elutasítása, nem objektum törzs elutasítása (`lib/form-guard.ts`).
- Spamvédelem: honeypot (`zxCheck`, kitöltve csendes 200), IP-alapú rate limit 5 kérés / 10 perc (memóriában, `x-forwarded-for` első eleme alapján). Captcha: nincs.
- Szolgáltatók: **Resend** (e-mail) és **n8n webhook** (`https://n8n.zynai.hu/webhook/zynai-urlap`, illetve `…/webhook/pilot-49e98280a6aa`).
- Hibakezelés: a Resend hibájára 500-at ad vissza (`if (error)` ág). Az n8n-hívás hibáját elnyeli (`catch` csak kommenttel), 5 mp időkorláttal.
- Címzett: **keménykódolva** `zynai.dev@gmail.com`. Feladó: `onboarding@resend.dev` (Resend próbafeladó). `replyTo`: a jelentkező e-mail-címe.
- Szerverakció (`"use server"`): nincs.

**Beágyazott harmadik felek**
- **Cal.com** foglalási widget (`components/CalEmbed.tsx`, `@calcom/embed-react`, `https://cal.com/zynai/felmeres`): `/idopontfoglalas` (48. sor) és a kapcsolatfelvétel sikerképernyője (546. sor). Hozzájárulási logika nincs, tehát hozzájárulás nélkül töltődik be.
- **jsDelivr CDN** ikonok (`components/sections/IntegrationStack.tsx:3`, `simple-icons@latest`): a főoldalon, sima `<img>`-gel.
- Térkép, videó, chat: nincs.

**Köszönőoldal:** nincs külön oldal, mindkét űrlap a komponensen belüli sikerállapotot mutatja. Esemény-push: nincs. noindex: nem értelmezhető.

## 5. Környezeti változók

| Változó | Fájl | Láthatóság |
|---|---|---|
| RESEND_API_KEY | app/api/contact/route.ts:48, app/api/pilot/route.ts:36 | csak szerver |
| NODE_ENV | app/(marketing)/ai-tartalmak/[slug]/page.tsx:598, :655 | build-idejű, Next által beállított |

- `NEXT_PUBLIC_` változó: nincs. `import.meta.env`: nincs.
- `.env.example`: nincs.
- `.env*` fájl: van (`.env.local`; tartalmát nem nyitottam meg).
- `.gitignore` lefedi: igen (`.env*`, `.env*.local`, 34–35. sor). `.dockerignore`: `.env.local`, `.env*.local`.

## 6. Futtatható ellenőrzések

- **Típusellenőrzés** (`npx tsc --noEmit`): 0 hiba.
- **Lint** (`npm run lint`): **3 hiba, 1 figyelmeztetés**
  - error `react-hooks/set-state-in-effect`: `app/(marketing)/ai-tartalmak/page.tsx:70`
  - error `react-hooks/set-state-in-effect`: `components/reveal-lines.tsx:47`
  - error `react-hooks/set-state-in-effect`: `components/reveal-lines.tsx:53`
  - warning `@next/next/no-img-element`: `components/sections/IntegrationStack.tsx:63`
- **Build** (`npm run build`): sikeres (exit 0). Figyelmeztetések:
  - „The Edge Runtime is deprecated" (`app/opengraph-image.tsx:3`)
  - „Using edge runtime on a page currently disables static generation for that page"
- **npm audit --omit=dev --audit-level=high:** 0 sebezhetőség.
- **npm audit --audit-level=high:** 8 magas (csak fejlesztői): @next/eslint-plugin-next, @ts-morph/common, braces, eslint-config-next, fast-glob, micromatch, shadcn, ts-morph.
- **Git:**
  - Állapot: **nem tiszta**, 17 módosított vagy új fájl.
  - Ág: `main`. Remote: `https://github.com/zynaidev/zynai-web.git` (hitelesítő adat nincs benne). Commitok: 167.
  - Utolsó 10 commit: `d627a17 Remove card top line, unify card animation, hide X-Powered-By` · `fdf0ed6 header2` · `cbeff38 header` · `449c3af promptepito` · `24ef2b0 header,footer fix` · `3255013 final pilot` · `e42cef1 wip: fix cikk` · `340ca4f feat: Claude Code vibecoding cikk publikálása (esettanulmány + képek)` · `3c77968 feat: Markdown → cikk-JSON konverziós szkript (scripts/md-to-article.mjs)` · `d982c15 feat: kiemelt cikk mechanizmus (featured) a hero-kártyához, és CLAUDE tag hozzáadása`
- **`.env` a Git-történetben** (`git log --all --name-only | grep -i "\.env"`): tiszta.
- **Kódtisztaság** (követett forrás):
  - `console.log`: csak `scripts/md-to-article.mjs:325–328` (parancssori szkript kimenete), illetve szövegként a cikkekben (`content/articles/2026-09-28-claude-code-vibecoding.json`, `content/claude-code/cikk.md`).
  - `@ts-ignore`: csak szövegként a cikkekben és a promptépítő tartalmában. Kódban nincs.
  - `as any`, TODO, FIXME, Lorem, `[ELLENŐRIZENDŐ`, `[cégnév]`: nincs.
  - Üres `catch {}`: nincs. Csak kommentet tartalmazó `catch`: két helyen az n8n-hívásnál (`app/api/*/route.ts`).
  - Szögletes zárójeles helyőrző: nincs (a találatok TypeScript-indexek, pl. `[number]`).

## 7. SEO és alap minőség

- **Metaadat:** gyökér `app/layout.tsx` (cím-sablon `%s — ZynAI`, leírás, Open Graph, `canonical: https://zynai.hu`). Saját cím, leírás és canonical: kapcsolatfelvetel, vibecoding-pilot, claude-code, esettanulmanyok, a két esettanulmány, idopontfoglalas, adatvedelem, ai-tartalmak, cikkek (`generateMetadata`).
  - A `/blog/[slug]` saját, angol nyelvű címet kap („… · Zynai"), canonical nélkül.
- **`<html lang>`:** `hu` (`app/layout.tsx:91`).
- **robots.txt:** `User-Agent: *`, `Allow: /`, `Disallow: /api/`, sitemap: `https://zynai.hu/sitemap.xml`.
- **sitemap.xml:** főoldal, /kapcsolatfelvetel, /vibecoding-pilot, /claude-code, /esettanulmanyok és a két esettanulmány, /ai-tartalmak, valamint az összes cikk (`app/sitemap.ts`). Nincs benne: /idopontfoglalas, /adatvedelem, /blog/*, /style-guide.
- **robots tiltás és noindex egyszerre:** nincs (a `robots.txt` csak az `/api/`-t tiltja, noindex oldal nincs tiltva).
- **Képek:** túlnyomóan `next/image`. Sima `<img>`: `components/sections/IntegrationStack.tsx:63` (CDN-ikonok), `app/(marketing)/ai-tartalmak/[slug]/opengraph-image.tsx:164` (OG-kép generálása).
- **Betűk:** `next/font/google` (Instrument Sans, Inter, Geist Mono), önkiszolgált. CDN-es betű-link: nincs.
- **Egyedi 404:** van (`app/not-found.tsx`).
- **Favicon:** `/ZynAI_favicon.png` (`app/layout.tsx:77–79`, `app/manifest.ts`). Az `app/favicon.ico.png` nem szabványos fájlnév, a Next nem használja automatikusan.
- **Open Graph kép:** `app/opengraph-image.tsx` (1200×630, edge), cikkenként a `coverImage` vagy a `[slug]/opengraph-image.tsx`.
- **JSON-LD:**
  - Főoldal (`app/(marketing)/page.tsx:79–`): `ProfessionalService` (name, description, url, email, areaServed: Country, founder: Person jobTitle-lel, sameAs, inLanguage).
  - Cikkek (`lib/article-seo.ts`): `BlogPosting` (headline, description, datePublished, author Person, publisher Organization + logó ImageObject, mainEntityOfPage WebPage).
  - Archívum (`lib/article-seo.ts:88–`): `CollectionPage` + `WebSite` + `ItemList` / `ListItem`.

## 8. Nyitott kérdések

- **Élő verzió:** nem ellenőrzött, hogy az élesen futó oldal melyik commitot és Next-verziót futtatja. A 17 nem commitolt változás (köztük a Next 16.3.8-as biztonsági frissítés) még nincs élesen (`git status`).
- **Docker-build:** nem ellenőrzött (a Docker démon nem futott ezen a gépen).
- **/blog/[slug]:** nyilvános, indexelhető, angol helykitöltő tartalommal (`app/blog/[slug]/page.tsx:7–16`). A sitemapban nincs, de elérhető.
- **Lint:** 3 hibával fut le (6. pont), köztük `app/(marketing)/ai-tartalmak/page.tsx:70` (a `?kategoria=` paraméter beolvasása).
- **Adatvédelem és harmadik felek:** a Cal.com widget és a jsDelivr-ikonok hozzájárulás nélkül töltődnek be. Az adatkezelési tájékoztató nem említi a Cal.com-ot, az n8n-t, a pilot űrlapot és a telefonszám-mezőt (`app/(marketing)/adatvedelem/page.tsx`).
- **Tájékoztató és valóság:** a tájékoztató „tervezett" Google Analytics- és Ads-sütiket említ, a kódban mérés nincs (3. pont).
- **E-mail feladó:** `onboarding@resend.dev` próbafeladó, a címzett kódba írt Gmail-cím (4. pont). Saját domainről küldés nincs beállítva.
- **CDN-függőség:** `simple-icons@latest` rögzítetlen verzió (`components/sections/IntegrationStack.tsx:3`), egy CDN-változás elronthatja az ikonokat.
- **Rate limit:** az `x-forwarded-for` első elemére épül és memóriában tárolódik (`lib/form-guard.ts`). Hogy az éles proxy hogyan tölti ki ezt a fejlécet: nem ellenőrzött.
- **X-Powered-By:** az utolsó commit üzenete szerint rejtett, de a `next.config.ts`-ben nincs `poweredByHeader: false`, és helyben a fejléc megjelent (`X-Powered-By: Next.js`).
- **Biztonsági fejlécek** (CSP, HSTS stb.): a `next.config.ts`-ben nincs `headers()`. A proxyszintű beállítás nem ellenőrzött.
- **Node-verzió:** nincs `engines` vagy `.nvmrc`, csak a Dockerfile rögzíti (node:20).
- **Edge runtime:** elavult (`app/opengraph-image.tsx:3`, build-figyelmeztetés).

## Összesítés

| Terület | Állapot | Bizonyíték |
|---|---|---|
| Framework, verziók | rendben | Next 16.3.8, React 19.2.4 (package-lock) |
| Típusellenőrzés | rendben | `npx tsc --noEmit` → 0 hiba |
| Lint | hiba | 3 error, 1 warning (`npm run lint`) |
| Build | rendben | exit 0, 2 edge runtime figyelmeztetés |
| Éles függőségek sebezhetősége | rendben | `npm audit --omit=dev` → 0 |
| Fejlesztői függőségek sebezhetősége | hiba | 8 magas (eslint-config-next, shadcn láncai) |
| Titkok, .env | rendben | `.env*` gitignore-ban, a történetben nincs |
| Git-állapot | hiba | 17 nem commitolt változás |
| Mérés és hozzájárulás | nem ellenőrzött | mérés és sütibanner nincs a kódban |
| Űrlapvédelem | rendben | honeypot, rate limit, validáció (`lib/form-guard.ts`) |
| E-mail beállítás | hiba | `onboarding@resend.dev` feladó, keménykódolt címzett |
| Harmadik felek és adatvédelem | hiba | Cal.com, jsDelivr hozzájárulás nélkül, tájékoztató hiányos |
| SEO metaadat | rendben | saját canonical és cím az összes fő oldalon |
| Helykitöltő oldalak | hiba | `/blog/[slug]` indexelhető, angol helykitöltő |
| 404, favicon, OG, JSON-LD | rendben | `app/not-found.tsx`, `app/layout.tsx:77`, `app/opengraph-image.tsx`, `lib/article-seo.ts` |
| Éles telepítés, Docker | nem ellenőrzött | Docker démon nem futott, élő verzió nem vizsgálva |
