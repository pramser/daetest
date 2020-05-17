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
  async testRunById(_: any, args: TestmonApi.ITestRunByIdOnQueryArguments) {
    const testRun = await TestRun.query().findById(args.id as string);
    if (!testRun) {
      return null;
    }
    return testRun;
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
  },
  async getDashboardReport(_: any) {
    const testsTotalCount = 0;
    const testsFailingCount = 1;
    const testsFailing = [{}];
    const testsUnassignedCount = 2;
    const testsUnassigned = [{}];
    const assignmentMetadatas = [{ assignedName: 'pramser', testCount: 3 }];
    const productMetadatas = [{ product: 'schedule', testCount: 4 }];

    return {
      testsTotalCount,
      testsFailingCount,
      testsFailing,
      testsUnassignedCount,
      testsUnassigned,
      assignmentMetadatas,
      productMetadatas
    };
  }
};
