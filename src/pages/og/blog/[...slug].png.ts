import type { APIRoute } from "astro";
import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { SITE, CATEGORY_LABEL } from "@/consts";

// Resolve fonts from the project root — bundling relocates this module,
// so an import.meta.url-relative path can't be trusted at build time.
const fontPath = (name: string) => join(process.cwd(), "src/assets/og", name);

const display = readFileSync(fontPath("ArchivoBlack.ttf"));
const sans = readFileSync(fontPath("Inter-Bold.woff"));

const INK = "#0a0a0a";
const BG = "#fafaf5";
const YELLOW = "#ffd93d";
const PINK = "#ff2d87";

// Minimal hyperscript for satori's element shape (no JSX in a .ts endpoint).
type Node = { type: string; props: Record<string, unknown> };
const h = (
  type: string,
  props: Record<string, unknown>,
  children?: unknown,
): Node => ({
  type,
  props: { ...props, ...(children !== undefined ? { children } : {}) },
});

export const getStaticPaths = async () => {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  return posts.map((post) => ({ params: { slug: post.id }, props: { post } }));
};

export const GET: APIRoute = async ({ props }) => {
  const { post } = props as { post: CollectionEntry<"blog"> };
  const category = CATEGORY_LABEL[post.data.category] ?? "Blog";

  const tree = h(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        width: "1200px",
        height: "630px",
        backgroundColor: BG,
        padding: "64px",
        border: `16px solid ${INK}`,
        fontFamily: "Inter",
        justifyContent: "space-between",
      },
    },
    [
      // top row: category pill
      h("div", { style: { display: "flex" } }, [
        h(
          "div",
          {
            style: {
              display: "flex",
              backgroundColor: YELLOW,
              border: `5px solid ${INK}`,
              padding: "10px 28px",
              fontSize: "30px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "2px",
              boxShadow: `8px 8px 0 ${INK}`,
            },
          },
          category,
        ),
      ]),
      // title
      h(
        "div",
        {
          style: {
            display: "flex",
            fontFamily: "Archivo Black",
            fontSize: post.data.title.length > 60 ? "64px" : "82px",
            lineHeight: 1.02,
            color: INK,
            textTransform: "uppercase",
            letterSpacing: "-2px",
            maxWidth: "1040px",
          },
        },
        post.data.title,
      ),
      // footer: author + domain
      h(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `6px solid ${INK}`,
            paddingTop: "28px",
          },
        },
        [
          h(
            "div",
            {
              style: {
                display: "flex",
                fontFamily: "Archivo Black",
                fontSize: "40px",
                color: INK,
              },
            },
            [
              h("span", {}, SITE.SHORT_TITLE),
              h("span", { style: { color: PINK } }, "."),
            ],
          ),
          h(
            "div",
            {
              style: {
                display: "flex",
                fontSize: "28px",
                fontWeight: 700,
                color: INK,
                opacity: 0.7,
              },
            },
            "ansezz.com/blog",
          ),
        ],
      ),
    ],
  );

  const svg = await satori(tree as unknown as Parameters<typeof satori>[0], {
    width: 1200,
    height: 630,
    fonts: [
      { name: "Archivo Black", data: display, weight: 400, style: "normal" },
      { name: "Inter", data: sans, weight: 700, style: "normal" },
    ],
  });

  const png = new Resvg(svg, {
    fitTo: { mode: "width", value: 1200 },
  })
    .render()
    .asPng();

  return new Response(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
