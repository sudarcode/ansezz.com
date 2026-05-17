import { SITE } from "@/consts";

let siteHost = "";
try {
  siteHost = new URL(SITE.URL).hostname;
} catch {
  siteHost = "";
}

function isExternalUrl(href: string | undefined | null): boolean {
  if (!href) return false;
  if (
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("sms:") ||
    href.startsWith("javascript:")
  ) {
    return false;
  }
  if (href.startsWith("/")) return false;
  if (href.startsWith("#")) return false;
  try {
    const url = new URL(href);
    if (!url.hostname) return false;
    return url.hostname !== siteHost;
  } catch {
    return false;
  }
}

export function externalLinkAttrs(href: string | undefined | null) {
  if (!isExternalUrl(href)) return {};
  return {
    target: "_blank" as const,
    rel: "noopener noreferrer" as const,
  };
}

export function tagSlug(tag: string): string {
  return tag.toLowerCase().replace(/\s+/g, "-");
}
