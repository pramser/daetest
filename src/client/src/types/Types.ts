export type TestRun = {
  id: string;
  path: string;
  filename: string;
  mimetype: string;
  encoding: string;

  product: string;
  meta: string;
  status: TestRunStatus;
  type: TestRunType;
  createdat: Date;
};

export enum TestRunStatus {
  Pending = 0,
  Pass,
  Fail
}

export enum TestRunType {
  None = 0,
  TestMon,
  JUnit,
  Cucumber
}

export type TestCase = {
  id: string;
  name: string;
  info: string;
  description: string;
  result: string;
};

export enum TestCaseResult {
  None = 0,
  Pass,
  Fail
}
