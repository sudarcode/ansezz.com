// Adds a "Copy" button to every code block in prose. Idempotent and
// re-runs after Astro view-transition navigations.

function addButtons(): void {
  const blocks = document.querySelectorAll<HTMLPreElement>("article.prose pre");
  blocks.forEach((pre) => {
    if (pre.dataset.copyReady === "1") return;
    pre.dataset.copyReady = "1";
    pre.style.position = "relative";

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "code-copy-btn";
    btn.setAttribute("aria-label", "Copy code");
    btn.textContent = "Copy";

    btn.addEventListener("click", async () => {
      const code = pre.querySelector("code")?.innerText ?? pre.innerText;
      try {
        await navigator.clipboard.writeText(code);
        btn.textContent = "Copied!";
        btn.classList.add("is-copied");
      } catch {
        btn.textContent = "Press ⌘C";
      }
      window.setTimeout(() => {
        btn.textContent = "Copy";
        btn.classList.remove("is-copied");
      }, 1600);
    });

    pre.appendChild(btn);
  });
}

addButtons();
document.addEventListener("astro:page-load", addButtons);

export {};
