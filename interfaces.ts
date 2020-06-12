export interface IModel {
  id: number;
}

export interface IRepository<TModel> {
  create(model: TModel): TModel;

  update(id: number, model: TModel): TModel;

  delete(id: number): void;

  selectById(id: number): TModel;

  selectAll(): TModel[];
}

export enum TestResult {
  None,
  Pass,
  Fail,
}

export enum RunType {
  Unknown = 0,
  Denouer,
  JUnit,
  Cucumber,
}

export class Test implements IModel {
  id: number;
  run_id: number;
  name: string;
  info: string;
  description: string;
  result: TestResult;

  constructor({ id, run_id, name, info, description, result }: any) {
    this.id = id;
    this.run_id = run_id;
    this.name = name;
    this.info = info;
    this.description = description;
    this.result = result;
  }
}

export class Run implements IModel {
  id: number;
  file_path: string;
  file_name: string;
  mime_type: string;
  encoding: string;

  product: string;
  meta: string;
  status: number;
  type: number;
  created_at: Date;

  constructor({
    id,
    file_path,
    file_name,
    mime_type,
    encoding,
    product,
    meta,
    status,
    type,
    created_at,
  }: any) {
    this.id = id;
    this.file_path = file_path;
    this.file_name = file_name;
    this.mime_type = mime_type;
    this.encoding = encoding;

    this.product = product;
    this.meta = meta;
    this.status = status;
    this.type = type;
    this.created_at = created_at;
  }
}

export interface IFileParser {
  parseFile(file: any): [];
}
