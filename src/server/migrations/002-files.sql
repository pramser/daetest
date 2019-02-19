-- Up
create schema testmon;

create table testmon.file (
  id uuid primary key not null default gen_random_uuid(),
  path text not null default '',
  filename text not null,
  mimetype text not null default '',
  encoding text not null default '',

  product text not null default '',
  meta text not null default '',
  filestatus int not null default 0,
  resulttype int not null default 0,
  createdat timestamp with time zone not null default now()
);

-- Down
drop table testmon.file;
drop schema testmon;