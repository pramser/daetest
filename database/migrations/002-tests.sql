-- Up
create table denouer.tests (
  id serial primary key,,
  run_id text not null default '',
  name text not null,
  info text not null default '',
  description text not null default '',
  result int not null default 0
);

-- Down
drop table denouer.tests;