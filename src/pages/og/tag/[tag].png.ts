import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { tagSlug } from "@/lib/links";
import { renderOgCard, ogPngResponse } from "@/lib/og";
import { TAG_OG_MIN_POSTS } from "@/consts";

// Only generate OG cards for tags with enough posts to be worth sharing.
export const getStaticPaths = async () => {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  const tagMap = new Map<string, { display: string; count: number }>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      const slug = tagSlug(tag);
      const entry = tagMap.get(slug) ?? { display: tag, count: 0 };
      entry.count += 1;
      tagMap.set(slug, entry);
    }
  }
  return [...tagMap.entries()]
    .filter(([, v]) => v.count >= TAG_OG_MIN_POSTS)
    .map(([slug, v]) => ({
      params: { tag: slug },
      props: { display: v.display },
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
