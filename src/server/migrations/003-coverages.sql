-- Up
create table testmon.coverage (
  id uuid primary key not null default gen_random_uuid(),

  name text not null,
  description text not null default '',

  file_type int not null default 0,
  coverage_type int not null default 0,

  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

-- Down
drop table testmon.coverage;