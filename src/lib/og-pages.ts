// Curated OG cards for the main static pages. Single source of truth for
// both the generator endpoint (/og/page/[slug].png) and the per-page image
// resolution in Page.astro.

export interface PageOg {
  slug: string;
  path: string; // canonical pathname, trailing slash
  label: string; // eyebrow shown in the card pill
  title: string; // headline on the card
}

export const PAGE_OG: PageOg[] = [
  {
    slug: "home",
    path: "/",
    label: "ansezz",
    title: "Backends that survive production. AI that ships.",
  },
  {
    slug: "about",
    path: "/about/",
    label: "About",
    title: "Senior engineer. 12+ years. Remote-first.",
  },
  {
    slug: "work",
    path: "/work/",
    label: "Work",
    title: "Things I built. Most still shipping.",
  },
  {
    slug: "services",
    path: "/services/",
    label: "Services",
    title: "Senior engineering, by the engagement.",
  },
  {
    slug: "blog",
    path: "/blog/",
    label: "Blog",
    title: "Notes from the trenches.",
  },
  {
    slug: "uses",
    path: "/uses/",
    label: "Uses",
    title: "The stack that earns its spot.",
  },
  {
    slug: "contact",
    path: "/contact/",
    label: "Contact",
    title: "Let's build something that ships.",
  },
  {
    slug: "now",
    path: "/now/",
    label: "Now",
    title: "What I'm doing right now.",
  },
  {
    slug: "newsletter",
    path: "/newsletter/",
    label: "Newsletter",
    title: "The no-fluff engineering list.",
  },
  {
    slug: "tools",
    path: "/tools/",
    label: "Free tools",
    title: "Tools I built because I needed them.",
  },
  {
    slug: "library",
    path: "/library/",
    label: "Library",
    title: "Books, tools & repos I recommend.",
  },
];

const BY_PATH = new Map(PAGE_OG.map((p) => [p.path, p]));

/** Returns the generated OG image path for a pathname, or null if none. */
export function pageOgPath(pathname: string): string | null {
  const normalized = pathname.endsWith("/") ? pathname : `${pathname}/`;
  const match = BY_PATH.get(normalized) ?? BY_PATH.get(pathname);
  return match ? `/og/page/${match.slug}.png` : null;
}
