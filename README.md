# ansezz.com

```
 █████╗ ███╗   ██╗███████╗███████╗███████╗███████╗
██╔══██╗████╗  ██║██╔════╝██╔════╝╚══███╔╝╚══███╔╝
███████║██╔██╗ ██║███████╗█████╗    ███╔╝   ███╔╝
██╔══██║██║╚██╗██║╚════██║██╔══╝   ███╔╝   ███╔╝
██║  ██║██║ ╚████║███████║███████╗███████╗███████╗
╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝╚══════╝╚══════╝╚══════╝
```

> Personal portfolio + blog of **Anass Ez-zouaine** — Senior Lead Backend Engineer · Software Architect · AI Engineer.
> Comic-book editorial **neobrutalism**. Thick borders. Hard shadows. Zero gradients.

[![Built with Astro](https://img.shields.io/badge/Built_with-Astro_6-FF5D01?style=flat-square&logo=astro&logoColor=white&labelColor=0a0a0a)](https://astro.build)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-v4-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white&labelColor=0a0a0a)](https://tailwindcss.com)
[![TypeScript Strict](https://img.shields.io/badge/TypeScript-strict-3178C6?style=flat-square&logo=typescript&logoColor=white&labelColor=0a0a0a)](https://www.typescriptlang.org/)
[![License MIT](https://img.shields.io/badge/License-MIT-FFD93D?style=flat-square&labelColor=0a0a0a)](#license)

---

## ▸ What this is

A static site for [**ansezz.com**](https://ansezz.com). Showcases shipped work, writing on Laravel + AI + Shopify, and how to hire me. Built on Astro 6 with content collections, full SEO/JSON-LD, sitemap, RSS, OG image, and a hand-rolled neobrutalist component library.

| Page           | Purpose                                                            |
| -------------- | ------------------------------------------------------------------ |
| `/`            | Trading-card hero, what I build, services, featured posts          |
| `/about/`      | 3-step process, stack, principles, languages                       |
| `/work/`       | 60+ shipped projects — Laravel SaaS, Shopify apps, AI, open source |
| `/blog/`       | Notes on backend, AI engineering, Shopify, DevOps                  |
| `/uses/`       | Daily drivers, 8 stack lanes, what I dropped                       |
| `/contact/`    | Engagement modes, FAQ, channels                                    |
| `/styleguide/` | Internal — every component & token                                 |

---

## ▸ Stack

```
Astro 6              Static site generator + content collections
Tailwind CSS v4      In-CSS @theme tokens, no config file
TypeScript           Strict mode, path alias @/* → src/*
MDX + Shiki          Authoring + github-dark code highlighting
astro-icon           Lucide icon set inline-rendered
reading-time         Word count + estimated read on every post
@astrojs/sitemap     Sitemap-index.xml + per-page priorities
@astrojs/rss         /rss.xml feed
sharp                Build-time image optimization
Plausible            EU-hosted analytics — zero cookies
```

---

## ▸ Design system

Hand-built neobrutalist primitives in `src/components/neobrutalist/`:

```
NeoCard         9 tones × 4 shadow sizes × tilt & hover
NeoButton       primary | secondary | ghost | danger | ink — 3 sizes
TagPill         9 tones · active state · clickable variant
BurstBadge      3 sizes · 7 tones · explosive starbursts
SpeechBubble    4 tail positions · 5 tones
StickyNote      tilt prop, 4 paper-toned variants
PanelDivider    zigzag · bolt · burst · dots
HalftoneSection cyan/yellow/blue ben-day overlay backgrounds
ChecklistBox    titled, checked/unchecked items
ComparisonTable header × rows with icon + boolean cells
CodeBlock       Shiki-rendered with filename chrome
RobotMascot     4 tones, sized SVG mascot
PageNumber      magazine-style numerals (tl/tr/bl/br)
AvailabilityBadge, SocialButton, TagPillRow, NewsletterCallout, ...
```

Tokens (in `src/styles/global.css` `@theme`):

- **Colors** — `bg`, `paper`, `ink`, `yellow`, `pink`, `pink-deep`, `cyan`, `green`, `red`, `blue`, `purple`
- **Shadows** — `shadow-neo-xs` (2px) → `shadow-neo-xl` (12px), all hard offset
- **Type** — `display-xl/l/m` clamp scale, Archivo Black + Inter + JetBrains Mono

Every component & token rendered live at [`/styleguide/`](https://ansezz.com/styleguide/).

---

## ▸ Architecture

```
src/
├── components/
│   ├── neobrutalist/    Atomic design primitives
│   ├── home/            Hero, WhatIDo, Services, Stats, FeaturedPosts, …
│   ├── blog/            PostCard, PostMeta, ShareBar, ReadingProgress,
│   │                    TableOfContents, RelatedPosts, AuthorFooter
│   ├── work/            ProjectCard
│   └── layout/          Header, Footer, Nav
├── content/
│   ├── blog/            *.md / *.mdx
│   ├── work/            *.md — 26 project entries
│   └── content.config.ts (zod schemas)
├── layouts/             BaseLayout · Page
├── lib/                 seo, links, reading
├── pages/               file-based routing
├── styles/global.css    Tailwind v4 entry + @theme tokens
└── consts.ts            single source of truth — SITE, OWNER, NAV, …
```

Path alias `@/*` resolves to `src/*`.

---

## ▸ Commands

```bash
pnpm install            # one-time
pnpm dev                # localhost:4321
pnpm build              # → dist/
pnpm preview            # serve dist/
pnpm check              # astro check + typescript
pnpm format             # prettier
pnpm optimize:images    # sharp pass over public/blog
pnpm generate:icons     # PWA + apple-touch icons
```

---

## ▸ Content

**Blog post** — drop `.md` or `.mdx` in `src/content/blog/`:

```yaml
---
title: "Shopify Liquid vs Headless — when to pick which"
description: "Decision tree for storefronts you actually have to ship."
publishDate: 2026-05-10
category: shopify # laravel | ai | shopify | devops | architecture | career
tags: [Shopify, Hydrogen, Liquid]
featured: false
draft: false
heroImage: /blog/liquid-vs-headless.webp
---
```

**Work entry** — drop `.md` in `src/content/work/` (see schema in `src/content.config.ts`).

---

## ▸ Deploy — Cloudflare Pages

Connected to **Cloudflare Pages** project `ansezz-com`. Auto-deploys on push to `main` from GitHub.

**Cloudflare Pages settings** (Settings → Build & deployments):

```
Build image:       v3              ← REQUIRED (v1 ships Node 18, Astro 6 needs ≥22.12)
Framework preset:  Astro
Build command:     pnpm install --frozen-lockfile && pnpm build
Build output dir:  dist
Root directory:    /
```

**Environment variables** (Settings → Variables):

```
NODE_VERSION = 22
```

Repo-level pins (already committed):

- `.nvmrc` → `22`
- `.node-version` → `22.12.0`
- `package.json` `packageManager` → `pnpm@10.8.1` (Cloudflare v3 detects this)

`public/_headers` and `public/_redirects` are honored automatically by Cloudflare Pages — CSP, security headers, immutable cache rules, and SPA-style 404 fallback all ship as-is.

Domain wiring (already live):

- Production: `ansezz.com` + `ansezz-com.pages.dev`
- DNS: `ansezz.com` proxied through Cloudflare (orange cloud)

**If a deploy fails** with `Node.js v18 is not supported`, the project is still on Build Image v1. Switch to v3 in Cloudflare dashboard → Settings → Build & deployments → Build image.

---

## ▸ SEO checklist (shipped)

```
✓ Person + WebSite + ProfessionalService JSON-LD on home
✓ WebPage + BreadcrumbList on category/tag pages
✓ Article JSON-LD on every blog post
✓ /sitemap-index.xml with per-page priority + changefreq
✓ /rss.xml RSS 2.0 feed
✓ Open Graph + Twitter Card images
✓ /robots.txt — disallows styleguide
✓ Canonical URLs + en lang attribute
```

---

## ▸ Style / contribution

- Prettier + `prettier-plugin-astro` + `prettier-plugin-tailwindcss`
- No lint command — Astro check enforces types
- File org: many small files (≤ 400 lines) over few large ones
- Astro `<style>` blocks are scoped; global styles in `global.css`
- Don't add Tailwind config — v4 reads `@theme` from CSS

---

## ▸ Credits

- **Astro** team for v6
- **Tailwind Labs** for v4's CSS-first approach
- **Lucide** icon set
- **IBM Plex Mono** / **Inter** / **Archivo Black** typefaces

---

## License

MIT — fork it, ship your own portfolio. Just don't copy my face. ⚡

```
   ▸ Built with caffeine, Claude, and an unreasonable
     amount of border-[3px] border-ink shadow-neo-md.
```
