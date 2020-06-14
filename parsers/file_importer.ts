import {
  existsSync,
  readFileStrSync,
} from "https://deno.land/std@0.57.0/fs/mod.ts";
import { IFileParser, RunType, Test } from "../interfaces.ts";
import JUnitParser from "./junit_parser.ts";

export default class FileConverter {
  file_parser: IFileParser | null = null;

  constructor(runType: RunType) {
    this.file_parser = this.resolveParser(runType);
  }

  resolveParser(runType: RunType): IFileParser {
    switch (runType) {
      case RunType.JUnit:
        return new JUnitParser();
      default:
        throw new Error("invalid RunType; try again");
    }
  }

  convertFile(filePath: string, callback: (tests: Test[]) => void) {
    if (!filePath || !existsSync(filePath)) {
      throw Error("invalid filePath; try again");
    }

    if (!this.file_parser) {
      throw Error("file_parser was not assigned");
    }

    let file = readFileStrSync(filePath);
    if (!file) return false;

    let tests = this.file_parser.parseFile(file);
    if (!tests) return false;

    callback(tests);
    return true;
  }
}
