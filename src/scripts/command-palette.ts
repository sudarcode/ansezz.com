// Global ⌘K / Ctrl+K command palette. Filters nav/tool links; an unmatched
// query hands off to the blog's Pagefind search via /blog/?q=. Document-level
// listeners survive Astro view transitions.

function els() {
  return {
    modal: document.getElementById("cmdk"),
    input: document.getElementById("cmdk-input") as HTMLInputElement | null,
    items: Array.from(
      document.querySelectorAll<HTMLAnchorElement>("[data-cmdk-item]"),
    ),
    searchRow: document.getElementById("cmdk-search-row"),
    searchLink: document.getElementById(
      "cmdk-search-link",
    ) as HTMLAnchorElement | null,
    searchLabel: document.getElementById("cmdk-search-label"),
    empty: document.getElementById("cmdk-empty"),
  };
}

let selected = 0;

function visibleItems(): HTMLAnchorElement[] {
  return els().items.filter(
    (el) => !el.closest("li")?.hasAttribute("hidden") && !el.hidden,
  );
}

function paintSelection(): void {
  const vis = visibleItems();
  if (selected < 0) selected = 0;
  if (selected >= vis.length) selected = vis.length - 1;
  els().items.forEach((el) => el.setAttribute("aria-selected", "false"));
  vis[selected]?.setAttribute("aria-selected", "true");
  vis[selected]?.scrollIntoView({ block: "nearest" });
}

function filter(): void {
  const { input, items, searchRow, searchLink, searchLabel, empty } = els();
  if (!input) return;
  const q = input.value.trim();
  const lower = q.toLowerCase();
  let matches = 0;

  items.forEach((el) => {
    if (el.id === "cmdk-search-link") return;
    const label = el.dataset.label ?? "";
    const show = label.includes(lower);
    const li = el.closest("li");
    if (li) li.hidden = !show;
    if (show) matches++;
  });

  if (searchRow && searchLink && searchLabel) {
    if (q.length > 0) {
      searchRow.hidden = false;
      searchLabel.textContent = `Search the blog for “${q}”`;
      searchLink.href = `/blog/?q=${encodeURIComponent(q)}`;
    } else {
      searchRow.hidden = true;
    }
  }

  if (empty) empty.hidden = matches > 0 || q.length > 0;
  selected = 0;
  paintSelection();
}

function open(): void {
  const { modal, input } = els();
  if (!modal) return;
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  if (input) {
    input.value = "";
    filter();
    input.focus();
  }
}

function close(): void {
  const { modal } = els();
  if (!modal) return;
  modal.hidden = true;
  document.body.style.overflow = "";
}

function isOpen(): boolean {
  return !document.getElementById("cmdk")?.hidden;
}

document.addEventListener("keydown", (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
    e.preventDefault();
    isOpen() ? close() : open();
    return;
  }
  if (!isOpen()) return;

  if (e.key === "Escape") {
    e.preventDefault();
    close();
  } else if (e.key === "ArrowDown") {
    e.preventDefault();
    selected++;
    paintSelection();
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    selected--;
    paintSelection();
  } else if (e.key === "Enter") {
    const target = visibleItems()[selected];
    if (target) {
      e.preventDefault();
      window.location.href = target.getAttribute("href") ?? "/";
    }
  }
});

document.addEventListener("click", (e) => {
  const t = e.target;
  if (!(t instanceof Element)) return;
  if (t.closest("#cmdk-backdrop")) close();
  if (t.closest("[data-cmdk-open]")) {
    e.preventDefault();
    open();
  }
});

document.addEventListener("input", (e) => {
  if (e.target instanceof HTMLElement && e.target.id === "cmdk-input") filter();
});

document.addEventListener("astro:after-swap", close);

export {};
