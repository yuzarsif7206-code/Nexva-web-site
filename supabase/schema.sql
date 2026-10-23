-- Nexva Dijital: teklif talepleri tablosu
-- Supabase > SQL Editor > New query > bu dosyanın tamamını yapıştırıp "Run".

create table if not exists public.leads (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  tur          text not null,                 -- paket | proje | ozel
  payload      jsonb not null,
  ip_hash      text,
  notified     boolean not null default false,
  notified_at  timestamptz,
  attempts     int not null default 0
);

-- Politika YOK: tabloya yalnızca sunucudaki service_role anahtarı erişir.
alter table public.leads enable row level security;

create index if not exists leads_ip_created_idx on public.leads (ip_hash, created_at desc);
create index if not exists leads_pending_idx on public.leads (created_at) where notified = false;
