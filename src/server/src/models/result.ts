import { Model } from 'objection';
import { ResultStatus } from './enum';

export class Result extends Model {
  readonly id!: string;
  runid!: string;
  name!: string;
  description!: string;
  assignee!: string;
  resultstatus!: ResultStatus;

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
