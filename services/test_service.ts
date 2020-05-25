import testRepository from "../repositories/test_repository.ts";
import { Test } from "../interfaces.ts";

export const createTest = (test: Test): Test => {
  return testRepository.create(test);
};

export const updateTest = (testId: number, test: Test): Test => {
  return testRepository.update(testId, test);
};

export const removeTest = (testId: number): void => {
  return testRepository.delete(testId);
};

export const getAllTests = (): Test[] => {
  return testRepository.selectAll();
};

export const getTestsForRun = (runId: number): Test[] => {
  return testRepository.selectByRunId(runId);
};

export const getSingleTest = (testId: number): Test => {
  return testRepository.selectById(testId);
};
