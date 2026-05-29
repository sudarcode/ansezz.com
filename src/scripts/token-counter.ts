// Client-side token estimator. Heuristic: ~4 characters per token for
// English-ish text, blended lightly with a word-based estimate.

function estimateTokens(text: string): number {
  if (!text) return 0;
  const chars = text.length;
  const words = (text.trim().match(/\S+/g) ?? []).length;
  const byChars = chars / 4;
  const byWords = words * 1.33;
  // Blend, lean on chars (handles code/punctuation better).
  return Math.round(byChars * 0.7 + byWords * 0.3);
}

function fmtUsd(n: number): string {
  if (n === 0) return "$0";
  if (n < 0.0001) return "<$0.0001";
  if (n < 1) return `$${n.toFixed(4)}`;
  return `$${n.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
}

function init(): void {
  const root = document.getElementById("tok-root");
  const input = document.getElementById(
    "tok-input",
  ) as HTMLTextAreaElement | null;
  if (!root || !input || root.dataset.bound === "1") return;
  root.dataset.bound = "1";

  const setText = (id: string, v: string) => {
    const el = document.getElementById(id);
    if (el) el.textContent = v;
  };

  function update(): void {
    const text = input!.value;
    const tokens = estimateTokens(text);
    setText("tok-tokens", tokens.toLocaleString("en-US"));
    setText("tok-chars", text.length.toLocaleString("en-US"));
    setText(
      "tok-words",
      (text.trim().match(/\S+/g) ?? []).length.toLocaleString("en-US"),
    );
    root!.querySelectorAll<HTMLElement>("[data-cost]").forEach((el) => {
      const pricePerM = parseFloat(el.dataset.cost ?? "0");
      el.textContent = fmtUsd((tokens / 1_000_000) * pricePerM);
    });
  }

  input.addEventListener("input", update);
  update();
}

init();
document.addEventListener("astro:after-swap", init);

export {};
