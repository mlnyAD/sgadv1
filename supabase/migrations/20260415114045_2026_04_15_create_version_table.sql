
create table if not exists public.client (
  clt_id uuid primary key default gen_random_uuid(),

  clt_nom text not null,
  clt_code text not null,

  clt_adresse text,
  clt_code_postal text,
  clt_ville text,
  clt_pays text,

  clt_email text,
  clt_telephone text,

  clt_actif boolean not null default true,

  created_at timestamptz not null default now()
);
create table if not exists public.app_db_release (
  dbr_id uuid primary key default gen_random_uuid(),
  dbr_name text not null,
  dbr_version text not null,
  dbr_date date not null,
  dbr_comment text not null,
  dbr_current boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists idx_app_db_release_current
on public.app_db_release (dbr_current);

insert into public.app_db_release (
  dbr_name,
  dbr_version,
  dbr_date,
  dbr_comment,
  dbr_current
)
values (
  'sgad-prod',
  '1.0.0',
  current_date,
  'Initialisation du suivi de version base de données',
  true
)
on conflict do nothing;