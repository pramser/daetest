import { Run } from "../interfaces.ts";
import {
  getAllRuns,
  getSingleRun,
  updateRun,
  createRun,
} from "../services/run_service.ts";

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

export async function postRun({ request, response }: any) {
  if (!request.hasBody) {
    response.status = 400;
    response.body = { msg: "invalid data" };
    return;
  }

  const {
    value: {
      file_path,
      file_name,
      mime_type,
      encoding,
      product,
      meta,
      status,
      type,
      created_at,
    },
  } = await request.body();

  const run = await createRun(new Run({
    file_path,
    file_name,
    mime_type,
    encoding,
    product,
    meta,
    status,
    type,
    created_at,
  }));
  response.body = { msg: "run created", run };
}

export async function putRun({ params, request, response }: any) {
  const id = params.id;

  if (!id) {
    response.status = 400;
    response.body = { msg: "invalid id" };
    return;
  }

  if (!request.hasBody) {
    response.status = 400;
    response.body = { msg: "invalid data" };
    return;
  }

  const {
    value: {
      file_path,
      file_name,
      mime_type,
      encoding,
      product,
      meta,
      status,
      type,
      created_at,
    },
  } = await request.body();

  const run = await updateRun(
    id,
    new Run({
      file_path,
      file_name,
      mime_type,
      encoding,
      product,
      meta,
      status,
      type,
      created_at,
    })
  );
  response.body = run;
}
