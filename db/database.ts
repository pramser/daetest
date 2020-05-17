import { Client } from "https://deno.land/x/postgres@v0.3.11/mod.ts";
import {
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER,
} from "../config.ts";

class Database {
  client: any;
  constructor() {
    this.connect();
  }

  async connect() {
    this.client = new Client({
      user: POSTGRES_USER,
      database: POSTGRES_DB,
      host: POSTGRES_HOST,
      password: POSTGRES_PASSWORD,
      port: POSTGRES_PORT,
    });

    await this.client.connect();
  }
}

export default new Database().client;
