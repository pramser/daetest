import { Model } from 'objection';
import { TestRunStatus, TestRunType } from './enum';

export class TestRun extends Model {
  // File Metadata
  readonly id!: string;
  path!: string;
  filename!: string;
  mimetype!: string;
  encoding!: string;

  // Test Metadata
  product!: string;
  meta!: string;
  status!: TestRunStatus;
  type!: TestRunType;
  createdat!: Date;

  static tableName = 'testmon.testrun';
  static idColumn = 'id';

  static jsonSchema = {
    type: 'object',
    required: ['filename'],

    properties: {
      filename: { type: 'string', minLength: 1 }
    }
  };
}
