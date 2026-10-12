/* Cafe Ferin — code shared by the public site and the admin page */
(() => {
  "use strict";

  const cfg = window.SUPABASE_CONFIG || {};
  const SUPABASE_URL = cfg.url || "";
  const SUPABASE_KEY = cfg.anonKey || "";

  const ESC = { "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" };
  const esc = v => String(v ?? "").replace(/[&<>'"]/g, c => ESC[c]);
  /* Only our own images or https images may be used as <img src>. */
  const safeUrl = u => (/^(https:\/\/|assets\/|\.\.\/assets\/)/.test(u || "") ? esc(u) : "");
  const faNum = n => Number(n).toLocaleString("fa-IR");
  const fmtPrice = n => (n ? faNum(n) : "");
  const toNum = v => parseInt(
    String(v ?? "")
      .replace(/[۰-۹]/g, d => "۰۱۲۳۴۵۶۷۸۹".indexOf(d))
      .replace(/[٠-٩]/g, d => "٠١٢٣٤٥٦٧٨٩".indexOf(d))
      .replace(/\D/g, ""), 10) || 0;

  const CATEGORIES = [
    { id: "fantasy", name: "نان فانتزی", icon: "🥖", image: "assets/images/cat-fantasy-v3.webp" },
    { id: "cake", name: "کیک و شیرینی", icon: "🎂", image: "assets/images/cat-cake-v3.webp" },
    { id: "dessert", name: "دسر", icon: "🍮", image: "assets/images/cat-dessert-v3.webp" },
    { id: "cookie", name: "کوکی", icon: "🍪", image: "assets/images/cat-cookie-v3.webp" },
    { id: "diet", name: "محصولات رژیمی", icon: "🌿", image: "assets/images/cat-diet-v2.webp" }
  ];

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

  /* Supabase REST call. With admin:true the admin page supplies the login token. */
  async function api(path, { method = "GET", body, admin = false, headers = {} } = {}) {
    const token = admin ? await window.Ferin.adminToken() : SUPABASE_KEY;
    const res = await fetch(SUPABASE_URL + path, {
      method,
      headers: Object.assign({
        apikey: SUPABASE_KEY,
        Authorization: "Bearer " + token
      }, body ? { "Content-Type": "application/json" } : {}, headers),
      body: body ? JSON.stringify(body) : undefined
    });
    if (!res.ok) {
      if (admin && (res.status === 401 || res.status === 403)) { window.Ferin.clearSession(); throw new Error("AUTH"); }
      let msg = "خطای سرور (" + res.status + ")";
      try { const j = await res.json(); msg = j.message || j.hint || msg; } catch (e) { /* keep default */ }
      throw new Error(msg);
    }
    const text = await res.text();
    return text ? JSON.parse(text) : null;
  }

  const fetchProducts = async () =>
    (await api("/rest/v1/products?select=*&order=created_at.asc") || []).map(normalise);

  window.Ferin = { SUPABASE_URL, SUPABASE_KEY, esc, safeUrl, faNum, fmtPrice, toNum, CATEGORIES, normalise, api, fetchProducts };
})();
