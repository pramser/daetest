-- Up
create table testmon.testcase (
  id uuid primary key not null default gen_random_uuid(),
  runid text not null default '',
  name text not null,
  info text not null default '',
  description text not null default '',
  result int not null default 0
);

-- Down
drop table testmon.testcase;