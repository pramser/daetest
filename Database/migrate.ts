import crypto from 'crypto';
import eol from 'eol';
import fs from 'fs';
import path from 'path';
import { Client } from 'pg';
import { promisify } from 'util';

export default async function migrate({
  client,
  table = 'migrations',
  migrationsPath,
  development = process.env.NODE_ENV === 'development'
}: {
  client: Client;
  table?: string;
  migrationsPath: string;
  development?: boolean;
}) {
  const _migrationsPath = path.resolve(migrationsPath);

  const migrations = await promisify(fs.readdir)(_migrationsPath).then(files =>
    files
      .map(x => x.match(/^(\d+).(.*?)\.sql$/))
      .filter(x => x !== null)
      .map(x => ({
        id: Number(x![1]),
        name: x![2],
        filename: x![0],
        up: '',
        down: '',
        hash: ''
      }))
      .sort((a, b) => Math.sign(a.id - b.id))
  );

  if (!migrations.length) {
    throw new Error(`No migration files found in '${_migrationsPath}'.`);
  }

  console.info(`found ${migrations.length} migrations`);

  migrations.forEach((migration, index) => {
    if (migration.id !== index + 1) {
      throw new Error(
        `Migration ${migration.id} was expected to be ${index + 1}.`
      );
    }
  });

  await Promise.all(
    migrations.map(async migration => {
      const filename = path.join(_migrationsPath, migration.filename);
      const data = await promisify(fs.readFile)(filename, 'utf-8');

      const [up, down] = data.split(/^--\s+?down/im);
      if (!down) {
        const message = `The ${
          migration.filename
        } file does not contain '-- Down' separator.`;
        throw new Error(message);
      } else {
        migration.up = up.replace(/^--.*?$/gm, '').trim();
        migration.down = down.replace(/^--.*?$/gm, '').trim();
        migration.hash = crypto
          .createHash('sha512')
          .update(eol.lf(data))
          .digest('hex');
      }
    })
  );

  console.info(`loaded ${migrations.length} migrations`);

  console.info(`prepping database`);

  await client.connect();
  try {
    console.info(`ensuring migration table (${table}) exists`);
    await client.query(
      `create table if not exists "${table}" (
        id integer primary key,
        name text not null,
        up text not null,
        down text not null,
        hash text not null
      );`
    );

    console.info('listing existing migrations ...');
    let appliedMigrations = await client
      .query(`select id, name, up, down, hash from "${table}" order by id asc;`)
      .then(
        r =>
          r.rows as {
            id: number;
            name: string;
            up: string;
            down: string;
            hash: string;
          }[]
      );
    console.info('... has %d migrations', appliedMigrations.length);

    let firstMismatch = -1;
    for (const { id, hash } of appliedMigrations) {
      const file = migrations.find(x => x.id === id);
      if (
        (file == null || file.hash !== hash) &&
        (firstMismatch === -1 || id < firstMismatch)
      ) {
        firstMismatch = id;
      }
    }
    if (firstMismatch !== -1) {
      if (!development) {
        throw new Error(
          `... ${firstMismatch} has a hash mismatch, aborting ...`
        );
      }

      console.info(
        `... ${firstMismatch} has a hash mismatch, rolling back ...`
      );

      for (const { id, down } of appliedMigrations
        .slice()
        .sort((a, b) => Math.sign(b.id - a.id))) {
        if (id < firstMismatch) {
          break;
        }

        console.info(`rolling back migration ${id}`);
        await client.query('begin;');
        try {
          await client.query(down);
          await client.query(`delete from "${table}" where id = $1::integer;`, [
            id
          ]);
          await client.query('commit;');
          appliedMigrations = appliedMigrations.filter(x => x.id !== id);
        } catch (err) {
          await client.query('rollback;');
          throw err;
        }
      }
    }

    for (const { id, name, up, down, hash } of migrations) {
      if (appliedMigrations.find(a => a.id === id)) {
        continue;
      }

      console.info(`applying migration ${id}`);
      await client.query('begin;');
      try {
        await client.query(up);
        if (development) {
          await client.query(down);
          await client.query(up);
        }

        await client.query(
          `insert into "${table}" (id, name, up, down, hash) values ($1::integer, $2::text, $3::text, $4::text, $5::text);`,
          [id, name, up, down, hash]
        );
        await client.query('commit;');
      } catch (err) {
        await client.query('rollback;');
        throw err;
      }
    }
  } finally {
    await client.end();
  }
}

module.exports = migrate;
