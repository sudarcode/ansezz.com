import type { APIRoute } from "astro";
import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";
import { renderOgCard, ogPngResponse } from "@/lib/og";

const CATEGORY: Record<string, string> = {
  ai: "AI Engineering",
  shopify: "Shopify Plus",
  saas: "SaaS Platform",
};

export const getStaticPaths = async () => {
  const entries = await getCollection("work", ({ data }) => data.featured);
  return entries.map((entry) => ({
    params: { slug: entry.id },
    props: { entry },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const { entry } = props as { entry: CollectionEntry<"work"> };
  const png = await renderOgCard({
    label: CATEGORY[entry.data.category] ?? "Work",
    title: entry.data.title,
    footer: "ansezz.com/work",
  });
  return ogPngResponse(png);
};
