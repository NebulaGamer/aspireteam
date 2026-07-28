-- ============ roles ============
create type public.app_role as enum ('admin');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

comment on table public.user_roles is
  'Role grants. DELIBERATE: there are no INSERT/UPDATE/DELETE RLS policies. Roles may only be granted by trusted server-side code using the service_role key. Do not "fix" this by adding a write policy — doing so creates a privilege-escalation hole.';

grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;

alter table public.user_roles enable row level security;

create policy "Users can read their own roles"
  on public.user_roles for select
  to authenticated
  using (auth.uid() = user_id);

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  )
$$;

-- ============ regattas ============
create table public.regattas (
  id uuid primary key default gen_random_uuid(),
  name_pl text not null,
  name_en text not null,
  venue text not null,
  city text,
  country_code text not null,
  boat_class text not null,
  series text,
  start_date date not null,
  end_date date not null,
  status text not null default 'scheduled',
  participation text not null default 'unconfirmed',
  result_position integer,
  event_url text,
  notes_pl text,
  notes_en text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint regattas_boat_class_check check (boat_class in ('five_five','cape31')),
  constraint regattas_status_check check (status in ('scheduled','cancelled','completed')),
  constraint regattas_participation_check check (participation in ('confirmed','planned','unconfirmed','not_racing')),
  constraint regattas_date_order_check check (end_date >= start_date)
);

create index regattas_start_date_idx on public.regattas (start_date);

grant select on public.regattas to anon;
grant select, insert, update, delete on public.regattas to authenticated;
grant all on public.regattas to service_role;

alter table public.regattas enable row level security;

create policy "Regattas are publicly readable"
  on public.regattas for select
  to anon, authenticated
  using (true);

create policy "Admins can insert regattas"
  on public.regattas for insert
  to authenticated
  with check (public.has_role(auth.uid(), 'admin'));

create policy "Admins can update regattas"
  on public.regattas for update
  to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

create policy "Admins can delete regattas"
  on public.regattas for delete
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger regattas_set_updated_at
before update on public.regattas
for each row execute function public.set_updated_at();

-- ============ seed (idempotent on name_en + start_date) ============
create unique index regattas_seed_key_idx on public.regattas (name_en, start_date);

insert into public.regattas
  (name_en, name_pl, venue, city, country_code, boat_class, series, start_date, end_date, status, participation, result_position, notes_pl, notes_en)
values
  ('Alpen Cup (5-Nations Cup 1)','Alpen Cup (5-Nations Cup 1)','Fraglia Vela Riva, Lake Garda','Riva del Garda','ITA','five_five','5-Nations Cup','2026-04-23','2026-04-25','completed','unconfirmed',null,null,null),
  ('North American Championship (5-Nations Cup 2)','Mistrzostwa Ameryki Północnej (5-Nations Cup 2)','Texas Corinthian YC, Galveston Bay','Galveston','USA','five_five','5-Nations Cup','2026-04-23','2026-04-26','completed','unconfirmed',null,null,null),
  ('Nordic 5.5m Family & Friends','Nordic 5.5m Family & Friends','Flensburger Segel-Club, Glücksburg','Glücksburg','GER','five_five',null,'2026-06-05','2026-06-07','completed','unconfirmed',null,null,null),
  ('Swiss Open','Otwarte Mistrzostwa Szwajcarii','Rolle, Lake Geneva','Rolle','SUI','five_five',null,'2026-06-11','2026-06-14','cancelled','unconfirmed',null,null,null),
  ('British Open','Otwarte Mistrzostwa Wielkiej Brytanii','Royal Yacht Squadron, Cowes','Cowes','GBR','five_five',null,'2026-06-29','2026-07-03','cancelled','unconfirmed',null,null,null),
  ('German Open (5-Nations Cup 4)','Otwarte Mistrzostwa Niemiec (5-Nations Cup 4)','Seebrucker Regatta-Verein, Chiemsee','Seebruck','GER','five_five','5-Nations Cup','2026-08-27','2026-08-30','scheduled','unconfirmed',null,null,null),
  ('Multi-Nations (5-Nations Cup 5)','Multi-Nations (5-Nations Cup 5)','Fraglia Vela Malcesine, Lake Garda','Malcesine','ITA','five_five','5-Nations Cup','2026-09-10','2026-09-13','scheduled','unconfirmed',null,null,null),
  ('Scandinavian Gold Cup','Scandinavian Gold Cup','Yacht Club of Greece, Lavrion','Lavrion','GRE','five_five',null,'2026-10-01','2026-10-04','scheduled','unconfirmed',null,null,null),
  ('World Championship','Mistrzostwa Świata','Yacht Club of Greece, Lavrion','Lavrion','GRE','five_five',null,'2026-10-05','2026-10-09','scheduled','unconfirmed',null,null,null),
  ('World Championship & Scandinavian Gold Cup','Mistrzostwa Świata i Scandinavian Gold Cup','Flensburg','Flensburg','GER','five_five',null,'2027-09-03','2027-09-11','scheduled','unconfirmed',null,'Gold Cup 3–5 września, wyścigi mistrzostw świata 7–11 września.','Gold Cup 3–5 Sep, World Championship racing 7–11 Sep.'),
  ('World Championship & Scandinavian Gold Cup','Mistrzostwa Świata i Scandinavian Gold Cup','Cannes','Cannes','FRA','five_five',null,'2028-09-01','2028-09-07','scheduled','unconfirmed',null,'Terminy do potwierdzenia.','Dates to be confirmed.'),
  ('Round 1 — Porto Cervo','Runda 1 — Porto Cervo','Porto Cervo, Sardinia','Porto Cervo','ITA','cape31','MED Circuit','2026-04-24','2026-04-26','completed','not_racing',null,null,null),
  ('Round 2 — Puntaldia','Runda 2 — Puntaldia','Puntaldia, Sardinia','Puntaldia','ITA','cape31','MED Circuit','2026-05-15','2026-05-17','completed','not_racing',null,null,null),
  ('Round 3 — Bonifacio','Runda 3 — Bonifacio','Bonifacio, Corsica','Bonifacio','FRA','cape31','MED Circuit','2026-06-04','2026-06-06','completed','confirmed',14,null,null),
  ('Round 4 — Scarlino','Runda 4 — Scarlino','Scarlino, Tuscany','Scarlino','ITA','cape31','MED Circuit','2026-07-10','2026-07-12','completed','unconfirmed',null,null,null),
  ('Round 5 — Hyères','Runda 5 — Hyères','Hyères, Provence','Hyères','FRA','cape31','MED Circuit','2026-09-24','2026-09-26','scheduled','unconfirmed',null,null,null),
  ('Cape 31 Gold Cup','Cape 31 Gold Cup','Saint-Tropez','Saint-Tropez','FRA','cape31','Gold Cup','2026-10-12','2026-10-17','scheduled','unconfirmed',null,null,null)
on conflict (name_en, start_date) do nothing;