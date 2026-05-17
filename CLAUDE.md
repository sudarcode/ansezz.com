# CLAUDE.md

Guidance for Claude Code (claude.ai/code) working in this repository.

## Project

**ansezz.com** — personal portfolio + blog of Anass Ez-zouaine. Static site. Astro 6 + Tailwind CSS v4 + TypeScript (strict). Neobrutalist design language.
Package manager: `pnpm` (pinned via `packageManager` in `package.json`).
Deploy target: **GitHub Pages** (custom domain `ansezz.com` via `public/CNAME`).

## Commands

| Command | Action |
|---------|--------|
| `pnpm install` | Install deps |
| `pnpm dev` | Dev server at `localhost:4321` |
| `pnpm build` | Build to `./dist/` |
| `pnpm preview` | Preview built site |
| `pnpm check` | Type-check `.astro` + TS (run before declaring work done) |
| `pnpm format` | Prettier across repo |
| `pnpm optimize:images` | Sharp pass over images in `public/blog` |
| `pnpm generate:icons` | Regenerate PWA + apple-touch icons |

No test runner. No lint command — Prettier formats (`prettier-plugin-astro`, `prettier-plugin-tailwindcss`).

## Architecture

Content-driven static site. Three pillars:

1. **Content collections** (`src/content.config.ts`) — `blog` and `work` defined via `glob` loader, schemas validated with `astro/zod`. Markdown/MDX files live in `src/content/blog/` and `src/content/work/`. Editing schema = updating frontmatter across all entries.

2. **Pages** (`src/pages/`) — file-based routing. Blog: `blog/[...slug].astro` for single posts, plus `blog/category/[category].astro`, `blog/tag/[tag].astro`, `blog/page/[page].astro` for taxonomy + pagination. `index.astro` is home, `404.astro` is fallback. Static pages: `about`, `work`, `uses`, `contact`, `privacy`, `styleguide`.

3. **Site config** (`src/consts.ts`) — single source of truth for `SITE`, `OWNER`, `NAV`, `HOME`, `ABOUT`, `WORK`, `BLOG`, `USES`, `CONTACT`, `SOCIALS`, `BLOG_CATEGORIES`, `CATEGORY_LABEL`, `CATEGORY_TONE`, `CARD_TONES`, `WHAT_I_DO`, `SERVICES`, `LANGUAGES`, plus `OTHER_SHOPIFY_STOREFRONTS`, `OTHER_SHOPIFY_APPS`, `OTHER_PLATFORMS`. `astro.config.mjs` reads `SITE.URL` for sitemap.

### Key wiring

- `astro.config.mjs` — declares Google fonts via `fontProviders.google()`:
  - `--font-display` (Archivo Black)
  - `--font-sans` (Inter)
  - `--font-mono` (JetBrains Mono)
  Sitemap + MDX + astro-icon + rehype-external-links wired. Tailwind v4 loaded as Vite plugin (no `tailwind.config.js`).
- `tsconfig.json` — extends `astro/tsconfigs/strict`, path alias `@/*` → `src/*`.
- `src/layouts/BaseLayout.astro` — outer shell (`Head` + `Header` + `Footer` + JSON-LD).
- `src/layouts/Page.astro` — wraps BaseLayout, adds eyebrow + heading + intro shell, auto-emits `WebPage` JSON-LD.
- `src/styles/global.css` — Tailwind v4 entry (`@import "tailwindcss"`) + `@theme` tokens (colors, shadows, type scale, halftone utilities).

### Adding content

- **Blog post**: drop `.md`/`.mdx` in `src/content/blog/` matching schema:
  - required: `title`, `description`, `publishDate`, `category` (one of `BLOG_CATEGORIES`)
  - optional: `updatedDate`, `tags[]`, `featured`, `draft`, `heroImage` (`{ url, alt }`)
- **Work entry**: drop `.md`/`.mdx` in `src/content/work/` matching schema:
  - required: `title`, `description`, `category` (`ai` | `shopify` | `saas` | `open-source`)
  - optional: `stack[]`, `outcome`, `liveUrl`, `githubUrl`, `order`, `featured`
- **New page**: add `.astro` under `src/pages/`. Use `Page.astro` for standard pages, `BaseLayout.astro` for custom hero shells.

## Design system

Neobrutalist primitives live in `src/components/neobrutalist/` — `NeoCard`, `NeoButton`, `TagPill`, `BurstBadge`, `SpeechBubble`, `StickyNote`, `PanelDivider`, `HalftoneSection`, `ChecklistBox`, `ComparisonTable`, `CodeBlock`, `RobotMascot`, `PageNumber`, `AvailabilityBadge`, `SocialButton`, `TagPillRow`. Every variant is rendered live at `/styleguide/`.

Composites: `src/components/home/*`, `src/components/blog/*`, `src/components/work/ProjectCard.astro`.

## Conventions

- Path alias `@/*` resolves to `src/*` — prefer over relative `../../`.
- Astro `<style>` blocks are scoped by default. Global styles + tokens go in `src/styles/global.css`.
- Font usage: reference CSS vars `var(--font-display)` / `var(--font-sans)` / `var(--font-mono)`, or Tailwind utility classes `font-display`, `font-sans`, `font-mono`.
- Zod v4 syntax in schemas (`z.url()`, `z.coerce.date()`).
- Tailwind v4 — colors are CSS vars (`bg-yellow`, `text-ink`). Shadows are utilities (`shadow-neo-xs/sm/md/lg/xl`). No `tailwind.config.js`.
- Use `NeoCard` instead of hand-rolling bordered cards. Use `Page` layout for routine pages.
- Dynamic Tailwind classes (e.g. `bg-${tone}`) do not work — use static lookup maps (`Record<Tone, string>`).

## Deploy

GitHub Actions handle CI + deploy:
- `.github/workflows/ci.yml` — typecheck + build on PRs to main
- `.github/workflows/deploy.yml` — typecheck + build + `actions/deploy-pages` on push to `main` / `master`

Required repo settings: **Settings → Pages → Source: GitHub Actions**. Custom domain `ansezz.com` is set via `public/CNAME`.
