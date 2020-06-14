export interface IModel {
  id: number;
}

export interface IRepository<TModel> {
  create(model: TModel): TModel;

  createBatch(models: TModel[]): void;

  update(id: number, model: TModel): TModel;

  delete(id: number): void;

  selectById(id: number): TModel;

  selectAll(): TModel[];
}

export enum Result {
  Unknown = 0,
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
  result: Result;

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
  file_name: string;
  product: string;
  result: Result;
  type: RunType;
  created_at: Date;

  constructor({
    id,
    file_name,
    product,
    status,
    type,
    created_at,
  }: any) {
    this.id = id;
    this.file_name = file_name;
    this.product = product;
    this.result = status;
    this.type = type;
    this.created_at = created_at;
  }
}

export interface IFileParser {
  parseFile(file: string): Test[];
}
