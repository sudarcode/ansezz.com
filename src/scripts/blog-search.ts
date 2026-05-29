// Loads the Pagefind UI (built into /pagefind/* by the build script) and
// mounts it. Re-inits on Astro view-transition navigations. Reads ?q= to
// prefill — this is what the site's SearchAction schema points at.

declare global {
  interface Window {
    PagefindUI?: new (opts: Record<string, unknown>) => unknown;
  }
}

const CSS_HREF = "/pagefind/pagefind-ui.css";
const JS_SRC = "/pagefind/pagefind-ui.js";

let assetsRequested = false;

function loadAssets(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.PagefindUI) return resolve();
    if (!document.querySelector(`link[href="${CSS_HREF}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = CSS_HREF;
      document.head.appendChild(link);
    }
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${JS_SRC}"]`,
    );
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject());
      if (window.PagefindUI) resolve();
      return;
    }
    const s = document.createElement("script");
    s.src = JS_SRC;
    s.addEventListener("load", () => resolve());
    s.addEventListener("error", () => reject());
    document.head.appendChild(s);
  });
}

function prefillFromQuery(): void {
  const q = new URLSearchParams(window.location.search).get("q");
  if (!q) return;
  const input = document.querySelector<HTMLInputElement>(
    "#pagefind-search input[type='text']",
  );
  if (!input) return;
  input.value = q;
  input.dispatchEvent(new Event("input", { bubbles: true }));
}

async function init(): Promise<void> {
  const mount = document.getElementById("pagefind-search");
  if (!mount || mount.dataset.ready === "1") return;

  try {
    await loadAssets();
  } catch {
    const msg = document.createElement("p");
    msg.className = "text-sm opacity-70";
    msg.textContent = "Search index unavailable in this environment.";
    mount.replaceChildren(msg);
    return;
  }
  if (!window.PagefindUI) return;
  mount.dataset.ready = "1";
  new window.PagefindUI({
    element: "#pagefind-search",
    showSubResults: true,
    showImages: false,
    pageSize: 6,
    resetStyles: false,
    translations: { placeholder: "Search posts…" },
  });
  // Pagefind builds its input asynchronously; retry the prefill briefly.
  let tries = 0;
  const timer = window.setInterval(() => {
    prefillFromQuery();
    if (++tries > 10 || window.location.search.indexOf("q=") === -1) {
      window.clearInterval(timer);
    }
  }, 150);
}

function boot(): void {
  if (!document.getElementById("pagefind-search")) return;
  if (!assetsRequested) assetsRequested = true;
  void init();
}

boot();
document.addEventListener("astro:page-load", boot);

export {};
