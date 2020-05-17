import { Router } from "https://deno.land/x/oak/mod.ts";

import {
  getTests,
  getTestDetails,
  createTest,
  updateTest,
  deleteTest,
} from "./controllers/testController.ts";

const router = new Router();

router
  .get("/tests", getTests)
  .get("/tests/:id", getTestDetails)
  .post("/beers", createTest)
  .put("/beers/:id", updateTest)
  .delete("/beers/:id", deleteTest);

export default router;
