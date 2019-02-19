import { Model } from 'objection';
import { FileStatus, ResultType } from './enum';

export class File extends Model {
  // File Metadata
  readonly id!: string;
  path!: string;
  filename!: string;
  mimetype!: string;
  encoding!: string;

  // Test Metadata
  product!: string;
  meta!: string;
  filestatus!: FileStatus;
  resulttype!: ResultType;
  createdat!: Date;

  static tableName = 'testmon.file';
  static idColumn = 'id';

  static jsonSchema = {
    type: 'object',
    required: ['filename'],

    properties: {
      filename: { type: 'string', minLength: 1 }
    }
  };
}
