export type Result = {
  id: number;
  date: Date;
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
  date: Date;
  product: string;
  coverage: number;
};
