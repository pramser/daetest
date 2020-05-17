import { getAllTests } from "../services/test_service.ts";

export async function getTests({ response }: any) {
  response.body = await getAllTests();
}

export function getTestDetails() {}

export function createTest() {}

export function updateTest() {}

export function deleteTest() {}
