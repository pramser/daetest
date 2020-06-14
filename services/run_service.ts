import runRepository from "../repositories/run_repository.ts";
import testRepository from "../repositories/test_repository.ts"
import FileConverter from "../parsers/file_importer.ts";
import { Run, Test } from "../interfaces.ts";

// TODO: download file and store it in './temp'
// import { download } from "https://deno.land/x/download";

export const createRun = (run: Run): Run => {
  var createdRun = runRepository.create(run);

  if (createdRun.file_name) {
    console.log("adding tests for file_path");
    let fileConverter = new FileConverter(createdRun.type);
    const isFileConverted = fileConverter.convertFile(createdRun.file_name, (tests: Test[]) => {
      if (tests.length > 0) {
        testRepository.createBatch(tests);
      }
    });

    // TODO: delete file post-conversion
    if (isFileConverted) console.log("tests added for file_path");
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
