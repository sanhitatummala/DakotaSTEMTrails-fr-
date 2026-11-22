/* ==========================================================================
   Dakota STEM Trails — site scripts
   1. Mobile navigation
   2. Header shadow on scroll
   3. Reveal-on-scroll animations
   4. Footer year + back-to-top
   5. Contact form (sent through FormSubmit)
   ========================================================================== */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* 1. Mobile navigation
     ------------------------------------------------------------------------ */
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("nav-menu");

  function setMenu(open) {
    if (!toggle || !menu) return;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menu.classList.toggle("is-open", open);
  }

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setMenu(false);
    });
    window.matchMedia("(min-width: 861px)").addEventListener("change", function () {
      setMenu(false);
    });
  }

  /* 2. Header shadow on scroll
     ------------------------------------------------------------------------ */
  var header = document.querySelector(".site-header");
  function updateHeader() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  /* 3. Reveal-on-scroll animations
     Add data-reveal to any element. Children of [data-reveal-group] are
     automatically staggered.
     ------------------------------------------------------------------------ */
  document.querySelectorAll("[data-reveal-group]").forEach(function (group) {
    group.querySelectorAll(":scope > [data-reveal]").forEach(function (el, i) {
      el.style.setProperty("--delay", (i * 0.08).toFixed(2) + "s");
    });
  });

  var revealEls = document.querySelectorAll("[data-reveal]");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { observer.observe(el); });
  }

  /* 4. Footer year + back-to-top
     ------------------------------------------------------------------------ */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
  document.querySelectorAll("[data-to-top]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  });

  /* 5. Contact form
     Sends the form in the background so visitors stay on the page.
     If JavaScript is off, the form still posts normally to FormSubmit.
     ------------------------------------------------------------------------ */
  var form = document.querySelector("[data-contact-form]");
  if (!form) return;

  var status = form.querySelector(".form-status");
  var submit = form.querySelector('[type="submit"]');
  var fallbackEmail = form.getAttribute("data-email");

  function showStatus(type, html) {
    status.className = "form-status is-" + type;
    status.innerHTML = html;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    if (form.querySelector('[name="_honey"]').value) return; // spam bot

    submit.disabled = true;
    submit.classList.add("is-loading");
    status.className = "form-status";

    var data = {};
    new FormData(form).forEach(function (value, key) { data[key] = value; });

    fetch(form.getAttribute("data-endpoint"), {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data)
    })
      .then(function (res) { return res.json(); })
      .then(function (res) {
        if (!res || String(res.success) !== "true") throw new Error("Send failed");
        showStatus("success", "Thank you for reaching out! We’ll get back to you soon.");
        form.reset();
      })
      .catch(function () {
        showStatus("error", "Sorry, something went wrong. Please email us directly at " +
          '<a href="mailto:' + fallbackEmail + '">' + fallbackEmail + "</a>.");
      })
      .finally(function () {
        submit.disabled = false;
        submit.classList.remove("is-loading");
      });
  });
})();
