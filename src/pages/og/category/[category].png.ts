import type { APIRoute } from "astro";
import { BLOG_CATEGORIES, CATEGORY_LABEL } from "@/consts";
import { renderOgCard, ogPngResponse } from "@/lib/og";

export const getStaticPaths = async () =>
  BLOG_CATEGORIES.map((category) => ({ params: { category } }));

export const GET: APIRoute = async ({ params }) => {
  const category = params.category as keyof typeof CATEGORY_LABEL;
  const png = await renderOgCard({
    label: "Category",
    title: `${CATEGORY_LABEL[category] ?? category} posts`,
    footer: "ansezz.com/blog",
  });
  return ogPngResponse(png);
};
