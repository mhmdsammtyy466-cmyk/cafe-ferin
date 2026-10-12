/* Cafe Ferin — public site script
   Products live in Supabase (single source of truth). The admin page is separate: /admin/ */
(() => {
  "use strict";

  /* ============ helpers ============ */
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const byId = id => document.getElementById(id);

  const { esc, safeUrl, faNum, fmtPrice, CATEGORIES, fetchProducts } = window.Ferin;

  const LOGO = '<img class="farin-inline" src="assets/images/farin-wordmark.webp" alt="فرین" decoding="async">';
  const withLogo = text => esc(text).replace(/Cafe Ferin/g, LOGO);

  const reduceMotion = matchMedia("(prefers-reduced-motion:reduce)").matches;
  const fx = matchMedia("(pointer:fine)").matches && !reduceMotion;   // pointer effects: mouse only

  /* Lock page scroll while any overlay is open. */
  let scrollLocks = 0;
  function lockScroll(on) {
    scrollLocks = Math.max(0, scrollLocks + (on ? 1 : -1));
    document.body.style.overflow = scrollLocks ? "hidden" : "";
  }

  /* ============ state ============ */
  let products = [];            // rows from the database
  let loadState = "loading";    // loading | ready | error
  let activeCategory = CATEGORIES[0].id;

  async function loadProducts() {
    loadState = "loading";
    renderProducts();
    try {
      products = await fetchProducts();
      loadState = "ready";
    } catch (e) {
      console.error("Cafe Ferin: could not load products", e);
      loadState = "error";
    }
    renderProducts();
    renderBestsellers();
  }

  /* ============ categories + product grid ============ */
  const categoryGrid = byId("categoryGrid");
  const productGrid = byId("productGrid");
  const menuSection = byId("menu");
  const closeCategoryBtn = byId("ferinCategoryClose");

  function renderCategories() {
    categoryGrid.innerHTML = CATEGORIES.map(c => {
      const on = c.id === activeCategory;
      return `<button type="button" class="category${on ? " active is-active" : ""}" aria-pressed="${on}" data-id="${c.id}" style="--cat-photo:url('${c.image}')">
      <span class="category-photo" aria-hidden="true" style="background-image:url('${c.image}')"></span>
      <span class="category-shade" aria-hidden="true"></span>
      <span class="category-name">${esc(c.name)}</span></button>`;
    }).join("");
  }

  const unitText = p => "تومان" + (p.unit ? " / " + p.unit : "");
  function priceHtml(p) {
    if (!p.price) return p.priceText ? `<span class="product-price">${esc(p.priceText)}</span>` : "";
    return `<span class="product-price">${fmtPrice(p.price)} <em>${esc(unitText(p))}</em></span>`;
  }
  const priceLine = p => (p.price ? `${fmtPrice(p.price)} ${unitText(p)}` : p.priceText);
  const oldPriceText = p => (p.oldPrice ? fmtPrice(p.oldPrice) : esc(p.oldPriceText));

  function renderProducts() {
    const cat = CATEGORIES.find(c => c.id === activeCategory);
    menuSection.classList.toggle("visible", !!cat);
    closeCategoryBtn.classList.toggle("is-visible", !!cat);
    if (!cat) return;
    byId("currentCategory").textContent = cat.name;
    const count = byId("productsCount");

    if (loadState === "loading") {
      count.textContent = "";
      productGrid.innerHTML = '<div class="empty">در حال بارگذاری منو…</div>';
      return;
    }
    if (loadState === "error") {
      count.textContent = "";
      productGrid.innerHTML = '<div class="empty">منو در دسترس نیست. اتصال اینترنت را بررسی کنید.<br><br><button type="button" class="btn btn-primary" data-retry>تلاش دوباره</button></div>';
      return;
    }

    const list = products.filter(p => p.category === cat.id);
    count.textContent = `${faNum(list.length)} محصول`;
    if (!list.length) {
      productGrid.innerHTML = '<div class="empty">هنوز محصولی در این دسته ثبت نشده است.</div>';
      return;
    }
    productGrid.innerHTML = list.map(p => {
      const img = safeUrl(p.image);
      return `
    <article class="product-card" data-id="${esc(p.id)}" tabindex="0" role="button" aria-label="مشاهده ${esc(p.name)}">
      ${p.badge ? `<span class="ferin-product-badge">${esc(p.badge)}</span>` : ""}
      <div class="product-image${img ? "" : " no-photo"}">
        ${img ? `<img src="${img}" alt="${esc(p.name)}" loading="lazy" decoding="async">` : ""}
        <span class="ph-icon" aria-hidden="true">${cat.icon}</span>
      </div>
      <div class="p-body">
        <h3 class="product-name">${esc(p.name)}</h3>
        <p class="product-desc">${withLogo(p.desc)}</p>
        <div class="p-price">
          <span class="p-old">${oldPriceText(p)}</span>
          ${priceHtml(p)}
        </div>
      </div>
    </article>`;
    }).join("");
    /* A broken image falls back to the category icon. */
    $$(".product-image img", productGrid).forEach(img =>
      img.addEventListener("error", () => { img.parentNode.classList.add("no-photo"); img.remove(); }, { once: true }));
  }

  function selectCategory(id) {
    activeCategory = id;
    renderCategories();
    renderProducts();
    menuSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  categoryGrid.addEventListener("click", e => {
    const btn = e.target.closest(".category");
    if (btn) selectCategory(btn.dataset.id);
  });
  closeCategoryBtn.addEventListener("click", () => {
    activeCategory = "";
    renderCategories();
    renderProducts();
    byId("categories").scrollIntoView({ behavior: "smooth", block: "start" });
  });
  productGrid.addEventListener("click", e => {
    if (e.target.closest("[data-retry]")) return loadProducts();
    const card = e.target.closest(".product-card");
    if (card) openQuickView(card.dataset.id, card);
  });
  productGrid.addEventListener("keydown", e => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const card = e.target.closest(".product-card");
    if (card) { e.preventDefault(); openQuickView(card.dataset.id, card); }
  });

  /* ============ quick view ============ */
  const qv = byId("ferinQuickView");
  let qvOpener = null;

  function openQuickView(id, opener) {
    const p = products.find(x => x.id === id);
    if (!p) return;
    const img = $(".ferin-qv-image img", qv);
    const src = safeUrl(p.image);
    img.src = src ? p.image : "";
    img.alt = src ? p.name : "";
    img.hidden = !src;
    $(".ferin-qv-title", qv).textContent = p.name;
    $(".ferin-qv-desc", qv).innerHTML = withLogo(p.desc || "محصولی از Cafe Ferin");
    $(".ferin-qv-price", qv).innerHTML =
      (oldPriceText(p) ? `<del style="opacity:.45;font-size:12px;margin-left:8px">${oldPriceText(p)}</del> ` : "") +
      esc(priceLine(p));
    qvOpener = opener || null;
    qv.classList.add("is-open");
    lockScroll(true);
    $(".ferin-qv-close", qv).focus();
  }
  function closeQuickView() {
    if (!qv.classList.contains("is-open")) return;
    qv.classList.remove("is-open");
    lockScroll(false);
    if (qvOpener) qvOpener.focus();
  }
  $(".ferin-qv-close", qv).addEventListener("click", closeQuickView);
  qv.addEventListener("click", e => { if (e.target === qv) closeQuickView(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeQuickView(); });

  /* ============ bestsellers carousel ============ */
  const fp = {
    box: byId("bestsellerBox"), stage: byId("fpStage"),
    dots: byId("fpDots"), count: byId("fpCount"),
    items: [], idx: 0, timer: null, paused: false
  };

  function fpCard(p) {
    const cat = CATEGORIES.find(c => c.id === p.category);
    const img = safeUrl(p.image);
    return `<div class="fp-img">${img ? `<img src="${img}" alt="${esc(p.name)}">` : esc(cat ? cat.icon : "🍰")}</div>
      <div class="fp-info"><h3 class="fp-name">${esc(p.name)}</h3>
      ${p.desc ? `<p class="fp-desc">${esc(p.desc)}</p>` : ""}
      <div>${oldPriceText(p) ? `<span class="fp-old">${oldPriceText(p)}</span>` : ""}${priceHtml(p).replace("product-price", "fp-price")}</div></div>`;
  }
  function fpShow(i, animate) {
    const old = $(".fp-card:not(.fp-out)", fp.stage);
    fp.idx = (i + fp.items.length) % fp.items.length;
    const card = document.createElement("div");
    card.className = "fp-card" + (animate ? " fp-in" : "");
    card.innerHTML = fpCard(fp.items[fp.idx]);
    if (old && animate) {
      old.classList.add("fp-out");
      setTimeout(() => old.remove(), 850);
    } else if (old) old.remove();
    fp.stage.appendChild(card);
    fp.dots.innerHTML = fp.items.map((_, n) =>
      `<button type="button" class="fp-dot${n === fp.idx ? " on" : ""}" data-i="${n}" aria-label="محصول ${faNum(n + 1)}"></button>`).join("");
    fp.count.textContent = fp.items.length > 1 ? `${faNum(fp.idx + 1)} / ${faNum(fp.items.length)}` : "";
  }
  function fpStart() {
    clearInterval(fp.timer);
    fp.timer = null;
    if (fp.items.length < 2) return;
    fp.timer = setInterval(() => { if (!fp.paused && !document.hidden) fpShow(fp.idx + 1, true); }, 4000);
  }
  function renderBestsellers() {
    fp.items = products.filter(p => p.badge.includes("پرفروش"));
    fp.stage.innerHTML = "";
    if (!fp.items.length) { fp.box.hidden = true; clearInterval(fp.timer); return; }
    fp.box.hidden = false;
    fp.idx = Math.min(fp.idx, fp.items.length - 1);
    fpShow(fp.idx, false);
    fpStart();
  }
  fp.dots.addEventListener("click", e => {
    const b = e.target.closest(".fp-dot");
    if (b) { fpShow(+b.dataset.i, true); fpStart(); }
  });
  fp.box.addEventListener("mouseenter", () => { fp.paused = true; });
  fp.box.addEventListener("mouseleave", () => { fp.paused = false; });
  fp.box.addEventListener("touchstart", () => { fp.paused = true; }, { passive: true });
  fp.box.addEventListener("touchend", () => setTimeout(() => { fp.paused = false; }, 2500), { passive: true });

  /* ============ theme ============ */
  (() => {
    const THEME_KEY = "ferin-theme-final-v2";
    const toggle = byId("themeToggle");
    const meta = byId("themeColorMeta");
    function apply(dark, persist) {
      const html = document.documentElement;
      html.setAttribute("data-theme", dark ? "dark" : "light");
      html.style.colorScheme = dark ? "dark" : "light";
      document.body.classList.toggle("dark", dark);
      document.body.setAttribute("data-theme", dark ? "dark" : "light");
      toggle.textContent = dark ? "☀️" : "🌙";
      toggle.setAttribute("aria-pressed", String(dark));
      toggle.setAttribute("aria-label", dark ? "فعال کردن حالت روز" : "فعال کردن حالت شب");
      toggle.title = dark ? "حالت روز" : "حالت شب";
      meta.setAttribute("content", dark ? "#12100f" : "#faf6f0");
      if (persist) { try { localStorage.setItem(THEME_KEY, dark ? "dark" : "light"); } catch (e) { /* ignore */ } }
    }
    apply(document.body.classList.contains("dark"), false);
    toggle.addEventListener("click", () => apply(!document.body.classList.contains("dark"), true));
  })();

  /* ============ page effects ============ */
  (() => {
    const navbar = byId("navbar");
    const hero = $(".hero");
    const heroContent = $(".hero-content");
    let ticking = false;

    /* One scroll handler: sticky-nav style + small hero parallax. */
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        navbar.classList.toggle("scrolled", window.scrollY > 50);
        if (!reduceMotion && hero && heroContent) {
          const top = hero.getBoundingClientRect().top;
          const progress = Math.max(-0.2, Math.min(0.2, -top / Math.max(1, hero.offsetHeight)));
          heroContent.style.transform = `translate3d(0,${progress * 28}px,0)`;
        }
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /* Mobile menu closes on outside tap and on link tap. */
    const menu = $(".mobile-menu");
    document.addEventListener("click", e => {
      if (menu.open && (!menu.contains(e.target) || e.target.closest(".mobile-menu-panel a"))) menu.open = false;
    });

    /* Sections fade in when they scroll into view. */
    const panels = $$("#about .container, #categories .container, #menu .container, #order .container, #notice .container");
    if (!reduceMotion && "IntersectionObserver" in window) {
      panels.forEach(p => p.classList.add("ferin-reveal"));
      const io = new IntersectionObserver(entries => entries.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add("ferin-in"); io.unobserve(en.target); }
      }), { threshold: 0.08, rootMargin: "0px 0px -60px 0px" });
      panels.forEach(p => io.observe(p));
    } else panels.forEach(p => p.classList.add("ferin-in"));

    if (!fx) return;

    /* 3D tilt on cards (event delegation, so re-rendered cards work). */
    const MAX = 7;
    const TILT = ".product-card, .category, .order-card, .notice-box";
    let tiltFrame = null;
    document.addEventListener("pointermove", e => {
      const card = e.target.closest && e.target.closest(TILT);
      if (!card || tiltFrame) return;
      tiltFrame = requestAnimationFrame(() => {
        tiltFrame = null;
        const r = card.getBoundingClientRect();
        if (!r.width || !r.height) return;
        card.style.setProperty("--ry", (((e.clientX - r.left) / r.width - 0.5) * MAX * 2).toFixed(2) + "deg");
        card.style.setProperty("--rx", ((-((e.clientY - r.top) / r.height - 0.5)) * MAX * 2).toFixed(2) + "deg");
      });
    }, { passive: true });
    document.addEventListener("pointerout", e => {
      const card = e.target.closest && e.target.closest(TILT);
      if (card && !card.contains(e.relatedTarget)) {
        card.style.setProperty("--rx", "0deg");
        card.style.setProperty("--ry", "0deg");
      }
    });

    /* Background shapes + lights follow the pointer by a fraction. */
    const shapes = [["croissant", 26], ["cake", 18], ["bread", 32], ["croissant2", 14], ["cup", 22]]
      .map(([n, d]) => ({ el: $(".ferin-shape--" + n), d })).filter(s => s.el);
    const grid = $(".ferin-grid");
    const lights = $$(".ferin-premium-light");
    let frame = null, nx = 0, ny = 0;
    window.addEventListener("pointermove", e => {
      nx = e.clientX / window.innerWidth - 0.5;
      ny = e.clientY / window.innerHeight - 0.5;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = null;
        shapes.forEach(s => {
          s.el.style.setProperty("--px", (nx * s.d).toFixed(2) + "px");
          s.el.style.setProperty("--py", (ny * s.d).toFixed(2) + "px");
        });
        if (grid) grid.style.backgroundPosition = (nx * 16).toFixed(1) + "px " + (ny * 16).toFixed(1) + "px";
        lights.forEach((l, i) => {
          const k = i ? -0.7 : 1;
          l.style.transform = `translate3d(${nx * 28 * k}px,${ny * 28 * k}px,0)`;
        });
        if (hero) {
          hero.style.setProperty("--mx", (nx * 14).toFixed(1) + "px");
          hero.style.setProperty("--my", (ny * 10).toFixed(1) + "px");
        }
      });
    }, { passive: true });
  })();

  /* ============ start ============ */
  renderCategories();
  loadProducts();
})();
