import { walk, readFileStr } from "https://deno.land/std@0.60.0/fs/mod.ts";
import client from "./database.ts";

const dir = "./db/migrations";

export default async () => {
  const files = await getFiles(dir);

  if (!files.length) {
    throw new Error(`No migration files found in '${dir}'.`);
  }

  console.log("found migrations");
};

async function getFiles(dir: string) {
  var files: any = new Array();

  for await (const file of walk(dir)) {
    files.push(file.path);
  }

  return files;
}
