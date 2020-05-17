import { init as initDatabase } from "./database";
import { init as initSeed } from "./seed";

export async function init() {
  let steps = [
    initDatabase,
    process.env.NODE_ENV === "development" && initSeed,
  ].filter(Boolean);
  for (const step of steps) {
    step && (await step());
  }
}
