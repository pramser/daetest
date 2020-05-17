import { config } from "https://deno.land/x/dotenv/mod.ts";

const env: any = config();

export const APP_HOST: string = env.APP_HOST || "127.0.0.1";
export const APP_PORT: number = env.APP_PORT || 4000;
export const POSTGRES_USER: string = env.POSTGRES_USER || "denouer";
export const POSTGRES_PASSWORD: string = env.POSTGRES_PASSWORD || "secret";
export const POSTGRES_DB: string = env.POSTGRES_DB || "denouer";
export const POSTGRES_PORT: string = env.POSTGRES_PORT || 15432;
export const POSTGRES_HOST: string = env.POSTGRES_HOST || "localhost";
