/// <reference path="../schema.d.ts" />

import { File } from '../models/file';
import { TestCase } from '../models/testcase';

export const Query = {
  async allFiles() {
    const files = await File.query();
    return files;
  },
  async allTestCases() {
    const testCases = await TestCase.query();
    return testCases;
  },
  async testCaseById(_: any, args: TestmonApi.IResultByIdOnQueryArguments) {
    const testCase = await TestCase.query().findById(args.id as string);
    if (!testCase) {
      return null;
    }
    return testCase;
  },
  async testCasesByRunId(
    _: any,
    args: TestmonApi.IResultsByRunIdOnQueryArguments
  ) {
    const testCases = await TestCase.query().where(
      'runid',
      args.runid as string
    );
    if (!testCases) {
      return null;
    }
    return testCases;
  }
};
