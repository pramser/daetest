import { Router } from "https://deno.land/x/oak/mod.ts";

import { getRoot } from "./controllers/home_controller.ts";
import { getDashboard } from "./controllers/dashboard_controller.ts";
import { getRuns, getRunById } from "./controllers/run_controller.ts";

import {
  getTests,
  getTestById,
  getTestsByRunId,
  postTest,
  putTest,
  deleteTest,
} from "./controllers/test_controller.ts";

const router = new Router();

router
  .get("/", getRoot)
  .get("/dashboard", getDashboard)
  .get("/runs", getRuns)
  .get("/runs/:id", getRunById)
  .get("/tests", getTests)
  .get("/tests/:id", getTestById)
  .get("/runs/:id/tests", getTestsByRunId)
  .post("/tests", postTest)
  .put("/tests/:id", putTest)
  .delete("/tests/:id", deleteTest);

export default router;
