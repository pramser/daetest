-- Up
create table testmon.result (
  id uuid primary key not null default gen_random_uuid(),
  runid text not null default '',
  name text not null,
  description text not null default '',
  assignee text not null default '',
  resultstatus int not null default 0
);

-- Down
drop table testmon.result;