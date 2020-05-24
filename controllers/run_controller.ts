import { getAllRuns, getSingleRun } from "../services/run_service.ts";

export async function getRuns({ response }: any) {
  response.body = await getAllRuns();
}

export async function getRunById({ params, response }: any) {
  const id = params.id;

  if (!id) {
    response.status = 400;
    response.body = { msg: "invalid id" };
    return;
  }

  const run = await getSingleRun(id);

  if (!run) {
    response.status = 400;
    response.body = { msg: `id: ${id} not found` };
    return;
  }

  response.body = run;
}
