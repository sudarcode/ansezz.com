import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import rehypeExternalLinks from "rehype-external-links";

import { SITE } from "./src/consts";

const siteHost = new URL(SITE.URL).hostname;

// https://astro.build/config
export default defineConfig({
  site: SITE.URL,
  prefetch: { defaultStrategy: "hover" },
  vite: {
    plugins: [tailwindcss()],
  },
  fonts: [
    {
      name: "Archivo Black",
      cssVariable: "--font-display",
      provider: fontProviders.google(),
      weights: [400],
      styles: ["normal"],
    },
    {
      name: "Inter",
      cssVariable: "--font-sans",
      provider: fontProviders.google(),
      weights: [400, 500, 600, 700, 800],
      styles: ["normal"],
    },
    {
      name: "JetBrains Mono",
      cssVariable: "--font-mono",
      provider: fontProviders.google(),
      weights: [400, 500, 700],
      styles: ["normal"],
    },
  ],
  markdown: {
    shikiConfig: {
      theme: "github-dark",
      wrap: true,
    },
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: "_blank",
          rel: ["noopener", "noreferrer"],
          test: (node) => {
            const href = node.properties?.href;
            if (typeof href !== "string") return false;
            if (href.startsWith("#") || href.startsWith("/")) return false;
            if (
              href.startsWith("mailto:") ||
              href.startsWith("tel:") ||
              href.startsWith("sms:")
            ) {
              return false;
            }
            try {
              return new URL(href).hostname !== siteHost;
            } catch {
              return false;
            }
          },
        },
      ],
    ],
  },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) =>
        !page.includes("/styleguide") && !page.includes("/404"),
      changefreq: "weekly",
      priority: 0.7,
      serialize(item) {
        if (item.url === SITE.URL || item.url === `${SITE.URL}/`) {
          return { ...item, priority: 1.0, changefreq: "weekly" };
        }
        if (item.url.includes("/blog/") && item.url !== `${SITE.URL}/blog/`) {
          return { ...item, priority: 0.8, changefreq: "monthly" };
        }
        if (item.url.endsWith("/blog/")) {
          return { ...item, priority: 0.9, changefreq: "daily" };
        }
        return item;
      },
    }),
    icon(),
  ],
});
