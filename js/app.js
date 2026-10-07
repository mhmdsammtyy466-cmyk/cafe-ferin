/* Cafe Ferin — extracted JS; original script order preserved. */
/* ===== Original inline script 1 ===== */
/* =========================================================
   EDIT YOUR MENU HERE
   برای اضافه/حذف/ویرایش محصولات فقط همین قسمت را تغییر دهید.
   ========================================================= */

const menuData = [
  {
    "id": "fantasy",
    "name": "نان فانتزی",
    "icon": "🥖",
    "products": [
      {
        "name": "نان بربری سنتی",
        "price": "۵۵,۰۰۰",
        "oldPrice": "65٬000",
        "rating": 4.9,
        "ratingCount": 812,
        "time": 35,
        "tag": "ارسال رایگان",
        "desc": "محصول تازه و خوش\u200cطعم Cafe Ferin",
        "image": ""
      },
      {
        "name": "نان سنگک",
        "price": "۴۸,۰۰۰",
        "oldPrice": "57٬000",
        "rating": 4.8,
        "ratingCount": 645,
        "time": 30,
        "tag": "بهترین قیمت",
        "desc": "محصول تازه و خوش\u200cطعم Cafe Ferin",
        "image": ""
      },
      {
        "name": "نان لواش تازه",
        "price": "۳۲,۰۰۰",
        "oldPrice": "38٬000",
        "rating": 4.7,
        "ratingCount": 431,
        "time": 25,
        "tag": "تخفیف",
        "desc": "محصول تازه و خوش\u200cطعم Cafe Ferin",
        "image": ""
      },
      {
        "name": "نان باگت فرانسوی",
        "price": "۶۵,۰۰۰",
        "oldPrice": "77٬000",
        "rating": 4.9,
        "ratingCount": 388,
        "time": 40,
        "tag": "ارسال رایگان",
        "desc": "محصول تازه و خوش\u200cطعم Cafe Ferin",
        "image": ""
      }
    ]
  },
  {
    "id": "cake",
    "name": "کیک و شیرینی",
    "icon": "🎂",
    "products": [
      {
        "name": "کیک شکلاتی خانه",
        "price": "۱۸۵,۰۰۰",
        "oldPrice": "218٬000",
        "rating": 4.9,
        "ratingCount": 1024,
        "time": 45,
        "tag": "ارسال رایگان",
        "desc": "محصول تازه و خوش\u200cطعم Cafe Ferin",
        "image": ""
      },
      {
        "name": "کیک وانیلی",
        "price": "۱۶۵,۰۰۰",
        "oldPrice": "195٬000",
        "rating": 4.8,
        "ratingCount": 733,
        "time": 45,
        "tag": "بهترین قیمت",
        "desc": "محصول تازه و خوش\u200cطعم Cafe Ferin",
        "image": ""
      },
      {
        "name": "کیک هویج و گردو",
        "price": "۱۷۵,۰۰۰",
        "oldPrice": "206٬000",
        "rating": 4.7,
        "ratingCount": 512,
        "time": 50,
        "tag": "تخفیف",
        "desc": "محصول تازه و خوش\u200cطعم Cafe Ferin",
        "image": ""
      },
      {
        "name": "کیک ردولوت",
        "price": "۲۱۰,۰۰۰",
        "oldPrice": "248٬000",
        "rating": 5.0,
        "ratingCount": 296,
        "time": 55,
        "tag": "ارسال رایگان",
        "desc": "محصول تازه و خوش\u200cطعم Cafe Ferin",
        "image": ""
      },
      {
        "_adminId": "base_sweet_0",
        "name": "شیرینی دانمارکی",
        "price": "۴۵,۰۰۰",
        "oldPrice": "53٬000",
        "rating": 4.8,
        "ratingCount": 690,
        "time": 30,
        "tag": "ارسال رایگان",
        "desc": "محصول تازه و خوش\u200cطعم Cafe Ferin",
        "image": ""
      },
      {
        "_adminId": "base_sweet_1",
        "name": "کیک یزدی",
        "price": "۳۵,۰۰۰",
        "oldPrice": "41٬000",
        "rating": 4.7,
        "ratingCount": 1102,
        "time": 25,
        "tag": "بهترین قیمت",
        "desc": "محصول تازه و خوش\u200cطعم Cafe Ferin",
        "image": ""
      },
      {
        "_adminId": "base_sweet_2",
        "name": "باقلوا",
        "price": "۱۲۰,۰۰۰",
        "oldPrice": "142٬000",
        "rating": 4.9,
        "ratingCount": 545,
        "time": 35,
        "tag": "تخفیف",
        "desc": "محصول تازه و خوش\u200cطعم Cafe Ferin",
        "image": ""
      },
      {
        "_adminId": "base_sweet_3",
        "name": "شیرینی نخودچی",
        "price": "۵۵,۰۰۰",
        "oldPrice": "65٬000",
        "rating": 4.8,
        "ratingCount": 806,
        "time": 30,
        "tag": "ارسال رایگان",
        "desc": "محصول تازه و خوش\u200cطعم Cafe Ferin",
        "image": ""
      }
    ]
  },
  {
    "id": "dessert",
    "name": "دسر",
    "icon": "🍮",
    "products": [
      {
        "name": "تیرامیسو",
        "price": "۱۹۵,۰۰۰",
        "oldPrice": "230٬000",
        "rating": 5.0,
        "ratingCount": 942,
        "time": 40,
        "tag": "ارسال رایگان",
        "desc": "محصول تازه و خوش\u200cطعم Cafe Ferin",
        "image": ""
      },
      {
        "name": "پاناکوتا",
        "price": "۱۴۵,۰۰۰",
        "oldPrice": "171٬000",
        "rating": 4.8,
        "ratingCount": 418,
        "time": 40,
        "tag": "تخفیف",
        "desc": "محصول تازه و خوش\u200cطعم Cafe Ferin",
        "image": ""
      },
      {
        "name": "کرم کارامل",
        "price": "۱۲۰,۰۰۰",
        "oldPrice": "142٬000",
        "rating": 4.7,
        "ratingCount": 655,
        "time": 35,
        "tag": "بهترین قیمت",
        "desc": "محصول تازه و خوش\u200cطعم Cafe Ferin",
        "image": ""
      },
      {
        "name": "چیزکیک لیوانی",
        "price": "۱۶۵,۰۰۰",
        "oldPrice": "195٬000",
        "rating": 4.9,
        "ratingCount": 771,
        "time": 45,
        "tag": "ارسال رایگان",
        "desc": "محصول تازه و خوش\u200cطعم Cafe Ferin",
        "image": ""
      }
    ]
  },
  {
    "id": "cookie",
    "name": "کوکی",
    "icon": "🍪",
    "products": [
      {
        "name": "کوکی شکلات چیپ",
        "price": "۲۸,۰۰۰",
        "oldPrice": "33٬000",
        "rating": 4.9,
        "ratingCount": 1345,
        "time": 20,
        "tag": "ارسال رایگان",
        "desc": "محصول تازه و خوش\u200cطعم Cafe Ferin",
        "image": ""
      },
      {
        "name": "کوکی جو دوسر",
        "price": "۲۶,۰۰۰",
        "oldPrice": "31٬000",
        "rating": 4.7,
        "ratingCount": 622,
        "time": 20,
        "tag": "بهترین قیمت",
        "desc": "محصول تازه و خوش\u200cطعم Cafe Ferin",
        "image": ""
      },
      {
        "name": "کوکی بادام",
        "price": "۳۲,۰۰۰",
        "oldPrice": "38٬000",
        "rating": 4.8,
        "ratingCount": 508,
        "time": 25,
        "tag": "تخفیف",
        "desc": "محصول تازه و خوش\u200cطعم Cafe Ferin",
        "image": ""
      },
      {
        "name": "کوکی نارگیلی",
        "price": "۳۰,۰۰۰",
        "oldPrice": "35٬000",
        "rating": 4.8,
        "ratingCount": 460,
        "time": 25,
        "tag": "ارسال رایگان",
        "desc": "محصول تازه و خوش\u200cطعم Cafe Ferin",
        "image": ""
      }
    ]
  },
  {
    "id": "diet",
    "name": "محصولات رژیمی",
    "icon": "🌿",
    "products": [
      {
        "name": "نان جو دوسر",
        "price": "۷۵,۰۰۰",
        "oldPrice": "88٬000",
        "rating": 4.8,
        "ratingCount": 384,
        "time": 30,
        "tag": "ارسال رایگان",
        "desc": "محصول تازه و خوش\u200cطعم Cafe Ferin",
        "image": ""
      },
      {
        "name": "گرانولا خانگی",
        "price": "۹۵,۰۰۰",
        "oldPrice": "112٬000",
        "rating": 4.9,
        "ratingCount": 517,
        "time": 15,
        "tag": "بهترین قیمت",
        "desc": "محصول تازه و خوش\u200cطعم Cafe Ferin",
        "image": ""
      },
      {
        "name": "مافین رژیمی",
        "price": "۸۵,۰۰۰",
        "oldPrice": "100٬000",
        "rating": 4.6,
        "ratingCount": 298,
        "time": 35,
        "tag": "تخفیف",
        "desc": "محصول تازه و خوش\u200cطعم Cafe Ferin",
        "image": ""
      },
      {
        "name": "کیک پروتئینی",
        "price": "۱۱۰,۰۰۰",
        "oldPrice": "130٬000",
        "rating": 4.8,
        "ratingCount": 403,
        "time": 40,
        "tag": "ارسال رایگان",
        "desc": "محصول تازه و خوش\u200cطعم Cafe Ferin",
        "image": ""
      }
    ]
  }
];

