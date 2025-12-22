(() => {
  const root = document.documentElement;
  const nav = document.querySelector("[data-nav]");
  const toggle = document.querySelector("[data-nav-toggle]");
  const header = document.querySelector("[data-header]");
  const themeToggle = document.querySelector("[data-theme-toggle]");

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const applyTheme = (theme) => {
    const isDark = theme === "dark";
    if (isDark) root.setAttribute("data-theme", "dark");
    else root.removeAttribute("data-theme");

    if (themeToggle) {
      themeToggle.setAttribute("aria-pressed", isDark ? "true" : "false");
      themeToggle.textContent = isDark ? "Light mode" : "Dark mode";
    }
  };

  // Light theme by default; persist user preference if they toggle.
  try {
    const saved = localStorage.getItem("theme");
    applyTheme(saved === "dark" ? "dark" : "light");
  } catch {
    applyTheme("light");
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isDark = root.getAttribute("data-theme") === "dark";
      const next = isDark ? "light" : "dark";
      applyTheme(next);
      try {
        localStorage.setItem("theme", next);
      } catch {
        // ignore
      }
    });
  }

  if (toggle && nav) {
    const setOpen = (open) => {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute(
        "aria-label",
        open ? "Close navigation" : "Open navigation"
      );
    };

    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.contains("is-open");
      setOpen(!isOpen);
    });

    document.addEventListener("click", (e) => {
      if (!nav.classList.contains("is-open")) return;
      if (nav.contains(e.target) || toggle.contains(e.target)) return;
      setOpen(false);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      if (!nav.classList.contains("is-open")) return;
      setOpen(false);
      toggle.focus();
    });

    nav.addEventListener("click", (e) => {
      const target = e.target;
      if (!(target instanceof HTMLAnchorElement)) return;
      if (!target.getAttribute("href")?.startsWith("#")) return;
      setOpen(false);
    });
  }

  // Smooth-scroll with sticky header offset, while still updating URL hash.
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  document.addEventListener("click", (e) => {
    const a =
      e.target instanceof Element ? e.target.closest('a[href^="#"]') : null;
    if (!a) return;

    const href = a.getAttribute("href");
    if (!href || href === "#") return;

    const id = href.slice(1);
    const el = document.getElementById(id);

    // Also support the top anchor which is a div with id="top"
    if (!el) return;

    e.preventDefault();

    const headerHeight = header ? header.getBoundingClientRect().height : 0;
    const top =
      window.scrollY + el.getBoundingClientRect().top - headerHeight - 12;

    window.history.pushState(null, "", `#${id}`);

    window.scrollTo({
      top,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });

    // If the target is a section, move focus to its first heading for keyboard users.
    const focusTarget =
      el.querySelector("h2, h3, a, button, input, textarea, select") || el;
    if (focusTarget instanceof HTMLElement) {
      focusTarget.setAttribute("tabindex", "-1");
      focusTarget.focus({ preventScroll: true });
      focusTarget.addEventListener(
        "blur",
        () => {
          if (focusTarget !== el) focusTarget.removeAttribute("tabindex");
        },
        { once: true }
      );
    }
  });
})();
