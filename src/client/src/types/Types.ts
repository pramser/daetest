export type File = {
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

export type Result = {
  id: number;
  name: string;
  info: string;
  description: string;
};

export enum TestCaseResult {
  None = 0,
  Pass,
  Fail
}
