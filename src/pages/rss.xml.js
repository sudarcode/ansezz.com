import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import MarkdownIt from "markdown-it";
import sanitizeHtml from "sanitize-html";
import { SITE } from "@/consts";

// NOTE: posts are rendered with markdown-it, not the MDX compiler. Current
// posts are plain Markdown, so this is faithful. If a post ever uses MDX
// components/imports, they won't render here — switch to the container API.
const parser = new MarkdownIt({ html: true, linkify: true });

// Rewrite root-relative URLs to absolute so feed readers resolve them.
function absolutize(html, siteUrl) {
  const base = siteUrl.replace(/\/$/, "");
  return html
    .replace(/(src|href)="\/(?!\/)/g, `$1="${base}/`)
    .replace(/(src|href)='\/(?!\/)/g, `$1='${base}/`);
}

export async function GET(context) {
  const site = context.site?.toString() ?? SITE.URL;
  const posts = (await getCollection("blog", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime(),
  );

  return rss({
    title: SITE.TITLE,
    description: SITE.DESCRIPTION,
    site: context.site,
    items: posts.map((post) => {
      const rendered = parser.render(post.body ?? "");
      const safe = sanitizeHtml(absolutize(rendered, site), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
        allowedAttributes: {
          ...sanitizeHtml.defaults.allowedAttributes,
          img: ["src", "alt", "title", "width", "height"],
        },
      });
      return {
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.updatedDate ?? post.data.publishDate,
        link: `/blog/${post.id}/`,
        categories: [post.data.category, ...post.data.tags],
        content: safe,
      };
    }),
  });
}
