import { GraphQLServer } from 'graphql-yoga';
import { Context } from 'graphql-yoga/dist/types';
import path from 'path';
import pg from 'pg';
import { parse as parseDatabaseUrl } from 'pg-connection-string';

import { init } from './init';
import { resolvers } from './resolvers';

const parsed = parseDatabaseUrl(process.env.DATABASE_URL!);
const pool = new pg.Pool({
  host: parsed.host!,
  port: parsed.port!,
  user: parsed.user!,
  password: parsed.password!,
  database: parsed.database!
});

init().then(async () => {
  const server = new GraphQLServer({
    typeDefs: path.resolve(__dirname, './schema.graphql'),
    resolvers,
    context: (req: Context) => ({ ...req, pool })
  } as any);
  server.start(() =>
    console.log(
      `Server is running on http://localhost:${process.env.PORT || 4000}`
    )
  );
});
