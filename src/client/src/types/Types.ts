export type File = {
  id: string;
  path: string;
  filename: string;
  mime_type: string;
  encoding: string;

  product: string;
  meta: string;
  createdat: Date;
};

export type Result = {
  id: number;
  name: string;
  description: string;
  assignee: string;
};
