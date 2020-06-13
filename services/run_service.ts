import runRepository from "../repositories/run_repository.ts";
import testRepository from "../repositories/test_repository.ts"
import { Run, Test } from "../interfaces.ts";

export const createRun = (run: Run, tests: Test[] = []): Run => {
  var createdRun = runRepository.create(run);

  if (tests.length > 0) {
    testRepository.createBatch(tests);
  }

  return createdRun;
};

export const updateRun = (runId: number, run: Run): Run => {
  return runRepository.update(runId, run);
};

export const getAllRuns = (): Run[] => {
  return runRepository.selectAll();
};

export const getSingleRun = (runId: number): Run => {
  return runRepository.selectById(runId);
};
