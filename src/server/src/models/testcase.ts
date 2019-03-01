import { Model } from 'objection';
import { TestCaseResult } from './enum';

export class TestCase extends Model {
  readonly id!: string;
  runid!: string;
  name!: string;
  info!: string;
  description!: string;
  result!: TestCaseResult;

  static tableName = 'testmon.testcase';
  static idColumn = 'id';

  static jsonSchema = {
    type: 'object',
    required: ['name'],

    properties: {
      name: { type: 'string', minLength: 1 }
    }
  };
}
