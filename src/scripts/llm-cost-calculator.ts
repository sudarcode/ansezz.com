// Client-side LLM cost estimator. Pure DOM, no framework.
// Re-binds on Astro view-transition navigations.

interface Model {
  id: string;
  label: string;
  in: number;
  out: number;
}

function num(id: string): number {
  const el = document.getElementById(id) as HTMLInputElement | null;
  const v = el ? parseFloat(el.value) : 0;
  return Number.isFinite(v) && v >= 0 ? v : 0;
}

function fmt(n: number): string {
  if (n === 0) return "$0";
  if (n < 0.01) return "<$0.01";
  if (n < 1000)
    return `$${n.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
  return `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

function init(): void {
  const form = document.getElementById("cost-form") as HTMLFormElement | null;
  if (!form || form.dataset.bound === "1") return;
  form.dataset.bound = "1";

  let models: Model[] = [];
  try {
    models = JSON.parse(form.dataset.models ?? "[]");
  } catch {
    models = [];
  }

  const modelSel = document.getElementById("model") as HTMLSelectElement;
  const priceIn = document.getElementById("priceIn") as HTMLInputElement;
  const priceOut = document.getElementById("priceOut") as HTMLInputElement;
  const cache = document.getElementById("cacheHits") as HTMLInputElement;

  function applyModel(): void {
    const m = models.find((x) => x.id === modelSel.value);
    if (!m || m.id === "custom") return;
    priceIn.value = String(m.in);
    priceOut.value = String(m.out);
    compute();
  }

  function compute(): void {
    const pin = num("priceIn");
    const pout = num("priceOut");
    const tin = num("tokIn");
    const tout = num("tokOut");
    const reqs = num("reqs");

    // Effective input price with optional prompt-cache assumption:
    // half the input tokens hit cache at ~10% of base price.
    const effIn = cache.checked ? pin * 0.5 + pin * 0.1 * 0.5 : pin;

    const perReq = (tin / 1_000_000) * effIn + (tout / 1_000_000) * pout;
    const perDay = perReq * reqs;
    const perMonth = perDay * 30;

    const set = (id: string, v: string) => {
      const el = document.getElementById(id);
      if (el) el.textContent = v;
    };
    set("out-req", fmt(perReq));
    set("out-day", fmt(perDay));
    set("out-month", fmt(perMonth));
  }

  modelSel.addEventListener("change", applyModel);
  form.addEventListener("input", compute);
  applyModel();
  compute();
}

init();
document.addEventListener("astro:after-swap", init);

export {};
