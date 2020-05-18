import { getAllTests, createTest } from "../services/test_service.ts";

export async function getTests({ response }: any) {
  response.body = await getAllTests();
}

export async function getTestById({ params, response }: any) {
  response.body = "Creating new test";
  await createTest();
}

export function postTest() {}

export function putTest() {}

export function deleteTest() {}
