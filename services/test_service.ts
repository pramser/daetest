import testRepository from "../repositories/test_repository.ts";
import { Test } from "../interfaces.ts";

export const createTest = (test: Test): Test => {
  return testRepository.create(test);
};

export const getAllTests = (): Test[] => {
  return testRepository.selectAll();
};

export const getSingleTest = (testId: number): Test => {
  return testRepository.selectById(testId);
};
