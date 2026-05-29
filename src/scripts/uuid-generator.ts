// Bulk v4 UUID generator. Uses crypto.randomUUID with a manual fallback.

function uuidv4(): string {
  const direct = crypto.randomUUID?.();
  if (direct) return direct;
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = [...bytes].map((b) => b.toString(16).padStart(2, "0"));
  return `${hex.slice(0, 4).join("")}-${hex.slice(4, 6).join("")}-${hex.slice(6, 8).join("")}-${hex.slice(8, 10).join("")}-${hex.slice(10, 16).join("")}`;
}

function init(): void {
  const root = document.getElementById("uuid-root");
  if (!root || root.dataset.bound === "1") return;
  root.dataset.bound = "1";

  const countEl = document.getElementById("uuid-count") as HTMLInputElement;
  const output = document.getElementById("uuid-output") as HTMLTextAreaElement;
  const genBtn = document.getElementById("uuid-generate");
  const copyBtn = document.getElementById("uuid-copy");
  const copyLabel = document.getElementById("uuid-copy-label");

  function generate(): void {
    const n = Math.max(1, Math.min(500, parseInt(countEl.value, 10) || 1));
    countEl.value = String(n);
    output.value = Array.from({ length: n }, () => uuidv4()).join("\n");
  }

  genBtn?.closest("button")?.addEventListener("click", generate);
  copyBtn?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(output.value);
      if (copyLabel) {
        copyLabel.textContent = "Copied!";
        window.setTimeout(() => (copyLabel.textContent = "Copy all"), 1500);
      }
    } catch {
      output.select();
    }
  });

  generate();
}

init();
document.addEventListener("astro:after-swap", init);

export {};
