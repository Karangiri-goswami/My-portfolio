// --------- Custom cursor ---------
const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

window.addEventListener("pointermove", (e) => {
  const { clientX, clientY } = e;
  cursorDot.style.transform = `translate(${clientX}px, ${clientY}px)`;
  cursorOutline.animate(
    { transform: `translate(${clientX}px, ${clientY}px)` },
    { duration: 220, fill: "forwards" }
  );
});

const hoverTargets = document.querySelectorAll(
  "a, button, .btn, .project-card, .card"
);
hoverTargets.forEach((el) => {
  el.addEventListener("mouseenter", () =>
    cursorOutline.classList.add("cursor-hover")
  );
  el.addEventListener("mouseleave", () =>
    cursorOutline.classList.remove("cursor-hover")
  );
});

// --------- Theme toggle ---------
const themeToggle = document.querySelector(".theme-toggle");
const prefersLight = window.matchMedia("(prefers-color-scheme: light)");

function setTheme(mode) {
  if (mode === "light") {
    document.body.classList.add("light");
  } else {
    document.body.classList.remove("light");
  }
  localStorage.setItem("kg-theme", mode);
}

const storedTheme = localStorage.getItem("kg-theme");
if (storedTheme) {
  setTheme(storedTheme);
} else if (prefersLight.matches) {
  setTheme("light");
}

themeToggle.addEventListener("click", () => {
  const isLight = document.body.classList.contains("light");
  setTheme(isLight ? "dark" : "light");
});

// --------- Mobile nav ---------
const navToggle = document.querySelector(".nav-toggle");
const navList = document.querySelector(".nav-list");

navToggle.addEventListener("click", () => {
  navList.classList.toggle("is-open");
});

// Close nav on link click (mobile)
document.querySelectorAll("[data-nav]").forEach((link) => {
  link.addEventListener("click", () => {
    navList.classList.remove("is-open");
  });
});

// --------- Active nav on scroll ---------
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-list a[data-nav]");

function updateActiveNav() {
  let currentId = "";
  const fromTop = window.scrollY + 120;

  sections.forEach((section) => {
    if (
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    ) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
  });
}

window.addEventListener("scroll", updateActiveNav);
updateActiveNav();

// --------- Stat counters ---------
const statNumbers = document.querySelectorAll(".stat-number");
let statsAnimated = false;

function animateStats() {
  if (statsAnimated) return;
  const hero = document.querySelector(".hero-quick-stats");
  const rect = hero.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom > 0) {
    statsAnimated = true;
    statNumbers.forEach((el) => {
      const endValue = Number(el.dataset.stat) || 0;
      let current = 0;
      const duration = 1000;
      const startTime = performance.now();

      function tick(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        current = Math.floor(progress * endValue);
        el.textContent = current;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }
}

window.addEventListener("scroll", animateStats);
window.addEventListener("load", animateStats);

// --------- Skill meters animation ---------
const skillMeters = document.querySelectorAll(".meter-value");

function animateMeters() {
  skillMeters.forEach((meter) => {
    const rect = meter.getBoundingClientRect();
    if (
      rect.top < window.innerHeight - 40 &&
      rect.bottom > 0 &&
      !meter.dataset.animated
    ) {
      meter.dataset.animated = "true";
      const value = Number(meter.dataset.value) || 0;
      meter.style.setProperty("--meter-width", `${value}%`);
      meter.querySelector;
      meter.style.setProperty("--meter-width", `${value}%`);
      meter.style.setProperty("width", `${value}%`);
      meter.style.setProperty("overflow", "hidden");
      meter.style.setProperty("position", "relative");
      meter.style.setProperty("background", "transparent");
      meter.style.setProperty("padding", "0");
      // Using ::after transition defined in CSS
      meter.style.setProperty("--value", value);
      meter.style.setProperty("--animated", 1);
      meter.style.setProperty("--transition", "true");
      meter.style.setProperty("transition", "none");
      meter.style.setProperty("opacity", "1");
      meter.style.setProperty("transform", "none");
      meter.style.setProperty("will-change", "auto");
      meter.style.setProperty("contain", "layout");
      meter.style.setProperty("backface-visibility", "hidden");
      meter.style.setProperty("perspective", "1000px");
      meter.style.setProperty("transform-style", "preserve-3d");
      meter.style.setProperty("mix-blend-mode", "normal");
      meter.style.setProperty("pointer-events", "auto");
      meter.style.setProperty("z-index", "1");
      meter.style.setProperty("border-radius", "999px");
      meter.style.setProperty("background-color", "rgba(255,255,255,0.06)");
      meter.style.setProperty("position", "relative");
      // Actually trigger ::after width via inline style:
      meter.style.setProperty("--after-width", `${value}%`);
      meter.style.setProperty("--after-transform", "none");
      meter.style.setProperty("--after-transition", "width 0.9s ease");
      meter.style.setProperty("--after-background", "linear-gradient(90deg,#ffc879,#ff7bb4,#7b5cff)");
      // Fallback in case ::after not recognized by inline custom props:
      meter.style.setProperty("box-shadow", "none");
      meter.style.setProperty("overflow", "hidden");
      meter.style.setProperty("position", "relative");
      meter.style.setProperty("border-radius", "999px");
      meter.style.setProperty("background-color", "rgba(255,255,255,0.06)");
      // We still rely mainly on CSS ::after, which uses transition width.
      const after = document.createElement("span");
      after.style.position = "absolute";
      after.style.inset = "0";
      after.style.borderRadius = "inherit";
      after.style.background = "linear-gradient(90deg,#ffc879,#ff7bb4,#7b5cff)";
      after.style.width = "0%";
      after.style.transition = "width 0.9s cubic-bezier(0.22,0.61,0.36,1)";
      meter.appendChild(after);
      requestAnimationFrame(() => {
        after.style.width = value + "%";
      });
    }
  });
}

window.addEventListener("scroll", animateMeters);
window.addEventListener("load", animateMeters);

// --------- Scroll reveal ---------
const revealEls = document.querySelectorAll(
  ".card, .section-header, .timeline-item, .project-card"
);

revealEls.forEach((el) => {
  el.setAttribute("data-animate", "fade-in-up");
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.22 }
);

revealEls.forEach((el) => observer.observe(el));

// --------- Contact form (front-end only) ---------
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  formStatus.textContent = "Sending (simulation)...";
  contactForm.classList.add("is-sending");

  setTimeout(() => {
    formStatus.textContent =
      "Thank you! This portfolio demo does not send emails, but your message logic can be connected to a backend or service.";
    contactForm.reset();
    contactForm.classList.remove("is-sending");
  }, 900);
});

// --------- Year in footer ---------
document.getElementById("year").textContent = new Date().getFullYear();
