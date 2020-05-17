import Knex from "knex";
import { Model } from "objection";
import pg from "pg";

import * as KnexEnvironments from "./knexfile";
import migrate from "./migrate";

export let knex: Knex | undefined;

export async function init() {
  const client = new pg.Client(process.env.DATABASE_URL);
  await migrate({ client, migrationsPath: "./migrations" });

  knex = Knex(
    KnexEnvironments[
      process.env.NODE_ENV as "test" | "development" | "staging" | "production"
    ]
  );
  Model.knex(knex);
}
