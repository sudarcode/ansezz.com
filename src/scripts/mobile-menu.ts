const toggle = document.getElementById("mobile-menu-toggle");
const menu = document.getElementById("mobile-menu");
const iconOpen = toggle?.querySelector(".menu-icon-open");
const iconClose = toggle?.querySelector(".menu-icon-close");

function setOpen(open: boolean): void {
  if (!toggle || !menu || !iconOpen || !iconClose) return;
  toggle.setAttribute("aria-expanded", String(open));
  if (open) {
    menu.removeAttribute("hidden");
    iconOpen.classList.add("hidden");
    iconClose.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  } else {
    menu.setAttribute("hidden", "");
    iconOpen.classList.remove("hidden");
    iconClose.classList.add("hidden");
    document.body.style.overflow = "";
  }
}

toggle?.addEventListener("click", () => {
  const open = toggle.getAttribute("aria-expanded") === "true";
  setOpen(!open);
});

const mql = window.matchMedia("(min-width: 768px)");
mql.addEventListener("change", (e) => {
  if (e.matches) setOpen(false);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") setOpen(false);
});
