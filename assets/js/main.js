(function () {
  "use strict";

  const root = document.documentElement;
  const body = document.body;
  const nav = document.getElementById("nav");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  const themeToggle = document.getElementById("themeToggle");
  const musicToggle = document.getElementById("musicToggle");
  const progress = document.querySelector(".scroll-progress span");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const themeMeta = document.querySelector('meta[name="theme-color"]');

  function syncTheme(theme) {
    root.setAttribute("data-theme", theme);
    themeMeta?.setAttribute("content", theme === "light" ? "#f3f1ea" : "#0d1314");
    themeToggle?.setAttribute(
      "aria-label",
      theme === "light" ? "Switch to dark theme" : "Switch to light theme"
    );
  }

  syncTheme(root.getAttribute("data-theme") || "dark");

  themeToggle?.addEventListener("click", function () {
    const nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    syncTheme(nextTheme);
    try {
      localStorage.setItem("theme", nextTheme);
    } catch (error) {}
  });

  function setNavigation(open) {
    nav?.classList.toggle("nav-open", open);
    body.classList.toggle("nav-open", open);
    navToggle?.setAttribute("aria-expanded", String(open));
    navToggle?.setAttribute("aria-label", open ? "Close menu" : "Open menu");

    if (open) {
      navLinks?.querySelector("a")?.focus({ preventScroll: true });
    }
  }

  navToggle?.addEventListener("click", function () {
    setNavigation(!body.classList.contains("nav-open"));
  });

  navLinks?.addEventListener("click", function (event) {
    if (event.target.closest("a")) setNavigation(false);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && body.classList.contains("nav-open")) {
      setNavigation(false);
      navToggle?.focus();
    }
  });

  document.addEventListener("click", function (event) {
    if (
      body.classList.contains("nav-open") &&
      nav &&
      !nav.contains(event.target)
    ) {
      setNavigation(false);
    }
  });

  const desktopQuery = window.matchMedia("(min-width: 801px)");
  desktopQuery.addEventListener("change", function (event) {
    if (event.matches) setNavigation(false);
  });

  musicToggle?.addEventListener("click", async function () {
    if (!window.AmbientMusic) return;

    musicToggle.disabled = true;
    try {
      const playing = await window.AmbientMusic.toggle();
      musicToggle.setAttribute("aria-pressed", String(playing));
      musicToggle.setAttribute(
        "aria-label",
        playing ? "Stop ambient focus sound" : "Play ambient focus sound"
      );
    } finally {
      musicToggle.disabled = false;
    }
  });

  const revealElements = Array.from(document.querySelectorAll(".reveal"));
  if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    revealElements.forEach(function (element) {
      element.classList.add("in");
    });
  } else {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;

          const delay = Number(entry.target.dataset.delay || 0);
          window.setTimeout(function () {
            entry.target.classList.add("in");
          }, delay);
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" }
    );

    revealElements.forEach(function (element) {
      revealObserver.observe(element);
    });
  }

  const links = Array.from(document.querySelectorAll(".nav-links a"));
  const sections = links
    .map(function (link) {
      return document.querySelector(link.getAttribute("href"));
    })
    .filter(Boolean);
  const orbs = document.querySelectorAll(".ambient-orb");
  let ticking = false;

  function updateScrollState() {
    const scrollY = window.scrollY;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    nav?.classList.toggle("scrolled", scrollY > 20);

    if (progress) {
      progress.style.width = (scrollable > 0 ? (scrollY / scrollable) * 100 : 0) + "%";
    }

    let currentSection = sections[0];
    sections.forEach(function (section) {
      if (section.offsetTop - 150 <= scrollY) currentSection = section;
    });

    links.forEach(function (link) {
      const active = currentSection && link.getAttribute("href") === "#" + currentSection.id;
      link.classList.toggle("active", Boolean(active));
    });

    if (!reducedMotion.matches) {
      orbs.forEach(function (orb, index) {
        const direction = index % 2 === 0 ? 1 : -1;
        orb.style.transform = "translate3d(0," + scrollY * 0.018 * direction + "px,0)";
      });
    }

    ticking = false;
  }

  window.addEventListener(
    "scroll",
    function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateScrollState);
    },
    { passive: true }
  );
  updateScrollState();

  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