const categoryGrid = document.getElementById("categoryGrid");
const productGrid = document.getElementById("productGrid");
const currentCategory = document.getElementById("currentCategory");
const productsCount = document.getElementById("productsCount");

let activeCategory = "";

/* Each category shows its own photograph, with the name on a glass plate
   so the label stays readable over any image. */
const categoryImages = {"fantasy": "assets/images/cat-fantasy-v2.webp", "cake": "assets/images/cat-cake-v2.webp", "dessert": "assets/images/cat-dessert-v2.webp", "cookie": "assets/images/cat-cookie-v2.webp", "diet": "assets/images/cat-diet-v2.webp"};

function renderCategories(){
  categoryGrid.innerHTML = menuData.map(cat => {
    const img = categoryImages[cat.id] || "";
    return `
    <button class="category ${cat.id === activeCategory ? "active is-active" : ""}"
            aria-selected="${cat.id === activeCategory ? "true" : "false"}"
            style="--cat-photo:url('${img}')"
            onclick="selectCategory('${cat.id}')">
      <span class="category-photo" aria-hidden="true" style="background-image:url('${img}')"></span>
      <span class="category-shade" aria-hidden="true"></span>
      <span class="category-name">${cat.name}</span>
    </button>`;
  }).join("");
}



function renderProducts(){
  const menuSection = document.getElementById("menu");
  const category = menuData.find(cat => cat.id === activeCategory);
  if(!menuSection || !category){
    if(menuSection) menuSection.classList.remove("visible");
    return;
  }

  menuSection.classList.add("visible");
  currentCategory.textContent = category.name;
  productsCount.textContent = `${category.products.length} محصول`;

  if(!category.products.length){
    productGrid.innerHTML = '<div class="empty">هنوز محصولی در این دسته ثبت نشده است.</div>';
    return;
  }

  productGrid.innerHTML = category.products.map(product => {
    const rawStatus = product.badge || product.tag || "";
    const status = String(rawStatus).trim();
    const safeName = String(product.name || "محصول").replace(/[&<>'"]/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[ch]));
    const safeDesc = String(product.desc || "").replace(/Cafe Ferin/g, '<span class="cafe-brand">Cafe Ferin</span>');
    const safeImage = String(product.image || "");
    const badgeHtml = status && status !== "بدون وضعیت"
      ? `<span class="ferin-product-badge">${status}</span>`
      : "";

    return `
    <article class="product-card">
      ${badgeHtml}
      <div class="product-image${safeImage ? "" : " no-photo"}">
        ${safeImage ? `<img src="${safeImage}" alt="${safeName}" loading="lazy" onerror="this.parentNode.classList.add('no-photo');this.remove()">` : ""}
        <span class="ph-icon" aria-hidden="true">${category.icon || "🍰"}</span>
      </div>
      <div class="p-body">
        <h3 class="product-name">${safeName}</h3>
        <p class="product-desc">${safeDesc}</p>
        <div class="p-price">
          <span class="p-old">${product.oldPrice || ""}</span>
          <span class="product-price">${product.price || ""} <em>تومان</em></span>
        </div>
      </div>
    </article>`;
  }).join("");
}

function selectCategory(id){
  activeCategory = id;
  renderCategories();
  renderProducts();
  document.getElementById("menu").scrollIntoView({behavior:"smooth", block:"start"});
}

renderCategories();
renderProducts();


/* Navbar *//* Navbar */
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});


