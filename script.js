document.addEventListener("DOMContentLoaded", () => {
  // ----- Mobile menu -----
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");
  const setMenu = (open) => {
    nav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
  };
  toggle.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
  nav.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("open")) { setMenu(false); toggle.focus(); }
  });

  // ----- Expandable project cards (works for any number of cards) -----
  const cards = () => document.querySelectorAll(".card-toggle");
  const setCard = (btn, open) => {
    btn.setAttribute("aria-expanded", String(open));
    const panel = document.getElementById(btn.getAttribute("aria-controls"));
    if (panel) panel.hidden = !open;
  };
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".card-toggle");
    if (btn) setCard(btn, btn.getAttribute("aria-expanded") !== "true");
    const all = e.target.closest("[data-expand]");
    if (all) cards().forEach((b) => setCard(b, all.dataset.expand === "all"));
  });

  // ----- Highlight the nav link for the section in view -----
  const links = [...document.querySelectorAll("#site-nav a")];
  const sections = links.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          links.forEach((a) => {
            const on = a.getAttribute("href") === "#" + en.target.id;
            a.classList.toggle("active", on);
            if (on) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
          });
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach((s) => io.observe(s));
  }

  // ----- Footer year -----
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
});
