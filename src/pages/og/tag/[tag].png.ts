import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { tagSlug } from "@/lib/links";
import { renderOgCard, ogPngResponse } from "@/lib/og";

export const getStaticPaths = async () => {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  const tagMap = new Map<string, string>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      const slug = tagSlug(tag);
      if (!tagMap.has(slug)) tagMap.set(slug, tag);
    }
  }
  return [...tagMap.entries()].map(([slug, display]) => ({
    params: { tag: slug },
    props: { display },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const { display } = props as { display: string };
  const png = await renderOgCard({
    label: "Tag",
    title: `#${display}`,
    footer: "ansezz.com/blog",
  });
  return ogPngResponse(png);
};
