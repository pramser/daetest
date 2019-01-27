export type Result = {
  id: number;
  name: string;
  date: Date;
  assignee: string;
  product: string;
  type: string;
  passed: number;
  failed: number;
};

export type TestCase = {
  test_name: string;
  result: boolean;
};

export type Coverage = {
  id: number;
  name: string;
  date: Date;
  product: string;
  coverage: number;
};
