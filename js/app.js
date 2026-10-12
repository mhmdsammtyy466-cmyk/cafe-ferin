/* Cafe Ferin — site script
   Products live in Supabase (single source of truth). Reading is public;
   adding / editing / deleting needs the admin login (Supabase Auth). */
(() => {
  "use strict";

  /* ============ helpers ============ */
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const byId = id => document.getElementById(id);

  const ESC = { "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" };
  const esc = v => String(v ?? "").replace(/[&<>'"]/g, c => ESC[c]);
  /* Only our own images or https images may be used as <img src>. */
  const safeUrl = u => (/^(https:\/\/|assets\/)/.test(u || "") ? esc(u) : "");
  const faNum = n => Number(n).toLocaleString("fa-IR");
  const fmtPrice = n => (n ? faNum(n) : "");
  const toNum = v => parseInt(
    String(v ?? "")
      .replace(/[۰-۹]/g, d => "۰۱۲۳۴۵۶۷۸۹".indexOf(d))
      .replace(/[٠-٩]/g, d => "٠١٢٣٤٥٦٧٨٩".indexOf(d))
      .replace(/\D/g, ""), 10) || 0;

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

  /* ============ data ============ */
  const CATEGORIES = [
    { id: "fantasy", name: "نان فانتزی", icon: "🥖", image: "assets/images/cat-fantasy-v3.webp" },
    { id: "cake", name: "کیک و شیرینی", icon: "🎂", image: "assets/images/cat-cake-v3.webp" },
    { id: "dessert", name: "دسر", icon: "🍮", image: "assets/images/cat-dessert-v3.webp" },
    { id: "cookie", name: "کوکی", icon: "🍪", image: "assets/images/cat-cookie-v3.webp" },
    { id: "diet", name: "محصولات رژیمی", icon: "🌿", image: "assets/images/cat-diet-v2.webp" }
  ];

  const SUPABASE_URL = (window.SUPABASE_CONFIG && window.SUPABASE_CONFIG.url) || "";
  const SUPABASE_KEY = (window.SUPABASE_CONFIG && window.SUPABASE_CONFIG.anonKey) || "";
  const BUCKET = "product-images";
  const SESSION_KEY = "ferin_admin_session";

  let products = [];            // rows from the database, normalised by normalise()
  let loadState = "loading";    // loading | ready | error
  let activeCategory = CATEGORIES[0].id;

  /* Turn a database row into what the UI needs. Old rows only have the text
     columns price / old_price, so they are still shown until they are edited. */
  function normalise(r) {
    return {
      id: r.id,
      name: r.name || "",
      category: r.category,
      desc: r.description || "",
      image: r.image_url || "",
      badge: r.badge && r.badge !== "بدون وضعیت" ? r.badge : "",
      unit: r.unit || "",
      price: r.price_num || toNum(r.price),
      oldPrice: r.old_price_num || toNum(r.old_price),
      priceText: r.price_num ? "" : (r.price || ""),
      oldPriceText: r.old_price_num ? "" : (r.old_price || "")
    };
  }

  /* ============ Supabase REST ============ */
  function getSession() {
    try { return JSON.parse(sessionStorage.getItem(SESSION_KEY)); } catch (e) { return null; }
  }
  function setSession(j) {
    try {
      if (!j) return sessionStorage.removeItem(SESSION_KEY);
      sessionStorage.setItem(SESSION_KEY, JSON.stringify({
        access_token: j.access_token,
        refresh_token: j.refresh_token,
        expires_at: Date.now() + (j.expires_in || 3600) * 1000
      }));
    } catch (e) { /* storage blocked: the admin simply has to log in again */ }
  }
  async function authRequest(grant, payload) {
    const r = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=${grant}`, {
      method: "POST",
      headers: { apikey: SUPABASE_KEY, "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!r.ok) throw new Error("AUTH");
    return r.json();
  }
  async function login(email, password) {
    setSession(await authRequest("password", { email, password }));
  }
  /* A valid admin token, refreshed if it is about to expire. */
  async function adminToken() {
    let s = getSession();
    if (!s) throw new Error("AUTH");
    if (s.expires_at - Date.now() < 30000) {
      try { setSession(await authRequest("refresh_token", { refresh_token: s.refresh_token })); }
      catch (e) { setSession(null); throw e; }
      s = getSession();
    }
    return s.access_token;
  }

  async function api(path, { method = "GET", body, admin = false, headers = {} } = {}) {
    const token = admin ? await adminToken() : SUPABASE_KEY;
    const res = await fetch(SUPABASE_URL + path, {
      method,
      headers: Object.assign({
        apikey: SUPABASE_KEY,
        Authorization: "Bearer " + token
      }, body ? { "Content-Type": "application/json" } : {}, headers),
      body: body ? JSON.stringify(body) : undefined
    });
    if (!res.ok) {
      if (admin && (res.status === 401 || res.status === 403)) { setSession(null); throw new Error("AUTH"); }
      let msg = "خطای سرور (" + res.status + ")";
      try { const j = await res.json(); msg = j.message || j.hint || msg; } catch (e) { /* keep default */ }
      throw new Error(msg);
    }
    const text = await res.text();
    return text ? JSON.parse(text) : null;
  }

  async function loadProducts() {
    loadState = "loading";
    renderProducts();
    try {
      const rows = await api("/rest/v1/products?select=*&order=created_at.asc");
      products = (rows || []).map(normalise);
      loadState = "ready";
    } catch (e) {
      console.error("Cafe Ferin: could not load products", e);
      loadState = "error";
    }
    renderProducts();
    renderBestsellers();
    renderAdminList();
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

  /* ============ admin ============ */
  const A = {
    floating: byId("ferinAdminFloating"), open: byId("ferinAdminOpen"),
    overlay: byId("ferinAdminOverlay"),
    auth: byId("ferinAdminAuthOverlay"), authForm: byId("ferinAdminAuthBox"),
    email: byId("ferinAdminAuthEmail"), pass: byId("ferinAdminAuthPassword"), authError: byId("ferinAdminAuthError"),
    name: byId("ferinAdminName"), category: byId("ferinAdminCategory"), status: byId("ferinAdminStatus"),
    unit: byId("ferinAdminUnit"), image: byId("ferinAdminImage"), preview: byId("ferinAdminPreviewImg"),
    imageStatus: byId("ferinAdminImageStatus"), price: byId("ferinAdminPrice"), oldPrice: byId("ferinAdminOldPrice"),
    desc: byId("ferinAdminDesc"), save: byId("ferinAdminSave"), search: byId("ferinAdminSearch"),
    list: byId("ferinAdminList"), msg: byId("ferinDbStatus")
  };
  let editingId = null;
  let pickedImage = null;        // Blob of a newly chosen photo
  let currentImage = "";         // photo already stored for the product being edited

  const isOpen = el => el.classList.contains("is-open");
  function setOverlay(el, on) {
    if (isOpen(el) === on) return;
    el.classList.toggle("is-open", on);
    el.setAttribute("aria-hidden", String(!on));
    lockScroll(on);
  }
  function say(text, ok) {
    A.msg.textContent = text ? (ok ? "✅ " : "❌ ") + text : "";
    A.msg.className = "ferin-db-status" + (text ? (ok ? " ok" : " bad") : "");
  }

  /* The ⚙️ button exists only for whoever opens the site with /#admin. */
  const syncAdminButton = () => { A.floating.hidden = location.hash !== "#admin"; };
  window.addEventListener("hashchange", syncAdminButton);
  syncAdminButton();

  function showLogin() {
    A.authError.textContent = "";
    A.pass.value = "";
    setOverlay(A.auth, true);
    setTimeout(() => (A.email.value ? A.pass : A.email).focus(), 50);
  }
  function openPanel() {
    A.category.innerHTML = CATEGORIES.map(c => `<option value="${c.id}">${c.icon} ${esc(c.name)}</option>`).join("");
    resetForm();
    renderAdminList();
    A.overlay.scrollTop = 0;
    setOverlay(A.overlay, true);
  }
  function closePanel() { setOverlay(A.overlay, false); resetForm(); }
  function sessionExpired() {
    closePanel();
    showLogin();
    A.authError.textContent = "نشست شما تمام شده است؛ دوباره وارد شوید.";
  }

  A.open.addEventListener("click", () => (getSession() ? openPanel() : showLogin()));
  A.authForm.addEventListener("submit", async e => {
    e.preventDefault();
    A.authError.textContent = "";
    try {
      await login(A.email.value.trim(), A.pass.value);
      A.pass.value = "";
      setOverlay(A.auth, false);
      openPanel();
    } catch (err) {
      A.authError.textContent = "ایمیل یا رمز عبور اشتباه است.";
      A.pass.value = "";
      A.pass.focus();
    }
  });
  byId("ferinAdminAuthCancel").addEventListener("click", () => setOverlay(A.auth, false));
  A.auth.addEventListener("click", e => { if (e.target === A.auth) setOverlay(A.auth, false); });
  byId("ferinAdminClose").addEventListener("click", closePanel);
  A.overlay.addEventListener("click", e => { if (e.target === A.overlay) closePanel(); });
  byId("ferinAdminLogout").addEventListener("click", () => { setSession(null); closePanel(); });
  document.addEventListener("keydown", e => {
    if (e.key !== "Escape") return;
    closeQuickView();
    setOverlay(A.auth, false);
    if (isOpen(A.overlay)) closePanel();
  });

  /* --- photo: shrink in the browser, upload to the public bucket --- */
  function compressImage(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        const img = new Image();
        img.onerror = reject;
        img.onload = () => {
          const scale = Math.min(1, 1100 / Math.max(img.width, img.height));
          const c = document.createElement("canvas");
          c.width = Math.max(1, Math.round(img.width * scale));
          c.height = Math.max(1, Math.round(img.height * scale));
          c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
          c.toBlob(b => (b ? resolve(b) : reject(new Error("compress"))), "image/jpeg", 0.78);
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  }
  async function uploadImage(blob, id) {
    const path = `products/${id}-${Date.now()}.jpg`;
    const token = await adminToken();
    const r = await fetch(`${SUPABASE_URL}/storage/v1/object/${BUCKET}/${path}`, {
      method: "POST",
      headers: { apikey: SUPABASE_KEY, Authorization: "Bearer " + token, "Content-Type": "image/jpeg", "x-upsert": "true" },
      body: blob
    });
    if (r.status === 401 || r.status === 403) { setSession(null); throw new Error("AUTH"); }
    if (!r.ok) throw new Error("آپلود عکس ناموفق بود");
    return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${path}`;
  }
  A.image.addEventListener("change", async () => {
    const file = A.image.files && A.image.files[0];
    if (!file) return;
    A.imageStatus.textContent = "در حال آماده‌سازی عکس...";
    try {
      pickedImage = await compressImage(file);
      A.preview.src = URL.createObjectURL(pickedImage);
      A.preview.classList.add("show");
      A.imageStatus.textContent = "عکس جدید انتخاب شد.";
    } catch (err) {
      pickedImage = null;
      A.imageStatus.textContent = "خواندن عکس انجام نشد.";
    }
  });

  /* --- form --- */
  function resetForm() {
    editingId = null; pickedImage = null; currentImage = "";
    A.name.value = A.price.value = A.oldPrice.value = A.desc.value = A.image.value = "";
    A.status.value = "بدون وضعیت";
    A.unit.value = "";
    A.preview.removeAttribute("src");
    A.preview.classList.remove("show");
    A.imageStatus.textContent = "برای محصول جدید، انتخاب عکس الزامی است.";
    A.save.textContent = "➕ افزودن محصول";
  }
  function editProduct(id) {
    const p = products.find(x => x.id === id);
    if (!p) return;
    resetForm();
    editingId = id;
    A.name.value = p.name;
    A.category.value = p.category;
    A.status.value = p.badge || "بدون وضعیت";
    A.unit.value = p.unit || (/کیلو/.test(p.priceText) ? "کیلو" : "");
    A.price.value = p.price || "";
    A.oldPrice.value = p.oldPrice || "";
    A.desc.value = p.desc;
    currentImage = p.image;
    if (p.image) { A.preview.src = p.image; A.preview.classList.add("show"); }
    A.imageStatus.textContent = p.image ? "عکس فعلی محصول فعال است؛ در صورت نیاز عکس جدید انتخاب کنید." : "عکسی ثبت نشده است.";
    A.save.textContent = "💾 ذخیره ویرایش";
    A.name.focus();
  }

  function renderAdminList() {
    const q = (A.search.value || "").trim().toLowerCase();
    const rows = products.filter(p => (p.name + " " + catName(p.category)).toLowerCase().includes(q));
    A.list.innerHTML = rows.length ? rows.map(p => `
      <div class="ferin-admin-item">
        ${safeUrl(p.image) ? `<img class="ferin-admin-thumb" src="${safeUrl(p.image)}" alt="">` : '<span class="ferin-admin-thumb"></span>'}
        <div><div class="ferin-admin-item-name">${esc(p.name || "بدون نام")}</div>
        <div class="ferin-admin-item-meta">${esc(catName(p.category))}${p.price ? " • " + fmtPrice(p.price) + " تومان" : (p.priceText ? " • " + esc(p.priceText) : "")}${p.badge ? " • " + esc(p.badge) : ""}</div></div>
        <div class="ferin-admin-item-actions">
          <button class="ferin-admin-edit" type="button" data-edit="${esc(p.id)}">ویرایش</button>
          <button class="ferin-admin-delete" type="button" data-delete="${esc(p.id)}">حذف</button>
        </div>
      </div>`).join("") : '<div class="ferin-admin-empty">محصولی پیدا نشد.</div>';
  }
  const catName = id => (CATEGORIES.find(c => c.id === id) || {}).name || "";
  A.search.addEventListener("input", renderAdminList);
  byId("ferinAdminCancel").addEventListener("click", resetForm);
  A.list.addEventListener("click", e => {
    const edit = e.target.closest("[data-edit]");
    if (edit) return editProduct(edit.dataset.edit);
    const del = e.target.closest("[data-delete]");
    if (del) deleteProduct(del.dataset.delete);
  });

  /* PATCH / DELETE that touch no row (blocked by the database rules) return an empty list. */
  const touched = res => Array.isArray(res) && res.length > 0;

  async function saveProduct() {
    const name = A.name.value.trim();
    if (!name) return say("لطفاً نام محصول را وارد کنید.", false);
    if (!A.category.value) return say("لطفاً دسته‌بندی محصول را انتخاب کنید.", false);
    if (!editingId && !pickedImage) return say("لطفاً عکس محصول را انتخاب کنید.", false);
    A.save.disabled = true;
    say("در حال ذخیره...", true);
    try {
      const id = editingId || crypto.randomUUID();
      let image = currentImage;
      if (pickedImage) image = await uploadImage(pickedImage, id);
      const row = {
        name,
        category: A.category.value,
        badge: A.status.value === "بدون وضعیت" ? "" : A.status.value,
        unit: A.unit.value,
        price_num: toNum(A.price.value) || null,
        old_price_num: toNum(A.oldPrice.value) || null,
        price: null,
        old_price: null,
        description: A.desc.value.trim(),
        image_url: image || null
      };
      const rep = { Prefer: "return=representation", "Content-Type": "application/json" };
      if (editingId) {
        const res = await api("/rest/v1/products?id=eq." + encodeURIComponent(id), { method: "PATCH", admin: true, body: row, headers: rep });
        if (!touched(res)) throw new Error("ذخیره انجام نشد (دسترسی ندارید یا محصول پیدا نشد).");
      } else {
        await api("/rest/v1/products", { method: "POST", admin: true, body: Object.assign({ id }, row), headers: rep });
      }
      const wasEditing = !!editingId;
      resetForm();
      await loadProducts();
      say(wasEditing ? "تغییرات ذخیره شد." : "محصول اضافه شد.", true);
    } catch (err) {
      if (err.message === "AUTH") return sessionExpired();
      say("ذخیره انجام نشد: " + err.message, false);
    } finally {
      A.save.disabled = false;
    }
  }
  A.save.addEventListener("click", saveProduct);

  async function deleteProduct(id) {
    const p = products.find(x => x.id === id);
    if (!p || !confirm("آیا از حذف «" + (p.name || "این محصول") + "» مطمئن هستید؟")) return;
    try {
      const res = await api("/rest/v1/products?id=eq." + encodeURIComponent(id), { method: "DELETE", admin: true, headers: { Prefer: "return=representation" } });
      if (!touched(res)) throw new Error("حذف انجام نشد (دسترسی ندارید یا محصول پیدا نشد).");
      if (editingId === id) resetForm();
      await loadProducts();
      say("محصول حذف شد.", true);
    } catch (err) {
      if (err.message === "AUTH") return sessionExpired();
      say("حذف انجام نشد: " + err.message, false);
    }
  }

  /* ============ start ============ */
  renderCategories();
  loadProducts();
})();
