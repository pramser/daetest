import { Test } from "../interfaces.ts";
import {
  getAllTests,
  getTestsForRun,
  getSingleTest,
  createTest,
  updateTest,
  removeTest,
} from "../services/test_service.ts";

export async function getTests({ response }: any) {
  response.body = await getAllTests();
}

export async function getTestById({ params, response }: any) {
  const id = params.id;

  if (!id) {
    response.status = 400;
    response.body = { msg: "invalid id" };
    return;
  }

  const test = await getSingleTest(id);

  if (!test) {
    response.status = 400;
    response.body = { msg: `id: ${id} not found` };
    return;
  }

  response.body = test;
}

export async function getTestsByRunId({ params, response }: any) {
  const runId = params.runId;

  if (!runId) {
    response.status = 400;
    response.body = { msg: "invalid id" };
    return;
  }

  const tests = await getTestsForRun(runId);

  if (!tests) {
    response.status = 400;
    response.body = { msg: `runId: ${runId} not found` };
    return;
  }

  response.body = tests;
}

export async function postTest({ request, response }: any) {
  if (!request.hasBody) {
    response.status = 400;
    response.body = { msg: "invalid data" };
    return;
  }

  const {
    value: { run_id, name, description, info, result },
  } = await request.body();

  const test = await createTest(
    new Test({ run_id, name, description, info, result })
  );
  response.body = { msg: "test created", test };
}

export async function putTest({ params, request, response }: any) {
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
    value: { run_id, name, description, info, result },
  } = await request.body();

  const test = await updateTest(
    id,
    new Test({ run_id, name, description, info, result })
  );
  response.body = test;
}

export async function deleteTest({ params, response }: any) {
  const id = params.id;

  if (!id) {
    response.status = 400;
    response.body = { msg: "invalid id" };
    return;
  }

  await removeTest(id);
  response.body = { msg: "test deleted", id };
}
