-- Up
create table testmon.file (
  id uuid primary key not null default gen_random_uuid(),

  filename text not null,
  mimetype text not null default '',
  encoding text not null default '',
  path text not null default ''
);

-- Down
drop table testmon.file;