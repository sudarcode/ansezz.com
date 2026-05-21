export const SITE = {
  URL: "https://ansezz.com",
  TITLE: "Anass Ez-zouaine — Senior Backend Engineer · Software Architect · AI Engineer",
  SHORT_TITLE: "ansezz",
  DESCRIPTION:
    "Senior Lead Backend Engineer, Software Architect, and AI Engineer. 12+ years building production Laravel SaaS, Shopify Plus apps, and AI features (Claude, MCP, RAG, agentic systems). Remote-first since 2014.",
  EMAIL: "me@ansezz.com",
  PHONE: "+212679405863",
  PHONE_DISPLAY: "+212 679 40 58 63",
  BOOKING_URL: "https://calendar.app.google/x1eeuSb9UuMGF4pD9",
  RESUME_URL: "/Anass-Ez-zouaine-Resume.pdf",
  LOCATION: "Meknes, Morocco",
  TZ: "GMT+1",
};

export const OWNER = {
  NAME: "Anass Ez-zouaine",
  ROLES: [
    "Senior Lead Backend Engineer",
    "Software Architect",
    "AI Engineer",
  ],
  HIGHLIGHT: "AI Engineer",
  TAGLINE:
    "I ship production backends, Shopify Plus apps, and AI features that survive real users — Laravel + Anthropic Claude + pgvector, every day.",
  CURRENTLY:
    "Productionizing agentic commerce, MCP servers, and RAG pipelines on Laravel + Shopify.",
  YEARS_EXPERIENCE: 12,
  REMOTE_SINCE: 2014,
  CONSULTING_SINCE: 2022,
  STATUS: "Open for senior / lead / advisory engagements",
};

export const AVAILABLE_FOR = [
  "Senior / Staff Engineer",
  "Tech Lead",
  "Software Architect",
  "Fractional CTO",
  "Technical Co-Founder",
  "MVP Build",
  "AI Integration Sprint",
  "Architecture Audit",
];

export const STATS = [
  { value: "12+", label: "Years shipping" },
  { value: "60+", label: "Production builds" },
  { value: "3", label: "Continents served" },
  { value: "∞", label: "Bugs squashed" },
];

export const SOCIALS = [
  { NAME: "GitHub", HREF: "https://github.com/ansezz", ICON: "lucide:github" },
  {
    NAME: "LinkedIn",
    HREF: "https://linkedin.com/in/ansezz",
    ICON: "lucide:linkedin",
  },
  { NAME: "X", HREF: "https://x.com/ansezz", ICON: "lucide:twitter" },
  {
    NAME: "Threads",
    HREF: "https://www.threads.com/@ansezz",
    ICON: "lucide:at-sign",
  },
  {
    NAME: "Instagram",
    HREF: "https://instagram.com/ansezz",
    ICON: "lucide:instagram",
  },
  {
    NAME: "Facebook",
    HREF: "https://facebook.com/ansezz",
    ICON: "lucide:facebook",
  },
  { NAME: "Email", HREF: "mailto:me@ansezz.com", ICON: "lucide:mail" },
  { NAME: "Phone", HREF: "tel:+212679405863", ICON: "lucide:phone" },
  {
    NAME: "Book a call",
    HREF: "https://calendar.app.google/x1eeuSb9UuMGF4pD9",
    ICON: "lucide:calendar",
  },
  {
    NAME: "Resume (PDF)",
    HREF: "/Anass-Ez-zouaine-Resume.pdf",
    ICON: "lucide:file-text",
  },
  { NAME: "RSS", HREF: "/rss.xml", ICON: "lucide:rss" },
];

export const X_HANDLE = "ansezz";

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
    "Senior Lead Backend Engineer, Software Architect, and AI Engineer. 12+ years shipping Laravel SaaS, Shopify Plus apps, and AI features (Claude, MCP, RAG, agentic systems).",
};

export const ABOUT = {
  TITLE: "About",
  DESCRIPTION:
    "Senior backend engineer and AI engineer with 12+ years of remote-only experience. Multi-tenant B2B SaaS, Shopify Plus apps, and production AI on Laravel.",
};

