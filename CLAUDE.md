# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Monolume — Astro 6 portfolio theme. Static site. Astro + Tailwind CSS v4 + TypeScript (strict).
Package manager: `pnpm` (pinned via `packageManager` in `package.json`).

## Commands

| Command | Action |
|---------|--------|
| `pnpm install` | Install deps |
| `pnpm dev` | Dev server at `localhost:4321` |
| `pnpm build` | Build to `./dist/` |
| `pnpm preview` | Preview built site |
| `pnpm astro check` | Type-check `.astro` + TS (run before declaring work done) |
| `pnpm astro add <integration>` | Add Astro integration |

No test runner configured. No lint command — Prettier formats (`prettier-plugin-astro`, `prettier-plugin-tailwindcss`).

## Architecture

Content-driven static site. Three pillars:

1. **Content collections** (`src/content.config.ts`) — `blog` and `projects` defined via `glob` loader, schemas validated with `astro/zod`. Markdown/MDX files live in `src/content/blog/` and `src/content/projects/`. Editing schema = updating frontmatter across all entries.

2. **Pages** (`src/pages/`) — file-based routing. Dynamic routes `[...id].astro` under `blog/` and `projects/` render collection entries via `getStaticPaths` + `render(entry)`. `index.astro` is home, `404.astro` is fallback.

3. **Site config** (`src/consts.ts`) — single source of truth for `SITE`, `HOME`, `BLOG`, `PROJECTS`, `SOCIALS`. `astro.config.mjs` reads `SITE.URL` for sitemap. Update consts before deploy (placeholders: `your_site.com`, `your_username`).

### Key wiring

- `astro.config.mjs` — declares Google fonts via `fontProviders.google()` exposing CSS vars `--font-plex` (IBM Plex Mono) and `--font-geist`. Sitemap integration enabled. Tailwind v4 loaded as Vite plugin (no `tailwind.config.js`).
- `tsconfig.json` — extends `astro/tsconfigs/strict`, path alias `@/*` → `src/*`.
- `src/layouts/Layout.astro` — shared shell wrapping all pages (`Head` + `Header` + `Footer`).
- `src/styles/global.css` — Tailwind v4 entry (`@import "tailwindcss"`) + global tokens.

### Adding content

- New blog post: drop `.md`/`.mdx` in `src/content/blog/` matching schema (`title`, `description`, `date`, optional `draft`/`tags`/`series`/`image`).
- New project: drop `.md`/`.mdx` in `src/content/projects/` matching schema (`title`, `description`, required `image`, optional `liveUrl`/`githubUrl`).
- New page: add `.astro` under `src/pages/`. Use `Layout.astro` for consistent shell.

## Conventions

- Path alias `@/*` resolves to `src/*` — prefer over relative `../../`.
- Astro `<style>` blocks are scoped by default. Global styles go in `src/styles/global.css`.
- Font usage: reference CSS vars `var(--font-plex)` / `var(--font-geist)`.
- Zod v4 syntax in schemas (`z.url()`, `z.coerce.date()`).
