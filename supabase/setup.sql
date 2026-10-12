-- Cafe Ferin — راه‌اندازی Supabase (نسخهٔ امن)
-- Supabase Dashboard > SQL Editor > New query > Run   (چند بار اجرا کردن مشکلی ندارد)
--
-- ⚠️ قبل از اجرا: عبارت YOUR_ADMIN_EMAIL (فقط یک جا، در بخش ۲) را با ایمیل ادمین عوض کنید.
--    همین ایمیل را در Authentication > Users بسازید.

-- 1) جدول محصولات
create table if not exists public.products (
  id            uuid primary key default gen_random_uuid(),
  name          text,
  category      text,
  description   text default '',
  image_url     text,
  badge         text default '',
  price_num     integer,          -- قیمت به تومان (عدد)
  old_price_num integer,          -- قیمت قبلی (اختیاری)
  unit          text default '',  -- '' = هر عدد، 'کیلو' = هر کیلو
  price         text,             -- ستون قدیمی (فقط برای ردیف‌های قدیمی)
  old_price     text,             -- ستون قدیمی
  created_at    timestamptz default now()
);
alter table public.products alter column id set default gen_random_uuid();
alter table public.products add column if not exists description   text default '';
alter table public.products add column if not exists badge         text default '';
alter table public.products add column if not exists price_num     integer;
alter table public.products add column if not exists old_price_num integer;
alter table public.products add column if not exists unit          text default '';
alter table public.products add column if not exists price         text;
alter table public.products add column if not exists old_price     text;

-- تبدیل خودکار قیمت‌های متنی قدیمی («کیلویی 1/400/000»، «۵۵,۰۰۰») به عدد
update public.products
set price_num = nullif(regexp_replace(translate(price, '۰۱۲۳۴۵۶۷۸۹٠١٢٣٤٥٦٧٨٩', '01234567890123456789'), '\D', '', 'g'), '')::integer,
    unit      = case when price like '%کیلو%' then 'کیلو' else coalesce(unit, '') end
where price_num is null and coalesce(price, '') <> '';

update public.products
set old_price_num = nullif(regexp_replace(translate(old_price, '۰۱۲۳۴۵۶۷۸۹٠١٢٣٤٥٦٧٨٩', '01234567890123456789'), '\D', '', 'g'), '')::integer
where old_price_num is null and coalesce(old_price, '') <> '';

-- 2) فقط ادمین می‌تواند تغییر بدهد
create or replace function public.is_ferin_admin() returns boolean
language sql stable as $$
  select coalesce(auth.jwt() ->> 'email', '') = 'mhmdsammtyy466@gmail.com'
$$;

alter table public.products enable row level security;

-- policyهای قدیمی که به همه اجازهٔ نوشتن می‌دادند حذف می‌شوند
drop policy if exists "ferin read"         on public.products;
drop policy if exists "ferin insert"       on public.products;
drop policy if exists "ferin update"       on public.products;
drop policy if exists "ferin admin write"  on public.products;

create policy "ferin read" on public.products
  for select to anon, authenticated using (true);
create policy "ferin admin write" on public.products
  for all to authenticated using (public.is_ferin_admin()) with check (public.is_ferin_admin());

-- 3) پوشهٔ عکس‌ها (خواندن عمومی، آپلود فقط ادمین)
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do update set public = true;

drop policy if exists "ferin img read"        on storage.objects;
drop policy if exists "ferin img insert"      on storage.objects;
drop policy if exists "ferin img update"      on storage.objects;
drop policy if exists "ferin img admin write" on storage.objects;

create policy "ferin img read" on storage.objects
  for select to anon, authenticated using (bucket_id = 'product-images');
create policy "ferin img admin write" on storage.objects
  for all to authenticated
  using (bucket_id = 'product-images' and public.is_ferin_admin())
  with check (bucket_id = 'product-images' and public.is_ferin_admin());
