export const SITE = {
  URL: "https://ansezz.com",
  TITLE: "Anass Ez-zouaine",
  SHORT_TITLE: "ansezz",
  DESCRIPTION:
    "Senior Lead Backend Engineer, Software Architect, and AI Engineer. Laravel, Shopify, RAG, agentic AI.",
  EMAIL: "ans-ezzouaine@hotmail.com",
  PHONE: "+212679405863",
  PHONE_DISPLAY: "+212 679 40 58 63",
  BOOKING_URL: "https://calendar.app.google/x1eeuSb9UuMGF4pD9",
  LOCATION: "Meknes, Morocco",
  TZ: "GMT+1",
};

export const OWNER = {
  NAME: "Anass Ez-zouaine",
  ROLES: ["Senior Lead Backend Engineer", "Software Architect", "AI Engineer"],
  HIGHLIGHT: "AI Engineer",
  TAGLINE: "I ship backends that scale and AI features that actually work.",
  CURRENTLY: "Building agentic commerce and RAG pipelines on Laravel + Shopify.",
  REMOTE_SINCE: 2014,
  CONSULTING_SINCE: 2022,
};

export const AVAILABLE_FOR = [
  "Senior / Staff Engineer",
  "Tech Lead",
  "Software Architect",
  "Fractional CTO",
  "Technical Co-Founder",
  "MVP Build",
  "AI Integration Sprint",
];

export const STATS = [
  { value: "10+", label: "Years remote" },
  { value: "50+", label: "Projects shipped" },
  { value: "2", label: "Companies co-founded" },
  { value: "∞", label: "Bugs squashed" },
];

export const SOCIALS = [
  { NAME: "GitHub", HREF: "https://github.com/ansezz", ICON: "lucide:github" },
  { NAME: "LinkedIn", HREF: "https://linkedin.com/in/ansezz", ICON: "lucide:linkedin" },
  { NAME: "Email", HREF: "mailto:ans-ezzouaine@hotmail.com", ICON: "lucide:mail" },
  { NAME: "Phone", HREF: "tel:+212679405863", ICON: "lucide:phone" },
  { NAME: "Book a call", HREF: "https://calendar.app.google/x1eeuSb9UuMGF4pD9", ICON: "lucide:calendar" },
  { NAME: "RSS", HREF: "/rss.xml", ICON: "lucide:rss" },
];

export const NAV = [
  { LABEL: "Home", HREF: "/" },
  { LABEL: "About", HREF: "/about/" },
  { LABEL: "Work", HREF: "/work/" },
  { LABEL: "Blog", HREF: "/blog/" },
  { LABEL: "Uses", HREF: "/uses/" },
  { LABEL: "Contact", HREF: "/contact/" },
];

export const HOME = {
  TITLE: "Home",
  DESCRIPTION:
    "Senior Lead Backend Engineer and AI Engineer building Laravel + Shopify systems and agentic AI products.",
};

export const ABOUT = {
  TITLE: "About",
  DESCRIPTION:
    "Backend engineer, architect, and AI builder based in Meknes. Remote since 2014.",
};

export const WORK = {
  TITLE: "Work",
  DESCRIPTION:
    "Selected projects across AI engineering, Shopify Plus, SaaS platforms, and open source.",
};

export const BLOG = {
  TITLE: "Blog",
  DESCRIPTION:
    "Notes on Laravel, AI engineering, Shopify Plus, DevOps, and software architecture.",
};

export const USES = {
  TITLE: "Uses",
  DESCRIPTION: "The stack and tools I reach for.",
};

export const CONTACT = {
  TITLE: "Contact",
  DESCRIPTION:
    "Building an AI-powered SaaS, scaling a Laravel/Shopify app, or shipping AI features? Let's talk.",
};

export const BLOG_CATEGORIES = [
  "laravel",
  "ai",
  "shopify",
  "devops",
  "architecture",
  "career",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export const CATEGORY_COLOR: Record<BlogCategory, string> = {
  laravel: "var(--color-red)",
  ai: "var(--color-cyan)",
  shopify: "var(--color-green)",
  devops: "var(--color-blue)",
  architecture: "var(--color-yellow)",
  career: "var(--color-pink)",
};

export const CATEGORY_LABEL: Record<BlogCategory, string> = {
  laravel: "Laravel",
  ai: "AI",
  shopify: "Shopify",
  devops: "DevOps",
  architecture: "Architecture",
  career: "Career",
};

export const CATEGORY_TONE: Record<
  BlogCategory,
  "red" | "cyan" | "green" | "blue" | "yellow" | "pink"
> = {
  laravel: "red",
  ai: "cyan",
  shopify: "green",
  devops: "blue",
  architecture: "yellow",
  career: "pink",
};

export const CARD_TONES = ["paper", "yellow", "cyan", "green", "pink", "red"] as const;
export type CardTone = (typeof CARD_TONES)[number];

export const ACCENT_TONES = ["yellow", "pink", "cyan", "green", "red", "blue"] as const;
export type AccentTone = (typeof ACCENT_TONES)[number];
