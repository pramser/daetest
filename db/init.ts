import initMigrations from "./migrations.ts";
import initSeeds from "./seeds.ts";

export async function init() {
  let steps = [initMigrations, initSeeds].filter(Boolean);
  for (const step of steps) {
    step && (await step());
  }
}
