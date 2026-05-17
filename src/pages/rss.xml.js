import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE } from "@/consts";

export async function GET(context) {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  return rss({
    title: SITE.TITLE,
    description: SITE.DESCRIPTION,
    site: context.site,
    items: posts
      .sort(
        (a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime(),
      )
      .map((post) => ({
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.publishDate,
        link: `/blog/${post.id}/`,
        categories: [post.data.category, ...post.data.tags],
      })),
  });
}