export const WORK = {
  TITLE: "Work",
  DESCRIPTION:
    "Selected projects across AI engineering, Shopify Plus, SaaS platforms, and open source — what I've shipped, what I learned, what survived production.",
};

export const BLOG = {
  TITLE: "Blog",
  DESCRIPTION:
    "Notes on Laravel internals, AI engineering with Anthropic Claude and MCP, RAG pipelines, Shopify Plus, DevOps, and software architecture.",
};

export const USES = {
  TITLE: "Uses",
  DESCRIPTION:
    "My production stack: Laravel, PostgreSQL, pgvector, Anthropic Claude, MCP, Shopify Plus, Coolify. Tools earn their spot by shipping, not hype.",
};

export const CONTACT = {
  TITLE: "Contact",
  DESCRIPTION:
    "Hire me for senior / lead / fractional CTO / advisory work — Laravel SaaS, Shopify Plus apps, AI feature integration, architecture audits, MVP builds.",
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

export const CARD_TONES = [
  "paper",
  "yellow",
  "cyan",
  "green",
  "pink",
  "red",
  "purple",
] as const;
export type CardTone = (typeof CARD_TONES)[number];

export const WHAT_I_DO = [
  {
    icon: "lucide:server",
    tone: "red" as const,
    title: "Laravel SaaS that scales",
    body: "Multi-tenant B2B platforms, Octane workers, Horizon queues, Filament admins, idempotency, event sourcing, observability. Production-ready from day one.",
    href: "/work/",
    cta: "See builds",
  },
  {
    icon: "lucide:shopping-bag",
    tone: "green" as const,
    title: "Shopify Plus apps",
    body: "Public + private apps, App Bridge admin UI, GraphQL Admin & Catalog API, billing, webhooks, protected customer data, Shopify Functions, agentic commerce.",
    href: "/work/",
    cta: "See apps",
  },
  {
    icon: "lucide:brain-circuit",
    tone: "purple" as const,
    title: "AI engineering",
    body: "Anthropic Claude + MCP servers, OpenAI SDK, RAG on pgvector, agentic workflows, evaluation harnesses. Pragmatic AI that ships, not vibes.",
    href: "/blog/category/ai/",
    cta: "Read the posts",
  },
  {
    icon: "lucide:compass",
    tone: "cyan" as const,
    title: "Architecture & leadership",
    body: "Tech lead, fractional CTO, architecture reviews, hiring, mentorship. Senior engineers in a shipping mindset, not a tech-debt spiral.",
    href: "/contact/",
    cta: "Talk to me",
  },
];

export const SERVICES = [
  {
    title: "MVP Build (4-12 weeks)",
    tone: "yellow" as const,
    body: "From whiteboard to production. Auth, multi-tenancy, billing, dashboards, deployment. Laravel + your stack.",
    bullets: [
      "Architecture & schema design",
      "Auth + RBAC + tenancy",
      "Stripe / Paddle billing",
      "CI/CD + zero-downtime deploy",
    ],
  },
  {
    title: "AI Integration Sprint (2-4 weeks)",
    tone: "purple" as const,
    body: "Add real AI to an existing product. Claude, MCP, RAG, agents, with evals — not a demo, a feature.",
    bullets: [
      "Claude API + tool use",
      "MCP server build",
      "RAG on pgvector + hybrid search",
      "Eval harness + cost guardrails",
    ],
  },
  {
    title: "Shopify Plus App",
    tone: "green" as const,
    body: "Public or private app — embedded admin, billing, webhooks, App Bridge, GraphQL, billing, Shopify Functions.",
    bullets: [
      "Embedded admin (App Bridge)",
      "Billing + dunning + analytics",
      "Catalog / Orders / Customer APIs",
      "Protected customer data review",
    ],
  },
  {
    title: "Architecture Audit",
    tone: "cyan" as const,
    body: "A senior set of eyes on your stack, before you scale. Code, schema, infra, deployment, risk.",
    bullets: [
      "1-week deep audit",
      "Risk + cost report",
      "12-week remediation plan",
      "Optional pair-programming follow-up",
    ],
  },
];

export const LANGUAGES = [
  { label: "Arabic", level: "Native" },
  { label: "English", level: "Professional" },
  { label: "French", level: "Basic" },
];

export interface OtherProjectLink {
  name: string;
  url: string;
  note: string;
  tone: "yellow" | "pink" | "cyan" | "green" | "red" | "blue" | "purple" | "ink";
}

export const OTHER_SHOPIFY_STOREFRONTS: OtherProjectLink[] = [
  {
    name: "Inked Shop",
    url: "https://www.inkedshop.com/",
    note: "Apparel + lifestyle DTC",
    tone: "pink",
  },
  {
    name: "Pure Craft CBD",
    url: "https://pure-craft-cbd.myshopify.com/",
    note: "CBD DTC w/ age-gate + compliance",
    tone: "green",
  },
  {
    name: "Freestyle USA",
    url: "https://www.freestyleusa.com/",
    note: "Watches + lifestyle goods",
    tone: "yellow",
  },
  {
    name: "Neven Eyewear",
    url: "https://neveneyewear.com/",
    note: "Sunglasses + Rx flow",
    tone: "cyan",
  },
  {
    name: "Naví Eyewear",
    url: "https://navieyewear.com/",
    note: "Prescription eyewear",
    tone: "blue",
  },
  {
    name: "Mike Tyson Store",
    url: "https://miketyson.com/",
    note: "Celebrity DTC, spike-ready",
    tone: "red",
  },
  {
    name: "Montrichard",
    url: "https://www.montrichardwatch.com/",
    note: "Watches DTC",
    tone: "purple",
  },
  {
    name: "Printworks Market US",
    url: "https://printworksmarket.us/",
    note: "Print on demand storefront",
    tone: "yellow",
  },
  {
    name: "Printworks Market",
    url: "https://printworksmarket.com/",
    note: "Print on demand storefront",
    tone: "cyan",
  },
  {
    name: "Encrouter",
    url: "https://www.encrouter.com/",
    note: "DTC storefront",
    tone: "pink",
  },
  {
    name: "Mina Basta Polare",
    url: "https://minabastapolare.se/",
    note: "Swedish DTC",
    tone: "green",
  },
  {
    name: "LiveFresh",
    url: "http://livefresh.de/",
    note: "German DTC",
    tone: "red",
  },
  {
    name: "Makan Home",
    url: "https://makanhome.ae/",
    note: "UAE home goods, bilingual",
    tone: "purple",
  },
  {
    name: "Kurtains",
    url: "https://kurtains.ae/",
    note: "UAE home goods, RTL",
    tone: "blue",
  },
  {
    name: "Moroccan Goods",
    url: "https://moroccangoods.shop/",
    note: "DTC heritage goods",
    tone: "yellow",
  },
];

export const OTHER_SHOPIFY_APPS: OtherProjectLink[] = [
  {
    name: "Protect App",
    url: "https://apps.shopify.com/protect-app",
    note: "Shipping protection at checkout",
    tone: "red",
  },
  {
    name: "XCO Agency partner page",
    url: "https://apps.shopify.com/partners/xco-agency-llc",
    note: "Full Shopify app portfolio",
    tone: "ink",
  },
];

export const OTHER_PLATFORMS: OtherProjectLink[] = [
  {
    name: "NextMedia",
    url: "https://www.nextmedia.ma/",
    note: "Media group portal",
    tone: "blue",
  },
  {
    name: "Medi1",
    url: "https://www.medi1.com/",
    note: "Radio + live stream",
    tone: "cyan",
  },
  {
    name: "Edigrains",
    url: "https://edigrains.mobiletic.com/",
    note: "Content-creation SaaS",
    tone: "green",
  },
  {
    name: "Tekency",
    url: "https://tekency.com/",
    note: "Agency portal",
    tone: "yellow",
  },
  {
    name: "LE Ventures",
    url: "https://leventures.com/",
    note: "Studio + product portfolio",
    tone: "pink",
  },
  {
    name: "Proxify profile",
    url: "https://proxify.io/",
    note: "Vetted senior developer",
    tone: "purple",
  },
  {
    name: "Upwork profile",
    url: "https://www.upwork.com/freelancers/~011077fb7451836916",
    note: "Top-rated freelance history",
    tone: "green",
  },
];
