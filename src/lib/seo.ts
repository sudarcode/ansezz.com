import { SITE } from "@/consts";

interface BreadcrumbEntry {
  name: string;
  url?: string;
}

export function breadcrumbList(entries: BreadcrumbEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: entries.map((e, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: e.name,
      ...(e.url ? { item: e.url.startsWith("http") ? e.url : new URL(e.url, SITE.URL).href } : {}),
    })),
  };
}

interface WebPageOpts {
  url: string;
  title: string;
  description: string;
  image?: string;
}

export function webPage({ url, title, description, image }: WebPageOpts) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: "en",
    isPartOf: { "@id": `${SITE.URL}#website` },
    primaryImageOfPage: image
      ? { "@type": "ImageObject", url: image.startsWith("http") ? image : new URL(image, SITE.URL).href }
      : undefined,
  };
}

export function toneFromId(id: string, tones: readonly string[]): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) | 0;
  }
  return tones[Math.abs(hash) % tones.length];
}
