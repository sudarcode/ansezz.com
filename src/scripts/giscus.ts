// Lazily mount giscus into #giscus-mount and keep its theme in sync
// with the site's dark-mode toggle. Re-runs after view transitions.

const GISCUS_SRC = "https://giscus.app/client.js";

function giscusTheme(): string {
  return document.documentElement.dataset.theme === "dark"
    ? "dark_dimmed"
    : "light";
}

function mount(): void {
  const el = document.getElementById("giscus-mount");
  if (!el || el.querySelector("script, iframe")) return;

  const s = document.createElement("script");
  s.src = GISCUS_SRC;
  s.async = true;
  s.crossOrigin = "anonymous";
  s.setAttribute("data-repo", el.dataset.giscusRepo ?? "");
  s.setAttribute("data-repo-id", el.dataset.giscusRepoId ?? "");
  s.setAttribute("data-category", el.dataset.giscusCategory ?? "");
  s.setAttribute("data-category-id", el.dataset.giscusCategoryId ?? "");
  s.setAttribute("data-mapping", el.dataset.giscusMapping ?? "pathname");
  s.setAttribute("data-strict", "0");
  s.setAttribute("data-reactions-enabled", el.dataset.giscusReactions ?? "1");
  s.setAttribute("data-emit-metadata", "0");
  s.setAttribute("data-input-position", "top");
  s.setAttribute("data-theme", giscusTheme());
  s.setAttribute("data-lang", "en");
  s.setAttribute("data-loading", "lazy");
  el.appendChild(s);
}

function syncTheme(): void {
  const iframe = document.querySelector<HTMLIFrameElement>(
    "iframe.giscus-frame",
  );
  iframe?.contentWindow?.postMessage(
    { giscus: { setConfig: { theme: giscusTheme() } } },
    "https://giscus.app",
  );
}

mount();
document.addEventListener("astro:after-swap", mount);
// React to theme toggles (the toggle flips data-theme on <html>).
new MutationObserver(syncTheme).observe(document.documentElement, {
  attributes: true,
  attributeFilter: ["data-theme"],
});

export {};
