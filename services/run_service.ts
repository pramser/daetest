import runRepository from "../repositories/run_repository.ts";
import { Run } from "../interfaces.ts";

export const getAllRuns = (): Run[] => {
  return runRepository.selectAll();
};

export const getSingleRun = (runId: number): Run => {
  return runRepository.selectById(runId);
};
