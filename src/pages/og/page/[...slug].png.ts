import type { APIRoute } from "astro";
import { PAGE_OG } from "@/lib/og-pages";
import { renderOgCard, ogPngResponse } from "@/lib/og";

export const getStaticPaths = async () =>
  PAGE_OG.map((p) => ({ params: { slug: p.slug }, props: { page: p } }));

export const GET: APIRoute = async ({ props }) => {
  const { page } = props as { page: (typeof PAGE_OG)[number] };
  const png = await renderOgCard({ label: page.label, title: page.title });
  return ogPngResponse(png);
};
