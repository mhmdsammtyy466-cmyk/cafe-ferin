/* Cafe Ferin — admin page (/admin/)
   Reading products is public; adding / editing / deleting needs the admin login
   (Supabase Auth) and is enforced by the database rules in supabase/setup.sql. */
(() => {
  "use strict";
  const F = window.Ferin;
  const { esc, safeUrl, fmtPrice, toNum, CATEGORIES, api, SUPABASE_URL, SUPABASE_KEY } = F;
  const byId = id => document.getElementById(id);
  const BUCKET = "product-images";
  const SESSION_KEY = "ferin_admin_session";
  const SITE = "../";

  /* Product images are stored as "assets/..." (relative to the site root). */
  const imgSrc = u => (/^assets\//.test(u || "") ? SITE + safeUrl(u) : safeUrl(u));
  const catName = id => (CATEGORIES.find(c => c.id === id) || {}).name || "";
  const touched = res => Array.isArray(res) && res.length > 0;   // blocked PATCH/DELETE return []

  /* ============ login session ============ */
  const getSession = () => { try { return JSON.parse(sessionStorage.getItem(SESSION_KEY)); } catch (e) { return null; } };
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
    let r;
    try {
      r = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=${grant}`, {
        method: "POST",
        headers: { apikey: SUPABASE_KEY, "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    } catch (e) { throw new Error("NETWORK"); }
    if (!r.ok) {
      let j = {};
      try { j = await r.json(); } catch (e) { /* no body */ }
      const err = new Error("AUTH");
      err.status = r.status;
      err.code = j.error_code || j.error || "";
      err.detail = j.msg || j.error_description || j.message || "";
      throw err;
    }
    return r.json();
  }
  /* Explain why a login failed, in plain Persian. */
  function loginMessage(err) {
    const tag = err.message === "NETWORK" ? "" : ` [${err.status || "?"} ${err.code || "-"}]`;
    return loginText(err) + tag;
  }
  function loginText(err) {
    if (err.message === "NETWORK") return "اتصال به Supabase برقرار نشد؛ اینترنت یا فیلترشکن را بررسی کنید.";
    const text = (err.code + " " + err.detail).toLowerCase();
    if (/email_not_confirmed|not confirmed/.test(text)) return "ایمیل این کاربر تأیید نشده است. در Supabase کاربر را با گزینهٔ Auto Confirm User بسازید.";
    if (/rate|too many|429/.test(text) || err.status === 429) return "تلاش‌های زیاد؛ چند دقیقه صبر کنید و دوباره امتحان کنید.";
    if (/api key|apikey|invalid_api_key|no_authorization/.test(text) || err.status === 401) return "کلید Supabase در js/supabase.js معتبر نیست.";
    if (/invalid_credentials|invalid login|invalid_grant/.test(text) || err.status === 400) return "ایمیل یا رمز عبور اشتباه است، یا این کاربر هنوز در Supabase ساخته نشده (Authentication ← Users ← Add user).";
    return "ورود انجام نشد: " + (err.detail || err.code || err.status || "خطای ناشناخته");
  }
  const login = async (email, password) => setSession(await authRequest("password", { email, password }));
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
  F.adminToken = adminToken;
  F.clearSession = () => setSession(null);

  /* ============ elements + state ============ */
  const A = {
    overlay: byId("ferinAdminOverlay"),
    auth: byId("ferinAdminAuthOverlay"), authForm: byId("ferinAdminAuthBox"),
    email: byId("ferinAdminAuthEmail"), pass: byId("ferinAdminAuthPassword"), authError: byId("ferinAdminAuthError"),
    name: byId("ferinAdminName"), category: byId("ferinAdminCategory"), status: byId("ferinAdminStatus"),
    unit: byId("ferinAdminUnit"), image: byId("ferinAdminImage"), preview: byId("ferinAdminPreviewImg"),
    imageStatus: byId("ferinAdminImageStatus"), price: byId("ferinAdminPrice"), oldPrice: byId("ferinAdminOldPrice"),
    desc: byId("ferinAdminDesc"), save: byId("ferinAdminSave"), search: byId("ferinAdminSearch"),
    list: byId("ferinAdminList"), msg: byId("ferinDbStatus")
  };
  let products = [];
  let editingId = null;
  let pickedImage = null;     // Blob of a newly chosen photo
  let currentImage = "";      // photo already stored for the product being edited

  const isOpen = el => el.classList.contains("is-open");
  function setOverlay(el, on) {
    el.classList.toggle("is-open", on);
    el.setAttribute("aria-hidden", String(!on));
    document.body.style.overflow = isOpen(A.overlay) || isOpen(A.auth) ? "hidden" : "";
  }
  function say(text, ok) {
    A.msg.textContent = text ? (ok ? "✅ " : "❌ ") + text : "";
    A.msg.className = "ferin-db-status" + (text ? (ok ? " ok" : " bad") : "");
  }

  /* ============ screens ============ */
  function showLogin(message) {
    setOverlay(A.overlay, false);
    A.authError.textContent = message || "";
    A.pass.value = "";
    setOverlay(A.auth, true);
    setTimeout(() => (A.email.value ? A.pass : A.email).focus(), 50);
  }
  function showPanel() {
    setOverlay(A.auth, false);
    A.category.innerHTML = CATEGORIES.map(c => `<option value="${c.id}">${c.icon} ${esc(c.name)}</option>`).join("");
    resetForm();
    renderList();
    A.overlay.scrollTop = 0;
    setOverlay(A.overlay, true);
  }
  const sessionExpired = () => showLogin("نشست شما تمام شده است؛ دوباره وارد شوید.");

  A.authForm.addEventListener("submit", async e => {
    e.preventDefault();
    A.authError.textContent = "";
    try {
      await login(A.email.value.trim(), A.pass.value);
      A.pass.value = "";
      showPanel();
    } catch (err) {
      console.warn("Cafe Ferin login failed:", err.status, err.code, err.detail || err.message);
      A.authError.textContent = loginMessage(err);
      A.pass.value = "";
      A.pass.focus();
    }
  });
  byId("ferinAdminAuthCancel").addEventListener("click", () => { location.href = SITE; });
  byId("ferinAdminClose").addEventListener("click", () => { location.href = SITE; });
  byId("ferinAdminLogout").addEventListener("click", () => { setSession(null); showLogin(); });

  /* ============ photo: shrink in the browser, upload to the public bucket ============ */
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

  /* ============ form ============ */
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
    if (p.image) { A.preview.src = imgSrc(p.image); A.preview.classList.add("show"); }
    A.imageStatus.textContent = p.image ? "عکس فعلی محصول فعال است؛ در صورت نیاز عکس جدید انتخاب کنید." : "عکسی ثبت نشده است.";
    A.save.textContent = "💾 ذخیره ویرایش";
    A.name.focus();
  }

  function renderList() {
    const q = (A.search.value || "").trim().toLowerCase();
    const rows = products.filter(p => (p.name + " " + catName(p.category)).toLowerCase().includes(q));
    A.list.innerHTML = rows.length ? rows.map(p => `
      <div class="ferin-admin-item">
        ${imgSrc(p.image) ? `<img class="ferin-admin-thumb" src="${imgSrc(p.image)}" alt="">` : '<span class="ferin-admin-thumb"></span>'}
        <div><div class="ferin-admin-item-name">${esc(p.name || "بدون نام")}</div>
        <div class="ferin-admin-item-meta">${esc(catName(p.category))}${p.price ? " • " + fmtPrice(p.price) + " تومان" : (p.priceText ? " • " + esc(p.priceText) : "")}${p.badge ? " • " + esc(p.badge) : ""}</div></div>
        <div class="ferin-admin-item-actions">
          <button class="ferin-admin-edit" type="button" data-edit="${esc(p.id)}">ویرایش</button>
          <button class="ferin-admin-delete" type="button" data-delete="${esc(p.id)}">حذف</button>
        </div>
      </div>`).join("") : '<div class="ferin-admin-empty">محصولی پیدا نشد.</div>';
  }
  A.search.addEventListener("input", renderList);
  byId("ferinAdminCancel").addEventListener("click", resetForm);
  A.list.addEventListener("click", e => {
    const edit = e.target.closest("[data-edit]");
    if (edit) return editProduct(edit.dataset.edit);
    const del = e.target.closest("[data-delete]");
    if (del) deleteProduct(del.dataset.delete);
  });

  async function reload() {
    try { products = await F.fetchProducts(); }
    catch (e) { say("خواندن محصولات انجام نشد: " + e.message, false); }
    renderList();
  }

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
      await reload();
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
      await reload();
      say("محصول حذف شد.", true);
    } catch (err) {
      if (err.message === "AUTH") return sessionExpired();
      say("حذف انجام نشد: " + err.message, false);
    }
  }

  /* ============ start ============ */
  (async () => {
    if (getSession()) showPanel(); else showLogin();
    await reload();
  })();
})();
