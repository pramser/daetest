import runRepository from "../repositories/run_repository.ts";
import { Run } from "../interfaces.ts";

export const getAllRuns = (): Run[] => {
  return runRepository.selectAll();
};
