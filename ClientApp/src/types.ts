export type Run = {
  id: string;
  path: string;
  file_name: string;
  mime_type: string;
  encoding: string;

  product: string;
  meta: string;
  status: Result;
  type: RunType;
  created_at: Date;
};

export enum RunType {
  None = 0,
  Denouer,
  JUnit,
  Cucumber,
}

export type Test = {
  id: string;
  name: string;
  info: string;
  description: string;
  result: Result;
};

export enum Result {
  None = 0,
  Pass,
  Fail,
}

export type DashboardReport = {
  testsTotalCount: number;
  testsFailingCount: number;
  testsFailing: [Test];
  testsUnassignedCount: number;
  testsUnassigned: [Test];
  assignmentMetadatas: [AssignmentMetadata];
  productMetadatas: [ProductMetadata];
};

export type AssignmentMetadata = {};

export type ProductMetadata = {};
