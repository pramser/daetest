-- Up
create schema denouer;

create table denouer.runs (
  id serial primary key,,
  file_path text not null default '',
  file_name text not null,
  mime_type text not null default '',
  encoding text not null default '',

  product text not null default '',
  meta text not null default '',
  status int not null default 0,
  type int not null default 0,
  created_at timestamp with time zone not null default now()
);

-- Down
drop table denouer.runs;
drop schema denouer;