/* =====================================================================
   Interactions: theme, scroll reveal, nav state, progress, music toggle.
   ===================================================================== */
(function () {
  "use strict";

  const root = document.documentElement;

  /* ---------- Theme ---------- */
  const themeBtn = document.getElementById("themeToggle");
  const stored = localStorage.getItem("theme");
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  root.setAttribute("data-theme", stored || (prefersLight ? "light" : "dark"));

  const themeMeta = document.querySelector('meta[name="theme-color"]');
  function syncThemeColor(theme) {
    if (themeMeta) themeMeta.setAttribute("content", theme === "light" ? "#f3f1ea" : "#0e1316");
  }
  themeBtn.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    syncThemeColor(next);
  });

  /* ---------- Mobile nav ---------- */
  const navEl = document.getElementById("nav");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  function setNav(open) {
    navEl.classList.toggle("nav-open", open);
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () =>
      setNav(!navEl.classList.contains("nav-open"))
    );
    navLinks.addEventListener("click", (e) => {
      if (e.target.closest("a")) setNav(false);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setNav(false);
    });
    // returning to desktop width should always reset to the open layout
    window.matchMedia("(min-width: 901px)").addEventListener("change", (e) => {
      if (e.matches) setNav(false);
    });
  }

  /* ---------- Music toggle ---------- */
  const musicBtn = document.getElementById("musicToggle");
  musicBtn.addEventListener("click", async () => {
    const playing = await window.AmbientMusic.toggle();
    musicBtn.setAttribute("aria-pressed", playing ? "true" : "false");
  });

  /* ---------- Scroll reveal ---------- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const d = e.target.dataset.delay || 0;
          setTimeout(() => e.target.classList.add("in"), d);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("in"));
  }

  /* ---------- Nav: shadow + active link + scroll progress ---------- */
  const nav = document.getElementById("nav");
  const progress = document.querySelector(".scroll-progress span");
  const links = [...document.querySelectorAll(".nav-links a")];
  const sections = links
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  const mist = document.querySelector(".bg-mist");
  const allowParallax = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let ticking = false;
  function onScroll() {
    const y = window.scrollY;
    nav.classList.toggle("scrolled", y > 24);

    const h = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";

    let current = sections[0];
    for (const s of sections) {
      if (s.offsetTop - 120 <= y) current = s;
    }
    links.forEach((a) =>
      a.classList.toggle("active", current && a.getAttribute("href") === "#" + current.id)
    );

    // parallax the background layer (composited transform) — folded into the
    // same rAF tick so we only touch layout/style once per frame.
    if (mist && allowParallax) mist.style.transform = `translate3d(0, ${y * 0.02}px, 0)`;

    ticking = false;
  }
  window.addEventListener("scroll", () => {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  /* ---------- Count-up for stats ---------- */
  const counters = document.querySelectorAll("[data-count]");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function runCount(el) {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || "0", 10);
    if (reduced) { el.textContent = target.toFixed(decimals); return; }
    const dur = 1400, t0 = performance.now();
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    function frame(now) {
      const p = Math.min((now - t0) / dur, 1);
      el.textContent = (target * ease(p)).toFixed(decimals);
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
  if ("IntersectionObserver" in window) {
    const co = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { runCount(e.target); co.unobserve(e.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach((el) => co.observe(el));
  } else {
    counters.forEach((el) => runCount(el));
  }

  /* ---------- Year ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();
})();
