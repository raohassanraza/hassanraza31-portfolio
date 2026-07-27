const siteHeader = document.getElementById("siteHeader");
const menuButton = document.getElementById("menuButton");
const navLinksContainer = document.getElementById("navLinks");
const navLinks = Array.from(document.querySelectorAll(".nav-link"));
const sections = Array.from(document.querySelectorAll("main section[id]"));
const revealItems = Array.from(document.querySelectorAll(".reveal"));
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

document.getElementById("year").textContent = new Date().getFullYear();

function closeMenu() {
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation menu");
  navLinksContainer.classList.remove("open");
  document.body.classList.remove("menu-open");
}

menuButton.addEventListener("click", () => {
  const menuIsOpen = menuButton.getAttribute("aria-expanded") === "true";

  menuButton.setAttribute("aria-expanded", String(!menuIsOpen));
  menuButton.setAttribute(
    "aria-label",
    menuIsOpen ? "Open navigation menu" : "Close navigation menu",
  );
  navLinksContainer.classList.toggle("open", !menuIsOpen);
  document.body.classList.toggle("menu-open", !menuIsOpen);
});

navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

window.addEventListener(
  "scroll",
  () => {
    siteHeader.classList.toggle("scrolled", window.scrollY > 20);
  },
  { passive: true },
);

const navigationObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      navLinks.forEach((link) => {
        const linkMatchesSection =
          link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("active", linkMatchesSection);
      });
    });
  },
  {
    rootMargin: "-35% 0px -58% 0px",
    threshold: 0,
  },
);

sections.forEach((section) => {
  navigationObserver.observe(section);
});

if (prefersReducedMotion) {
  revealItems.forEach((item) => {
    item.classList.add("visible");
  });
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.14,
    },
  );

  revealItems.forEach((item) => {
    revealObserver.observe(item);
  });
}
