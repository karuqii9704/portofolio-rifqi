(function () {
  "use strict";

  const navToggle = document.getElementById("navToggle");
  const siteNav = document.getElementById("siteNav");
  const body = document.body;

  function setNavigation(open) {
    body.classList.toggle("nav-open", open);
    navToggle?.setAttribute("aria-expanded", String(open));

    const label = navToggle?.querySelector(".sr-only");
    if (label) label.textContent = open ? "Close navigation" : "Open navigation";
  }

  navToggle?.addEventListener("click", function () {
    setNavigation(!body.classList.contains("nav-open"));
  });

  siteNav?.addEventListener("click", function (event) {
    if (event.target.closest("a")) setNavigation(false);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && body.classList.contains("nav-open")) {
      setNavigation(false);
      navToggle?.focus();
    }
  });

  const desktopQuery = window.matchMedia("(min-width: 801px)");
  desktopQuery.addEventListener("change", function (event) {
    if (event.matches) setNavigation(false);
  });

  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
