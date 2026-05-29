import { readFileSync } from "node:fs";
import { join } from "node:path";
import { imageSize } from "image-size";

const PUBLIC_DIR = join(process.cwd(), "public");
const cache = new Map();

function dimsFor(src) {
  if (cache.has(src)) return cache.get(src);
  let dims = null;
  try {
    const buf = readFileSync(join(PUBLIC_DIR, src));
    const { width, height } = imageSize(buf);
    if (width && height) dims = { width, height };
  } catch {
    dims = null;
  }
  cache.set(src, dims);
  return dims;
}

function walk(node, fn) {
  if (!node) return;
  if (node.type === "element") fn(node);
  if (Array.isArray(node.children)) {
    for (const child of node.children) walk(child, fn);
  }
}

/**
 * Sets intrinsic width/height (preventing layout shift) plus lazy loading and
 * async decoding on root-relative Markdown images served from /public.
 */
export default function rehypeImageDims() {
  return (tree) => {
    walk(tree, (node) => {
      if (node.tagName !== "img") return;
      const props = node.properties ?? (node.properties = {});
      const src = props.src;
      if (typeof src !== "string" || !src.startsWith("/")) return;

      if (props.width == null || props.height == null) {
        const dims = dimsFor(src);
        if (dims) {
          props.width = dims.width;
          props.height = dims.height;
        }
      }
      if (props.loading == null) props.loading = "lazy";
      if (props.decoding == null) props.decoding = "async";
    });
  };
}
