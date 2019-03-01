/// <reference path="../schema.d.ts" />

import { TestRun } from '../models/testrun';
import { TestCase } from '../models/testcase';

export const Query = {
  async allTestRuns() {
    const files = await TestRun.query();
    return files;
  },
  async allTestCases() {
    const testCases = await TestCase.query();
    return testCases;
  },
  async testCaseById(_: any, args: TestmonApi.ITestCaseByIdOnQueryArguments) {
    const testCase = await TestCase.query().findById(args.id as string);
    if (!testCase) {
      return null;
    }
    return testCase;
  },
  async testCasesByRunId(
    _: any,
    args: TestmonApi.ITestCasesByRunIdOnQueryArguments
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
