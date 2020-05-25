export type TestRun = {
  id: string;
  path: string;
  file_name: string;
  mime_type: string;
  encoding: string;

  product: string;
  meta: string;
  status: TestRunStatus;
  type: TestRunType;
  created_at: Date;
};

export enum TestRunStatus {
  Pending = 0,
  Pass,
  Fail,
}

export enum TestRunType {
  None = 0,
  Denouer,
  JUnit,
  Cucumber,
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
  Fail,
}

export type DashboardReport = {
  testsTotalCount: number;
  testsFailingCount: number;
  testsFailing: [TestCase];
  testsUnassignedCount: number;
  testsUnassigned: [TestCase];
  assignmentMetadatas: [AssignmentMetadata];
  productMetadatas: [ProductMetadata];
};

export type AssignmentMetadata = {};

export type ProductMetadata = {};
