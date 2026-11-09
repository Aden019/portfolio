(() => {
  "use strict";

  const D = window.PORTFOLIO;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  /* Text */
  $$("[data-bind]").forEach((el) => { el.textContent = D[el.dataset.bind] ?? ""; });
  $(".hero__title").innerHTML = esc(D.headline).replace(/\*(.+?)\*/g, '<span class="hl">$1</span>')
    .replace(/(\w+-\w+)/g, '<span style="white-space:nowrap">$1</span>'); // don't break "real-time"
  const [first, ...rest] = D.name.split(" ");
  $("#brand").innerHTML = `${esc(first)}<span class="brand__rest"> ${esc(rest.join(" "))}</span>`;
  $("#year").textContent = new Date().getFullYear();
  $("#status-text").textContent = D.available ? "Available for new projects" : "Currently unavailable";
  if (!D.available) $("#status").classList.add("is-off");

  // When an entrance animation finishes, drop it so the element renders as plain static content.
  document.addEventListener("animationend", (e) => {
    if (e.target.hasAttribute("data-anim") && /^enter/.test(e.animationName)) e.target.removeAttribute("data-anim");
  });

  /* Stack strip (duplicated once for a seamless loop) */
  const stackHTML = D.stack.map((s) => `<span class="strip__item">${esc(s)}</span>`).join("");
  $("#strip").innerHTML = stackHTML + stackHTML.replace(/class="strip__item"/g, 'class="strip__item" aria-hidden="true"');

  /* ---------------------------------------------------------
     Services, projects, about
     --------------------------------------------------------- */
  const ICONS = {
    card: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M3 10h18M7 15h4"/>',
    pulse: '<path d="M3 12h4l2.5-6 5 12L17 12h4"/>',
    shield: '<path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"/><path d="M9 12l2 2 4-4"/>'
  };
  $("#services-list").innerHTML = D.services.map((s, i) => `
    <article class="service" data-reveal style="--d:${i * 0.08}s">
      <div class="service__icon"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[s.icon] || ""}</svg></div>
      <h3>${esc(s.title)}</h3>
      <p>${esc(s.text)}</p>
    </article>`).join("");
  $$(".service").forEach((el) => el.addEventListener("pointermove", (e) => {
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }));

  const P = D.projects;
  $("#projects").innerHTML = P.map((p, i) => `
    <button class="card" data-open="${esc(p.id)}" data-reveal style="--d:${(i % 2) * 0.08}s" aria-label="View project: ${esc(p.title)}">
      <div class="card__img">
        <img src="${esc(p.cover)}" alt="" loading="lazy" />
        ${p.focus ? `<span class="card__focus">${esc(p.focus)}</span>` : ""}
      </div>
      <div class="card__body">
        <div class="card__top">
          <h3 class="card__title">${esc(p.title)}</h3>
          <span class="card__year">${esc(p.year)}</span>
        </div>
        <p class="card__kind">${esc(p.kind)}</p>
        <p class="card__text">${esc(p.tagline)}</p>
        <div class="card__foot">
          <div class="tags">${p.stack.slice(0, 3).map((s) => `<span class="tag">${esc(s)}</span>`).join("")}</div>
          <span class="card__more" aria-hidden="true">→</span>
        </div>
      </div>
    </button>`).join("");

  $("#about-text").innerHTML = D.about.map((t) => `<p>${esc(t)}</p>`).join("");
  $("#skills").innerHTML = D.skills.map((s) => `
    <div>
      <h3>${esc(s.group)}</h3>
      <ul>${s.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>
    </div>`).join("");

  /* ---------------------------------------------------------
     Contact
     --------------------------------------------------------- */
  const emailLink = $("#email-link");
  emailLink.href = `mailto:${D.email}`;
  emailLink.textContent = D.email;
  $("#links").innerHTML = D.links
    .map((l) => `<li><a href="${esc(l.href)}" target="_blank" rel="noopener">${esc(l.label)} ↗</a></li>`).join("");

  let toastTimer;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("is-on"), 1800);
  }
  $("#copy-email").addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(D.email); toast("Email copied ✓"); }
    catch (e) { location.href = `mailto:${D.email}`; }
  });

  /* Theme */
  const root = document.documentElement;
  $("#theme-toggle").addEventListener("click", () => {
    const dark = root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    root.dataset.theme = dark ? "light" : "dark";
    store.set("theme", root.dataset.theme);
  });

  /* ---------------------------------------------------------
     Project modal
     --------------------------------------------------------- */
  const modal = $("#modal"), body = $("#modal-body"), panel = $(".modal__panel");
  let lastFocus = null;

  function openProject(id) {
    const i = P.findIndex((p) => p.id === id);
    if (i < 0) return;
    const p = P[i], prev = P[(i - 1 + P.length) % P.length], next = P[(i + 1) % P.length];
    body.innerHTML = `
      <p class="cs__kind">${esc(p.kind)}</p>
      <h2 class="cs__title" id="modal-title">${esc(p.title)}</h2>
      <p class="cs__tagline">${esc(p.tagline)}</p>
      ${p.gallery.map((g) => `<img class="cs__img" src="${esc(g)}" alt="${esc(p.title)} screenshot" />`).join("")}
      <div class="cs__facts">
        <div><p>Year</p><strong>${esc(p.year)}</strong></div>
        <div><p>Focus</p><strong>${esc(p.focus || p.kind)}</strong></div>
        <div><p>My role</p><strong>${esc(p.role)}</strong></div>
      </div>
      <div class="cs__section"><h3>Overview</h3><p>${esc(p.summary)}</p></div>
      <div class="cs__section"><h3>Key features</h3><ul>${p.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul></div>
      <div class="cs__section"><h3>Built with</h3><div class="tags">${p.stack.map((s) => `<span class="tag">${esc(s)}</span>`).join("")}</div></div>
      ${p.url ? `<div class="cs__section"><a class="btn btn--primary" href="${esc(p.url)}" target="_blank" rel="noopener">Visit live site ↗</a></div>` : ""}
      <nav class="cs__nav" aria-label="More projects">
        <button data-open="${esc(prev.id)}">← ${esc(prev.title)}</button>
        <button data-open="${esc(next.id)}">${esc(next.title)} →</button>
      </nav>`;
    if (modal.hidden) {
      lastFocus = document.activeElement;
      modal.hidden = false;
      document.body.style.overflow = "hidden";
    }
    panel.scrollTop = 0;
    panel.focus();
    history.replaceState(null, "", `#work/${p.id}`);
  }

  function closeModal() {
    if (modal.hidden) return;
    modal.hidden = true;
    document.body.style.overflow = "";
    history.replaceState(null, "", "#work");
    lastFocus?.focus?.({ preventScroll: true });
  }

  document.addEventListener("click", (e) => {
    const open = e.target.closest("[data-open]");
    if (open) openProject(open.dataset.open);
    else if (e.target.closest("[data-close]")) closeModal();
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

  // Keep focus inside the open modal.
  modal.addEventListener("keydown", (e) => {
    if (e.key !== "Tab") return;
    const f = $$("button, a[href]", modal);
    if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f.at(-1).focus(); }
    else if (!e.shiftKey && document.activeElement === f.at(-1)) { e.preventDefault(); f[0].focus(); }
  });

  const fromHash = () => {
    const m = location.hash.match(/^#work\/([\w-]+)/);
    if (m) openProject(m[1]);
  };
  fromHash();
  addEventListener("hashchange", fromHash);

  /* ---------------------------------------------------------
     Scroll: header border, active nav, reveals
     --------------------------------------------------------- */
  const header = $(".header");
  const onScroll = () => header.classList.toggle("is-scrolled", scrollY > 8);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const navLinks = $$(".nav > a:not(.btn)");
  const navObs = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) navLinks.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === `#${en.target.id}`));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  ["services", "work", "about"].forEach((id) => navObs.observe(document.getElementById(id)));

  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); revealObs.unobserve(en.target); } });
  }, { rootMargin: "0px 0px -8% 0px" });
  $$("[data-reveal]").forEach((el) => revealObs.observe(el));
})();
