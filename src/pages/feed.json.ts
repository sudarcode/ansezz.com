import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import MarkdownIt from "markdown-it";
import sanitizeHtml from "sanitize-html";
import { SITE, OWNER } from "@/consts";

// NOTE: rendered with markdown-it, not the MDX compiler — faithful for the
// current plain-Markdown posts; MDX components would not render here.
const parser = new MarkdownIt({ html: true, linkify: true });

function absolutize(html: string, base: string): string {
  const b = base.replace(/\/$/, "");
  return html
    .replace(/(src|href)="\/(?!\/)/g, `$1="${b}/`)
    .replace(/(src|href)='\/(?!\/)/g, `$1='${b}/`);
}

export const GET: APIRoute = async () => {
  const site = SITE.URL.replace(/\/$/, "");
  const posts = (await getCollection("blog", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime(),
  );

  const feed = {
    version: "https://jsonfeed.org/version/1.1",
    title: SITE.TITLE,
    home_page_url: `${site}/`,
    feed_url: `${site}/feed.json`,
    description: SITE.DESCRIPTION,
    language: "en",
    authors: [{ name: OWNER.NAME, url: site }],
    items: posts.map((post) => {
      const html = sanitizeHtml(
        absolutize(parser.render(post.body ?? ""), site),
        {
          allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
          allowedAttributes: {
            ...sanitizeHtml.defaults.allowedAttributes,
            img: ["src", "alt", "title", "width", "height"],
          },
        },
      );
      const url = `${site}/blog/${post.id}/`;
      return {
        id: url,
        url,
        title: post.data.title,
        summary: post.data.description,
        content_html: html,
        date_published: post.data.publishDate.toISOString(),
        date_modified: (
          post.data.updatedDate ?? post.data.publishDate
        ).toISOString(),
        tags: [post.data.category, ...post.data.tags],
        ...(post.data.heroImage
          ? { image: `${site}${post.data.heroImage.url}` }
          : {}),
      };
    }),
  };

  return new Response(JSON.stringify(feed, null, 2), {
    headers: {
      "Content-Type": "application/feed+json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
