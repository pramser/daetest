-- Up
create schema testmon;

create table testmon.file (
  id uuid primary key not null default gen_random_uuid(),

  file_name text not null,
  mime_type text not null default '',
  encoding text not null default '',

  product text not null default '',
  meta text not null default '',

  file_status int not null default 0,
  result_type int not null default 0,

  created_at timestamp with time zone not null default now(),
);

-- Down
drop table testmon.file;
drop schema testmon;