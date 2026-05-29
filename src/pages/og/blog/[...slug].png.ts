import type { APIRoute } from "astro";
import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";
import { CATEGORY_LABEL } from "@/consts";
import { renderOgCard, ogPngResponse } from "@/lib/og";

export const getStaticPaths = async () => {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  return posts.map((post) => ({ params: { slug: post.id }, props: { post } }));
};

export const GET: APIRoute = async ({ props }) => {
  const { post } = props as { post: CollectionEntry<"blog"> };
  const png = await renderOgCard({
    label: CATEGORY_LABEL[post.data.category] ?? "Blog",
    title: post.data.title,
    footer: "ansezz.com/blog",
  });
  return ogPngResponse(png);
};
