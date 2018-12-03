import { Model } from 'objection';

import { FileType, ResultType } from './enum';

export class Result extends Model {
  readonly id!: string;

  name!: string;
  description!: string;

  file_type!: FileType;
  result_type!: ResultType;

  created_at!: Date;
  updated_at!: Date;

  static tableName = 'testmon.result';
  static idColumn = 'id';

  static jsonSchema = {
    type: 'object',
    required: ['name'],

    properties: {
      name: { type: 'string', minLength: 1 }
    }
  };
}
