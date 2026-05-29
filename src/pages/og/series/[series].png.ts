import type { APIRoute } from "astro";
import { BLOG_SERIES } from "@/consts";
import { renderOgCard, ogPngResponse } from "@/lib/og";

export const getStaticPaths = async () =>
  BLOG_SERIES.map((s) => ({
    params: { series: s.slug },
    props: { series: s },
  }));

export const GET: APIRoute = async ({ props }) => {
  const { series } = props as { series: (typeof BLOG_SERIES)[number] };
  const png = await renderOgCard({
    label: "Series",
    title: series.title,
    footer: "ansezz.com/blog",
  });
  return ogPngResponse(png);
};
