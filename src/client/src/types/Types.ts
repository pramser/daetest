export type File = {
  id: string;
  file_name: string;
  mime_type: string;
  encoding: string;

  product: string;
  meta: string;

  created_at: Date;
};

export type Result = {
  id: number;
  name: string;
  description: string;
  assignee: string;
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
