import { Application } from "https://deno.land/x/oak/mod.ts";

import { APP_HOST, APP_PORT } from "./config.ts";
import router from "./routes.ts";
import _404 from "./controllers/404.ts";
import errorHandler from "./controllers/error_handler.ts";
import { init } from "./db/init.ts";

const app = new Application();

app.use(errorHandler);
app.use(router.routes());
app.use(router.allowedMethods());
app.use(_404);

init().then(async () => {
  console.log(`Listening on port:${APP_PORT}`);
  await app.listen(`${APP_HOST}:${APP_PORT}`);
});