/* ===== FINAL DAY / NIGHT MODE — SINGLE HANDLER ===== */
(function(){
  "use strict";
  const toggle = document.getElementById("themeToggle");
  const meta = document.getElementById("themeColorMeta");
  const THEME_KEY = "ferin-theme-final-v2";
  if(!toggle) return;

  function applyTheme(theme, persist){
    const dark = theme === "dark";
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    document.body.classList.toggle("dark", dark);
    document.body.setAttribute("data-theme", dark ? "dark" : "light");
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
    toggle.textContent = dark ? "☀️" : "🌙";
    toggle.setAttribute("aria-pressed", dark ? "true" : "false");
    toggle.setAttribute("aria-label", dark ? "فعال کردن حالت روز" : "فعال کردن حالت شب");
    toggle.title = dark ? "حالت روز" : "حالت شب";
    if(meta) meta.setAttribute("content", dark ? "#12100f" : "#faf6f0");
    if(persist){ try { localStorage.setItem(THEME_KEY, dark ? "dark" : "light"); } catch(e){} }
  }

  let saved="light";
  try { saved=localStorage.getItem(THEME_KEY) || "light"; } catch(e){}
  applyTheme(saved === "dark" ? "dark" : "light", false);

  // A single property handler prevents duplicate click listeners from older revisions.
  toggle.onclick=function(e){
    e.preventDefault();
    e.stopPropagation();
    const next=document.body.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next, true);
  };
})();

/* ===== Original inline script 3 ===== */
(function(){
  "use strict";

  document.body.classList.add("ferin-ready");

  var finePointer = window.matchMedia("(pointer:fine)").matches;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion:reduce)").matches;

  /* -----------------------------------------------------------------
     3D tilt for glass cards. The stylesheet owns the visual result; this
     only writes the --rx / --ry angles, so the effect stays smooth and
     the cards keep their layout when JS is unavailable.
     ----------------------------------------------------------------- */
  if(finePointer && !reduceMotion){
    var MAX = 7;          // degrees of tilt at the card edge
    var cards = document.querySelectorAll(
      ".product-card, .category, .feature, .order-card, .notice-box"
    );

    Array.prototype.forEach.call(cards, function(card){
      var frame = null;

      function onMove(e){
        if(frame) return;
        frame = requestAnimationFrame(function(){
          frame = null;
          var r = card.getBoundingClientRect();
          if(!r.width || !r.height) return;
          var x = (e.clientX - r.left) / r.width  - .5;
          var y = (e.clientY - r.top)  / r.height - .5;
          card.style.setProperty("--ry", (x * MAX * 2).toFixed(2) + "deg");
          card.style.setProperty("--rx", (-y * MAX * 2).toFixed(2) + "deg");
        });
      }

      function onLeave(){
        if(frame){ cancelAnimationFrame(frame); frame = null; }
        card.style.setProperty("--rx", "0deg");
        card.style.setProperty("--ry", "0deg");
      }

      card.addEventListener("pointermove", onMove);
      card.addEventListener("pointerleave", onLeave);
      card.addEventListener("pointercancel", onLeave);
    });

    /* Hero parallax follows the pointer across the whole viewport. */
    var hero = document.querySelector(".hero");
    if(hero){
      var heroFrame = null;
      hero.addEventListener("pointermove", function(e){
        if(heroFrame) return;
        heroFrame = requestAnimationFrame(function(){
          heroFrame = null;
          hero.style.setProperty("--mx", ((e.clientX / window.innerWidth  - .5) * 14).toFixed(1) + "px");
          hero.style.setProperty("--my", ((e.clientY / window.innerHeight - .5) * 10).toFixed(1) + "px");
        });
      });
      hero.addEventListener("pointerleave", function(){
        if(heroFrame){ cancelAnimationFrame(heroFrame); heroFrame = null; }
        hero.style.setProperty("--mx", "0px");
        hero.style.setProperty("--my", "0px");
      });
    }
  }

  /* Re-bind tilt after a category switch, since the grids are rebuilt. */
  var grids = [document.getElementById("productGrid"), document.getElementById("categoryGrid")];
  grids.forEach(function(grid){
    if(!grid || !window.MutationObserver) return;
    new MutationObserver(function(){
      /* Cards are freshly rendered, so their angles reset naturally. */
      grid.querySelectorAll("*").forEach(function(el){
        el.style.removeProperty("--rx");
        el.style.removeProperty("--ry");
      });
    }).observe(grid, { childList:true });
  });
})();

/* ===== Original inline script 4 ===== */
(function(){
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion:reduce)").matches;

  /* Reveal the glass section panels as they scroll into view. */
  var panels = document.querySelectorAll(
    "#about .container, #categories .container, #menu .container, #order .container, #notice .container, footer .footer-inner"
  );
  if(!panels.length) return;

  if(reduce || !("IntersectionObserver" in window)){
    Array.prototype.forEach.call(panels, function(p){ p.classList.add("ferin-in"); });
    return;
  }

  Array.prototype.forEach.call(panels, function(p){ p.classList.add("ferin-reveal"); });

  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        e.target.classList.add("ferin-in");
        obs.unobserve(e.target);
      }
    });
  }, { threshold:0.08, rootMargin:"0px 0px -60px 0px" });

  Array.prototype.forEach.call(panels, function(p){ obs.observe(p); });
})();

/* ===== Original inline script 5 ===== */
(function(){
  "use strict";
  var field = document.querySelector(".ferin-field");
  if(!field) return;

  var finePointer = window.matchMedia("(pointer:fine)").matches;
  var reduce = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
  if(!finePointer || reduce) return;

  /* The shapes sit at different depths and follow the pointer by a
     fraction of the distance, which gives the page a quiet sense of
     space without ever moving with the content. */
  var shapes = [
    { el: field.querySelector(".ferin-shape--croissant"),  d: 26 },
    { el: field.querySelector(".ferin-shape--cake"),       d: 18 },
    { el: field.querySelector(".ferin-shape--bread"),      d: 32 },
    { el: field.querySelector(".ferin-shape--croissant2"), d: 14 },
    { el: field.querySelector(".ferin-shape--cup"),        d: 22 }
  ].filter(function(s){ return !!s.el; });

  var grid = field.querySelector(".ferin-grid");
  var frame = null, tx = 0, ty = 0;

  function apply(){
    frame = null;
    shapes.forEach(function(s){
      s.el.style.setProperty("--px", (tx * s.d).toFixed(2) + "px");
      s.el.style.setProperty("--py", (ty * s.d).toFixed(2) + "px");
    });
    if(grid) grid.style.backgroundPosition = (tx * 16).toFixed(1) + "px " + (ty * 16).toFixed(1) + "px";
  }

  window.addEventListener("pointermove", function(e){
    tx = e.clientX / window.innerWidth  - .5;
    ty = e.clientY / window.innerHeight - .5;
    if(!frame) frame = requestAnimationFrame(apply);
  }, { passive:true });
})();

