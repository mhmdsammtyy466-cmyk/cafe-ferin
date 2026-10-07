-- Cafe Ferin — Supabase setup (run once in: Supabase Dashboard > SQL Editor > New query > Run)
-- Safe to run more than once.

-- 1) Products table
create table if not exists public.products (
  id          uuid primary key,
  name        text,
  price       text,
  old_price   text,
  category    text,
  description text,
  image_url   text,
  badge       text default '',
  created_at  timestamptz default now()
);
-- If the table already existed without the badge column:
alter table public.products add column if not exists badge text default '';

-- 2) Row Level Security: everyone can read, the site (anon key) can add/edit
alter table public.products enable row level security;
drop policy if exists "ferin read"   on public.products;
drop policy if exists "ferin insert" on public.products;
drop policy if exists "ferin update" on public.products;
create policy "ferin read"   on public.products for select to anon using (true);
create policy "ferin insert" on public.products for insert to anon with check (true);
create policy "ferin update" on public.products for update to anon using (true) with check (true);

-- 3) Public storage bucket for product images
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do update set public = true;

drop policy if exists "ferin img read"   on storage.objects;
drop policy if exists "ferin img insert" on storage.objects;
drop policy if exists "ferin img update" on storage.objects;
create policy "ferin img read"   on storage.objects for select to anon using (bucket_id = 'product-images');
create policy "ferin img insert" on storage.objects for insert to anon with check (bucket_id = 'product-images');
create policy "ferin img update" on storage.objects for update to anon using (bucket_id = 'product-images') with check (bucket_id = 'product-images');
