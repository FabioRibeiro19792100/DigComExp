create table if not exists public.plan_states (
  plan_slug text primary key,
  schedule jsonb not null,
  current_week integer not null default 1,
  updated_at timestamptz not null default now()
);

alter table public.plan_states enable row level security;

create policy "Allow anon read plan states"
on public.plan_states
for select
to anon
using (true);

create policy "Allow anon write plan states"
on public.plan_states
for insert
to anon
with check (true);

create policy "Allow anon update plan states"
on public.plan_states
for update
to anon
using (true)
with check (true);
