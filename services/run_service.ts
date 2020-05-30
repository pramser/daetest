import runRepository from "../repositories/run_repository.ts";
import { Run } from "../interfaces.ts";

export const createRun = (run: Run): Run => {
  return runRepository.create(run);
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
