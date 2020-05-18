import { Router } from "https://deno.land/x/oak/mod.ts";

import { getRoot } from "./controllers/home_controller.ts";

import {
  getTests,
  getTestById,
  postTest,
  putTest,
  deleteTest,
} from "./controllers/test_controller.ts";

const router = new Router();

router
  .get("/", getRoot)
  .get("/tests", getTests)
  .get("/tests/:id", getTestById)
  .post("/tests", postTest)
  .put("/tests/:id", putTest)
  .delete("/tests/:id", deleteTest);

export default router;