/* ===== Original inline script 6 ===== */
(function(){
  function closeMobileMenu(){
    document.querySelectorAll('.mobile-menu[open]').forEach(function(menu){
      menu.removeAttribute('open');
    });
  }

  document.addEventListener('click', function(event){
    var menu = event.target.closest ? event.target.closest('.mobile-menu') : null;
    if (!menu) {
      closeMobileMenu();
    }
  }, true);

  document.addEventListener('touchstart', function(event){
    var menu = event.target.closest ? event.target.closest('.mobile-menu') : null;
    if (!menu) {
      closeMobileMenu();
    }
  }, {capture:true, passive:true});

  document.querySelectorAll('.mobile-menu-panel a').forEach(function(link){
    link.addEventListener('click', function(){
      var menu = link.closest('.mobile-menu');
      if (menu) menu.removeAttribute('open');
    });
  });
})();

/* ===== Original inline script 7 ===== */
(function(){
  "use strict";

  /* Everything below is additive and self-contained. */

  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];

  /* ---------- Ambient lights ---------- */
  function addAmbientLights(){
    if(document.querySelector(".ferin-premium-light")) return;
    const a=document.createElement("div");
    const b=document.createElement("div");
    a.className="ferin-premium-light one";
    b.className="ferin-premium-light two";
    a.setAttribute("aria-hidden","true");
    b.setAttribute("aria-hidden","true");
    document.body.append(a,b);

    let ticking=false;
    window.addEventListener("pointermove",e=>{
      if(ticking)return;
      ticking=true;
      requestAnimationFrame(()=>{
        const x=(e.clientX/window.innerWidth-.5)*28;
        const y=(e.clientY/window.innerHeight-.5)*28;
        a.style.transform=`translate3d(${x}px,${y}px,0)`;
        b.style.transform=`translate3d(${-x*.7}px,${-y*.7}px,0)`;
        ticking=false;
      });
    },{passive:true});
  }

  /* ---------- Hero badge ---------- */
  function addHeroBadge(){
    const heroContent=$(".hero-content");
    if(!heroContent || $(".ferin-premium-hero-badge",heroContent)) return;
    const badge=document.createElement("div");
    badge.className="ferin-premium-hero-badge";
    badge.innerHTML="<i></i><span>تجربه‌ای تازه در Cafe Ferin</span>";
    const first=heroContent.firstElementChild;
    if(first) heroContent.insertBefore(badge,first);
    else heroContent.appendChild(badge);
  }

  /* ---------- Product quick view ---------- */
  let modal=null;

  function createModal(){
    if(modal) return modal;
    modal=document.createElement("div");
    modal.id="ferinQuickView";
    modal.setAttribute("role","dialog");
    modal.setAttribute("aria-modal","true");
    modal.setAttribute("aria-label","نمایش سریع محصول");
    modal.innerHTML=`
      <div class="ferin-qv-wrap">
        <button class="ferin-qv-close" type="button" aria-label="بستن">×</button>
        <div class="ferin-qv-card">
          <div class="ferin-qv-image"><img alt=""></div>
          <div class="ferin-qv-info">
            <div class="ferin-qv-kicker">CAFE FERIN • MENU</div>
            <h3 class="ferin-qv-title"></h3>
            <p class="ferin-qv-desc"></p>
            <div class="ferin-qv-price"></div>
          </div>
        </div>
      </div>`;
    document.body.appendChild(modal);

    $(".ferin-qv-close",modal).addEventListener("click",closeModal);
    modal.addEventListener("click",e=>{if(e.target===modal)closeModal()});
    document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});
    return modal;
  }

  function openModal(card){
    const m=createModal();
    const img=$(".product-image img",card);
    const title=$(".product-name",card);
    const desc=$(".product-desc",card);
    const price=$(".product-price",card);
    const old=$(".p-old",card);

    const qimg=$(".ferin-qv-image img",m);
    qimg.src=img?.currentSrc || img?.src || "";
    qimg.alt=img?.alt || title?.textContent.trim() || "محصول";
    $(".ferin-qv-title",m).textContent=title?.textContent.trim() || "محصول";
    $(".ferin-qv-desc",m).textContent=desc?.textContent.trim() || "محصولی از Cafe Ferin";
    $(".ferin-qv-price",m).innerHTML=
      (old?.textContent.trim()?`<del style="opacity:.45;font-size:12px;margin-left:8px">${old.textContent.trim()}</del>`:"")+
      ` ${price?.textContent.trim() || ""}`;

    m.classList.add("is-open");
    document.body.style.overflow="";
    $(".ferin-qv-close",m).focus();
  }

  function closeModal(){
    if(!modal)return;
    modal.classList.remove("is-open");
    document.body.style.overflow="";
  }

  function enhanceProducts(){
    const cards=$$(".product-card");
    cards.forEach((card,i)=>{
      if(!$(".ferin-product-view",card)){
        const btn=document.createElement("button");
        btn.type="button";
        btn.className="ferin-product-view";
        btn.setAttribute("aria-label","مشاهده سریع محصول");
        btn.innerHTML="⌕";
        btn.addEventListener("click",e=>{
          e.preventDefault();
          e.stopPropagation();
          openModal(card);
        });
        card.appendChild(btn);
      }

      if(!$(".ferin-product-badge",card)){
        const badge=document.createElement("span");
        badge.className="ferin-product-badge";
        badge.textContent=(i%5===0)?"پیشنهاد ویژه":(i%3===0?"جدید":"محبوب");
        card.appendChild(badge);
      }
    });
  }

  /* Product cards are rendered dynamically by the original code,
     so observe the existing product grid without replacing its logic. */
  function watchProducts(){
    enhanceProducts();
    const grid=$(".product-grid");
    if(!grid)return;
    const observer=new MutationObserver(()=>enhanceProducts());
    observer.observe(grid,{childList:true,subtree:true});
  }

  /* ---------- Better mobile touch feedback ---------- */
  function touchFeedback(){
    document.addEventListener("pointerdown",e=>{
      const target=e.target.closest(".btn,.category,.theme-toggle,.order-nav");
      if(!target)return;
      target.style.setProperty("--ferin-touch-x",e.clientX+"px");
      target.style.setProperty("--ferin-touch-y",e.clientY+"px");
    },{passive:true});
  }

  /* ---------- PWA-style install prompt ---------- */
  let deferredInstall=null;
  function setupInstallPrompt(){
    window.addEventListener("beforeinstallprompt",e=>{
      e.preventDefault();
      deferredInstall=e;

      if(localStorage.getItem("ferin-install-dismissed")==="1")return;
      showInstallPrompt();
    });

    window.addEventListener("appinstalled",()=>{
      deferredInstall=null;
      const p=$("#ferinInstallPrompt");
      if(p)p.remove();
    });
  }

  function showInstallPrompt(){
    if($("#ferinInstallPrompt"))return;

    const p=document.createElement("div");
    p.id="ferinInstallPrompt";
    p.innerHTML=`
      <div class="ferin-install-icon">☕</div>
      <div class="ferin-install-copy">
        <strong>Cafe Ferin را به صفحه اصلی اضافه کن</strong>
        <span>دسترسی سریع‌تر، درست مثل یک اپلیکیشن</span>
      </div>
      <button class="ferin-install-btn" type="button">نصب</button>
      <button class="ferin-install-close" type="button" aria-label="بستن">×</button>`;
    document.body.appendChild(p);

    requestAnimationFrame(()=>p.classList.add("show"));

    $(".ferin-install-btn",p).addEventListener("click",async()=>{
      if(!deferredInstall)return;
      deferredInstall.prompt();
      try{await deferredInstall.userChoice}catch(_){}
      deferredInstall=null;
      p.remove();
    });

    $(".ferin-install-close",p).addEventListener("click",()=>{
      localStorage.setItem("ferin-install-dismissed","1");
      p.classList.remove("show");
      setTimeout(()=>p.remove(),450);
    });
  }

  /* ---------- Tiny parallax on hero ---------- */
  function heroParallax(){
    const hero=$(".hero");
    const content=$(".hero-content");
    if(!hero || !content || matchMedia("(prefers-reduced-motion: reduce)").matches)return;

    let busy=false;
    window.addEventListener("scroll",()=>{
      if(busy)return;
      busy=true;
      requestAnimationFrame(()=>{
        const rect=hero.getBoundingClientRect();
        const progress=Math.max(-.2,Math.min(.2,-rect.top/Math.max(1,hero.offsetHeight)));
        content.style.transform=`translate3d(0,${progress*28}px,0)`;
        busy=false;
      });
    },{passive:true});
  }

  function init(){
    addAmbientLights();
    addHeroBadge();
    watchProducts();
    touchFeedback();
    setupInstallPrompt();
    heroParallax();
  }

  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",init,{once:true});
  }else{
    init();
  }
})();

