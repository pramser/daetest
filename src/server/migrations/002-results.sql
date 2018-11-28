-- Up
create schema testmon;

create table testmon.result (
  id uuid primary key not null default gen_random_uuid(),

  name text not null,
  description text not null default '',

  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

-- Down
drop table testmon.result;
drop schema testmon;