/* ===== Original inline script 8 ===== */
(function(){
  "use strict";
  const PASSWORD = "merteks.1405";
  function init(){
    const auth = document.getElementById("ferinAdminAuthOverlay");
    const input = document.getElementById("ferinAdminAuthPassword");
    const error = document.getElementById("ferinAdminAuthError");
    const openBtn = document.getElementById("ferinAdminOpen");
    const enterBtn = document.getElementById("ferinAdminAuthEnter");
    const cancelBtn = document.getElementById("ferinAdminAuthCancel");
    if(!auth || !input || !openBtn || !enterBtn || !cancelBtn) return;

    let unlocked = false;
    let internalOpen = false;

    function showLogin(){
      auth.classList.add("is-open");
      auth.setAttribute("aria-hidden","false");
      input.value="";
      error.textContent="";
      document.body.style.overflow="hidden";
      setTimeout(()=>input.focus(),50);
    }
    function hideLogin(){
      auth.classList.remove("is-open");
      auth.setAttribute("aria-hidden","true");
      error.textContent="";
      if(!document.getElementById("ferinAdminOverlay")?.classList.contains("is-open")){
        document.body.style.overflow="";
      }
    }
    function verify(){
      if(input.value === PASSWORD){
        unlocked = true;
        hideLogin();
        internalOpen = true;
        openBtn.click();
        internalOpen = false;
      }else{
        error.textContent="رمز عبور اشتباه است.";
        input.value="";
        input.focus();
      }
    }

    /* This runs in capture phase, so the original panel-opening handler cannot
       open the panel before authentication. */
    openBtn.addEventListener("click", function(e){
      if(internalOpen){
        unlocked = false;
        return;
      }
      if(!unlocked){
        e.preventDefault();
        e.stopImmediatePropagation();
        showLogin();
      }
    }, true);

    enterBtn.addEventListener("click", verify);
    cancelBtn.addEventListener("click", hideLogin);
    input.addEventListener("keydown", function(e){
      if(e.key === "Enter") verify();
      if(e.key === "Escape") hideLogin();
    });
    auth.addEventListener("click", function(e){
      if(e.target === auth) hideLogin();
    });
  }
  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();

/* ===== Original inline script 9 ===== */
(function(){
  function getOverlay(){ return document.getElementById('ferinAdminOverlay'); }
  function getPanel(){ return document.getElementById('ferinAdminPanel'); }
  function getOpenButton(){ return document.getElementById('ferinAdminOpen'); }
  function closeAdminPanel(){
    var overlay=getOverlay();
    if(!overlay || !overlay.classList.contains('is-open')) return;
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden','true');
    document.body.style.overflow='';
  }

  function outsidePanel(target){
    var panel=getPanel();
    var openButton=getOpenButton();
    if(!panel) return false;
    if(panel.contains(target)) return false;
    if(openButton && openButton.contains(target)) return false;
    return true;
  }

  document.addEventListener('pointerdown', function(e){
    var overlay=getOverlay();
    if(!overlay || !overlay.classList.contains('is-open')) return;
    if(outsidePanel(e.target)) closeAdminPanel();
  }, true);

  document.addEventListener('touchstart', function(e){
    var overlay=getOverlay();
    if(!overlay || !overlay.classList.contains('is-open')) return;
    if(outsidePanel(e.target)) closeAdminPanel();
  }, {capture:true, passive:true});
})();

/* ===== Cafe Ferin — shared products + recovery ===== */
(function(){
  "use strict";
  const SUPABASE_URL="https://lrwumtzqzhhcfdkiatkz.supabase.co";
  const SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxyd3VtdHpxemhoY2ZkaWF0ayIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzkxMzA2NjMxLCJleHAiOjIxMDY4ODI2MzF9.G8O4UDRWpYNf643KfzCytMO44g-XGGda52BA3odc1MI";
  /* Fallback to the exact key supplied for this project if the typo-safe constant above is rejected. */
  const API=SUPABASE_URL+"/rest/v1", BUCKET="product-images", KEY="ferin_admin_products_v1";
  const $=id=>document.getElementById(id);
  const overlay=$("ferinAdminOverlay"), nameEl=$("ferinAdminName"), categoryEl=$("ferinAdminCategory"), imageEl=$("ferinAdminImage");
  const priceEl=$("ferinAdminPrice"), oldPriceEl=$("ferinAdminOldPrice"), descEl=$("ferinAdminDesc"), statusEl=$("ferinAdminStatus");
  const preview=$("ferinAdminPreviewImg"), imageStatus=$("ferinAdminImageStatus"), saveBtn=$("ferinAdminSave"), searchEl=$("ferinAdminSearch");
  let editingId=null, selectedImage="";

  function readStore(){try{return JSON.parse(localStorage.getItem(KEY)||'{"edits":{},"adds":[],"removed":[]}')}catch(e){return {edits:{},adds:[],removed:[]}}}
  function writeStore(s){localStorage.setItem(KEY,JSON.stringify(s));}
  function uid(){return "ferin_"+Date.now().toString(36)+"_"+Math.random().toString(36).slice(2,8)}
  function headers(extra){return Object.assign({apikey:SUPABASE_ANON_KEY,Authorization:"Bearer "+SUPABASE_ANON_KEY},extra||{});}
  async function api(path,opt){opt=opt||{};const r=await fetch(API+path,Object.assign({},opt,{headers:headers(opt.headers||{})}));if(!r.ok){let m="Supabase "+r.status;try{const j=await r.json();m=j.message||j.error_description||j.hint||m;}catch(e){}
    /* If the "badge" column does not exist in the table yet, retry once without it so saving still works. */
    if(/badge/i.test(m)&&typeof opt.body==="string"&&!opt._retried){try{const b=JSON.parse(opt.body),strip=o=>{delete o.badge;return o;};const res=await api(path,Object.assign({},opt,{body:JSON.stringify(Array.isArray(b)?b.map(strip):strip(b)),_retried:true}));window.FERIN_BADGE_COLUMN_MISSING=true;setDbStatus(false,"ستون badge در جدول نیست؛ فایل supabase-setup.sql را اجرا کنید تا وضعیت محصول (پرفروش، جدید و...) هم ذخیره شود.");return res;}catch(e2){throw e2;}}
    throw Error(m)} const t=await r.text();return t?JSON.parse(t):null;}
  function compressImage(file){return new Promise((resolve,reject)=>{const reader=new FileReader();reader.onerror=reject;reader.onload=()=>{const img=new Image();img.onload=()=>{const max=1100,scale=Math.min(1,max/Math.max(img.width,img.height)),w=Math.max(1,Math.round(img.width*scale)),h=Math.max(1,Math.round(img.height*scale)),c=document.createElement("canvas");c.width=w;c.height=h;c.getContext("2d").drawImage(img,0,0,w,h);resolve(c.toDataURL("image/jpeg",.78));};img.onerror=reject;img.src=reader.result;};reader.readAsDataURL(file);});}
  function dataUrlToBlob(u){const [h,d]=u.split(","),m=(h.match(/data:([^;]+)/)||[])[1]||"image/jpeg",b=atob(d),a=new Uint8Array(b.length);for(let i=0;i<b.length;i++)a[i]=b.charCodeAt(i);return new Blob([a],{type:m});}
  async function uploadImage(data,id){if(!data||!data.startsWith("data:image/"))return data||"";const p="products/"+id+"-"+Date.now()+".jpg",r=await fetch(SUPABASE_URL+"/storage/v1/object/"+BUCKET+"/"+p,{method:"POST",headers:headers({"Content-Type":"image/jpeg","x-upsert":"true"}),body:dataUrlToBlob(data)});if(!r.ok)throw Error("آپلود عکس ناموفق بود");return SUPABASE_URL+"/storage/v1/object/public/"+BUCKET+"/"+p;}
  function ensureIds(){menuData.forEach((c,ci)=>c.products.forEach((p,pi)=>{if(!p._adminId)p._adminId="base_"+c.id+"_"+pi;}));}
  function applyStore(s){
    ensureIds(); s=s||{};
    Object.keys(s.edits||{}).forEach(k=>{if(s.edits[k]&&s.edits[k].categoryId==="sweet")s.edits[k].categoryId="cake"});
    (s.adds||[]).forEach(p=>{if(p&&p.categoryId==="sweet")p.categoryId="cake"});
    (s.removed||[]).forEach(id=>menuData.forEach(c=>c.products=c.products.filter(p=>p._adminId!==id)));
    Object.keys(s.edits||{}).forEach(id=>{const e=s.edits[id]||{};let f=null;for(const c of menuData){const i=c.products.findIndex(p=>p._adminId===id);if(i>=0){f={c,i,p:c.products[i]};break;}}if(!f)return;Object.assign(f.p,e);if(e.categoryId&&e.categoryId!==f.c.id){f.c.products.splice(f.i,1);const t=menuData.find(c=>c.id===e.categoryId);if(t)t.products.push(f.p);}});
    (s.adds||[]).forEach(p=>{if(!p||!p._adminId)return;if(!menuData.some(c=>c.products.some(x=>x._adminId===p._adminId))){const c=menuData.find(c=>c.id===p.categoryId);if(c)c.products.push(p);}});
  }
  /* Recover the exact 23 products and their original images from the uploaded browser export. */
  applyStore(window.FERIN_RECOVERED_STORE||null);
  /* Then apply anything currently in this browser. */
  const local=readStore();
  if((local.adds&&local.adds.length)||(local.edits&&Object.keys(local.edits).length)||(local.removed&&local.removed.length)) applyStore(local);
  renderCategories();renderProducts();

  function fillCategories(){categoryEl.innerHTML=menuData.map(c=>`<option value="${c.id}">${c.icon||"🍰"} ${c.name}</option>`).join("");}
  function allProducts(){return menuData.flatMap(c=>c.products.map(p=>({p,c})));}
  function escapeHtml(s){return String(s==null?"":s).replace(/[&<>'"]/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[ch]));}
  function renderList(){const q=(searchEl.value||"").trim().toLowerCase(),rows=allProducts().filter(x=>(x.p.name+" "+x.c.name).toLowerCase().includes(q));$("ferinAdminList").innerHTML=rows.length?rows.map(({p,c})=>`<div class="ferin-admin-item"><img class="ferin-admin-thumb" src="${escapeHtml(p.image||"")}" alt=""><div><div class="ferin-admin-item-name">${escapeHtml(p.name||"بدون نام")}</div><div class="ferin-admin-item-meta">${escapeHtml(c.name)}${p.price?" • "+escapeHtml(p.price)+" تومان":""}${p.badge&&p.badge!=="بدون وضعیت"?" • "+escapeHtml(p.badge):""}</div></div><button class="ferin-admin-edit" type="button" data-edit="${escapeHtml(p._adminId)}">ویرایش</button></div>`).join(""):"<div class='ferin-admin-empty'>محصولی پیدا نشد.</div>";}
  function resetForm(){editingId=null;selectedImage="";nameEl.value="";priceEl.value="";oldPriceEl.value="";descEl.value="";imageEl.value="";preview.src="";preview.classList.remove("show");imageStatus.textContent="برای محصول جدید، انتخاب عکس الزامی است.";saveBtn.textContent="➕ افزودن محصول";fillCategories();if(statusEl)statusEl.value="بدون وضعیت";}
  function editProduct(id){const f=allProducts().find(x=>x.p._adminId===id);if(!f)return;editingId=id;nameEl.value=f.p.name||"";priceEl.value=f.p.price||"";oldPriceEl.value=f.p.oldPrice||"";descEl.value=f.p.desc||"";categoryEl.value=f.c.id;selectedImage=f.p.image||"";if(statusEl)statusEl.value=f.p.badge||"بدون وضعیت";preview.src=selectedImage;preview.classList.toggle("show",!!selectedImage);imageStatus.textContent=selectedImage?"عکس فعلی محصول فعال است؛ در صورت نیاز عکس جدید انتخاب کنید.":"عکسی ثبت نشده است.";saveBtn.textContent="💾 ذخیره ویرایش";nameEl.focus();}
  imageEl.addEventListener("change",async e=>{const f=e.target.files&&e.target.files[0];if(!f)return;try{imageStatus.textContent="در حال آماده‌سازی عکس...";selectedImage=await compressImage(f);preview.src=selectedImage;preview.classList.add("show");imageStatus.textContent="عکس جدید انتخاب شد.";}catch(err){selectedImage="";imageStatus.textContent="خواندن عکس انجام نشد.";}});
  async function uuidFromString(str){const b=new Uint8Array(await crypto.subtle.digest("SHA-256",new TextEncoder().encode(str)));b[6]=(b[6]&15)|64;b[8]=(b[8]&63)|128;const h=Array.from(b.slice(0,16),x=>x.toString(16).padStart(2,"0"));return h.slice(0,4).join("")+"-"+h.slice(4,6).join("")+"-"+h.slice(6,8).join("")+"-"+h.slice(8,10).join("")+"-"+h.slice(10,16).join("");}
  async function rowFor(p,img){return {id:/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(p._adminId)?p._adminId:await uuidFromString(p._adminId),name:p.name||"محصول",price:p.price||"",old_price:p.oldPrice||"",category:p.categoryId,description:p.desc||"",badge:p.badge||"",image_url:img||p.image||null};}
  async function syncAllToSupabase(){const products=allProducts().map(x=>x.p);const rows=[];for(const p of products){let img=p.image||"";if(img.startsWith("data:image/"))img=await uploadImage(img,p._adminId);rows.push(await rowFor(p,img));}if(rows.length)await api("/products",{method:"POST",headers:{"Content-Type":"application/json","Prefer":"resolution=merge-duplicates,return=minimal"},body:JSON.stringify(rows)});return rows.length;}
  let pendingInitialSync=false;
  function setDbStatus(ok,msg){const el=$("ferinDbStatus");if(!el)return;el.textContent=(ok?"✅ ":"❌ ")+msg;el.className="ferin-db-status "+(ok?"ok":"bad");}
  /* Uploads the recovered/local products ONLY when the admin opens the panel (never for normal visitors). */
  async function runInitialSync(){
    if(!pendingInitialSync)return;pendingInitialSync=false;
    try{
      setDbStatus(true,"در حال ذخیرهٔ محصولات در پایگاه‌داده... (چند لحظه صبر کنید)");
      const count=await syncAllToSupabase();
      if(count){if(window.FERIN_BADGE_COLUMN_MISSING)setDbStatus(false,count+" محصول ذخیره شد، اما ستون badge در جدول نیست؛ فایل supabase-setup.sql را اجرا کنید تا وضعیت محصول (پرفروش، جدید و...) هم ذخیره شود.");else setDbStatus(true,"متصل — "+count+" محصول در پایگاه‌داده ذخیره شد.");renderCategories();renderProducts();renderList();alert(count+" محصول در پایگاه‌داده ذخیره شد و حالا برای همهٔ بازدیدکنندگان نمایش داده می‌شود.");}
    }catch(err){pendingInitialSync=true;console.error("Cafe Ferin Supabase sync:",err);setDbStatus(false,"ذخیرهٔ اولیه ناموفق بود: "+err.message);}
  }
  async function loadRemote(){
    try{
      const rows=await api("/products?select=*&order=created_at.asc");
      const list=rows||[];
      const valid=list.filter(r=>menuData.some(c=>c.id===r.category));
      if(valid.length){
        const by=new Map(menuData.map(c=>[c.id,c]));
        menuData.forEach(c=>c.products=[]);
        valid.forEach(r=>{by.get(r.category).products.push({_adminId:r.id,name:r.name||"",price:r.price||"",oldPrice:r.old_price||"",desc:r.description||"",image:r.image_url||"",rating:5,ratingCount:0,time:0,tag:"",badge:r.badge||""});});
        renderCategories();renderProducts();renderList();
        setDbStatus(true,"متصل به پایگاه‌داده — "+valid.length+" محصول بارگذاری شد.");
        return;
      }
      if(!list.length){pendingInitialSync=true;setDbStatus(true,"متصل است ولی جدول خالی است؛ محصولات فعلی هنگام باز کردن پنل ذخیره می‌شوند.");}
      else setDbStatus(false,"جدول محصولات داده دارد ولی ستون category هیچ‌کدام با دسته‌بندی‌های سایت یکی نیست.");
    }catch(err){console.error("Cafe Ferin Supabase:",err);setDbStatus(false,"اتصال به پایگاه‌داده برقرار نشد: "+err.message+" — سایت فعلاً از اطلاعات داخل خود فایل‌ها استفاده می‌کند.");}
  }
  saveBtn.addEventListener("click",async()=>{const name=nameEl.value.trim(),categoryId=categoryEl.value,price=priceEl.value.trim(),oldPrice=oldPriceEl.value.trim(),desc=descEl.value.trim(),badge=statusEl?statusEl.value:"بدون وضعیت";if(!name)return alert("لطفاً نام محصول را وارد کنید.");if(!categoryId)return alert("لطفاً دسته‌بندی محصول را انتخاب کنید.");if(!editingId&&!selectedImage)return alert("لطفاً عکس محصول را انتخاب کنید.");saveBtn.disabled=true;try{const f=editingId&&allProducts().find(x=>x.p._adminId===editingId);let id=editingId||uid(),img=selectedImage||(f&&f.p.image)||"";if(img.startsWith("data:image/"))img=await uploadImage(img,id);const row=await rowFor({_adminId:id,name,price,oldPrice,categoryId,desc,image:img},img);if(editingId)await api("/products?id=eq."+encodeURIComponent(row.id),{method:"PATCH",headers:{"Content-Type":"application/json","Prefer":"return=minimal"},body:JSON.stringify(row)});else await api("/products",{method:"POST",headers:{"Content-Type":"application/json","Prefer":"return=minimal"},body:JSON.stringify([row])});
      const s=readStore();s.adds=s.adds||[];s.edits=s.edits||{};if(editingId){if(!f)throw Error("محصول پیدا نشد");Object.assign(f.p,{name,price,oldPrice,desc,badge,image:img});if(f.c.id!==categoryId){f.c.products=f.c.products.filter(p=>p._adminId!==editingId);const t=menuData.find(c=>c.id===categoryId);if(t)t.products.push(f.p);}s.edits[editingId]={name,price,oldPrice,desc,badge,image:img,categoryId};}else{const p={_adminId:id,name,price,oldPrice,desc,image:img,rating:5,ratingCount:0,time:0,tag:"",badge,categoryId};const t=menuData.find(c=>c.id===categoryId);if(t)t.products.push(p);s.adds.push(p);}writeStore(s);renderCategories();renderProducts();renderList();resetForm();alert("محصول با موفقیت در سایت مشترک ذخیره شد.");}catch(err){console.error(err);alert("ذخیره انجام نشد: "+err.message);}finally{saveBtn.disabled=false;}}
  );
  $("ferinAdminList").addEventListener("click",e=>{const b=e.target.closest("[data-edit]");if(b)editProduct(b.dataset.edit);});searchEl.addEventListener("input",renderList);$("ferinAdminCancel").addEventListener("click",resetForm);
  $("ferinAdminOpen").addEventListener("click",()=>{fillCategories();renderList();overlay.scrollTop=0;overlay.classList.add("is-open");overlay.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";runInitialSync();});
  function close(){overlay.classList.remove("is-open");overlay.setAttribute("aria-hidden","true");document.body.style.overflow="";resetForm();}
  $("ferinAdminClose").addEventListener("click",close);overlay.addEventListener("click",e=>{if(e.target===overlay)close();});document.addEventListener("keydown",e=>{if(e.key==="Escape"&&overlay.classList.contains("is-open"))close();});
  resetForm();loadRemote();
})();

/* ===== Original inline script 11 ===== */
(function(){
  function ensureButton(){
    var toolbar=document.querySelector('#menu .menu-toolbar');
    if(!toolbar) return null;
    var btn=document.getElementById('ferinCategoryClose');
    if(!btn){
      btn=document.createElement('button');
      btn.type='button';
      btn.id='ferinCategoryClose';
      btn.className='ferin-category-close';
      btn.setAttribute('aria-label','بستن دسته بندی');
      btn.innerHTML='✕ ';
      toolbar.appendChild(btn);
      btn.addEventListener('click',function(){
        if(typeof activeCategory==='undefined') return;
        activeCategory='';
        if(typeof renderCategories==='function') renderCategories();
        if(typeof renderProducts==='function') renderProducts();
        btn.classList.remove('is-visible');
        var categories=document.getElementById('categories');
        if(categories) categories.scrollIntoView({behavior:'smooth',block:'start'});
      });
    }
    return btn;
  }
  function sync(){
    var btn=ensureButton();
    if(!btn) return;
    btn.classList.toggle('is-visible',typeof activeCategory!=='undefined' && !!activeCategory);
  }
  document.addEventListener('click',function(e){
    var category=e.target.closest ? e.target.closest('#categoryGrid .category') : null;
    if(category) setTimeout(sync,0);
  },true);
  document.addEventListener('DOMContentLoaded',sync);
  setTimeout(sync,50);
})();





/* ===== Bestseller flip carousel (shows products tagged "پرفروش") ===== */
(function(){
  "use strict";
  var INTERVAL = 4000;          /* ms between flips */
  var box = document.getElementById("bestsellerBox");
  if(!box) return;
  var stage = document.getElementById("fpStage");
  var dots = document.getElementById("fpDots");
  var count = document.getElementById("fpCount");
  var items = [], idx = 0, timer = null, paused = false;

  function esc(v){ return String(v==null?"":v).replace(/[&<>'"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c];}); }
  function collect(){
    var out = [];
    (typeof menuData!=="undefined"?menuData:[]).forEach(function(c){
      c.products.forEach(function(p){
        var st = String((p.badge||"")+" "+(p.tag||""));
        if(st.indexOf("پرفروش")!==-1) out.push({p:p,c:c});
      });
    });
    return out;
  }
  function cardHtml(it){
    var p = it.p;
    var img = p.image ? '<img src="'+esc(p.image)+'" alt="'+esc(p.name)+'">' : esc(it.c.icon||"🍰");
    return '<div class="fp-img">'+img+'</div>'+
      '<div class="fp-info"><h3 class="fp-name">'+esc(p.name)+'</h3>'+
      (p.desc?'<p class="fp-desc">'+esc(p.desc)+'</p>':'')+
      '<div>'+(p.oldPrice?'<span class="fp-old">'+esc(p.oldPrice)+'</span>':'')+
      '<span class="fp-price">'+esc(p.price||"")+' <em>تومان</em></span></div></div>';
  }
  function paintDots(){
    dots.innerHTML = items.map(function(_,i){return '<button type="button" class="fp-dot'+(i===idx?' on':'')+'" data-i="'+i+'" aria-label="محصول '+(i+1)+'"></button>';}).join("");
    count.textContent = items.length>1 ? (idx+1)+" / "+items.length : "";
  }
  function show(i, animate){
    var old = stage.querySelector(".fp-card:not(.fp-out)");
    idx = (i+items.length)%items.length;
    var card = document.createElement("div");
    card.className = "fp-card" + (animate?" fp-in":"");
    card.innerHTML = cardHtml(items[idx]);
    if(old && animate){
      old.classList.add("fp-out");
      setTimeout(function(){ if(old.parentNode) old.parentNode.removeChild(old); }, 850);
    } else if(old){ old.remove(); }
    stage.appendChild(card);
    paintDots();
  }
  function stop(){ if(timer){ clearInterval(timer); timer=null; } }
  function start(){
    stop();
    if(items.length<2) return;
    timer = setInterval(function(){ if(!paused && !document.hidden) show(idx+1,true); }, INTERVAL);
  }
  function build(){
    items = collect();
    stage.innerHTML = "";
    if(!items.length){ box.hidden = true; stop(); return; }
    box.hidden = false;
    idx = Math.min(idx, items.length-1);
    show(idx,false);
    start();
  }
  dots.addEventListener("click", function(e){
    var b = e.target.closest(".fp-dot"); if(!b) return;
    show(+b.dataset.i,true); start();
  });
  box.addEventListener("mouseenter", function(){ paused=true; });
  box.addEventListener("mouseleave", function(){ paused=false; });
  box.addEventListener("touchstart", function(){ paused=true; }, {passive:true});
  box.addEventListener("touchend", function(){ setTimeout(function(){paused=false;},2500); }, {passive:true});

  /* Re-build whenever the menu is re-rendered (e.g. after admin edits). */
  var orig = window.renderProducts;
  if(typeof orig==="function"){
    window.renderProducts = function(){ var r = orig.apply(this, arguments); build(); return r; };
  }
  build();
})();
