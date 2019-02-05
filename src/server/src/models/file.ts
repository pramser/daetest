import { Model } from 'objection';
import { FileStatus, ResultType } from './enum';

export class File extends Model {
  readonly id!: string;

  file_name!: string;
  mime_type!: string;
  encoding!: string;

  product!: string;
  meta!: string;

  file_status!: FileStatus;
  result_type!: ResultType;

  created_at!: Date;

  static tableName = 'testmon.file';
  static idColumn = 'id';

  static jsonSchema = {
    type: 'object',
    required: ['file_name'],

    properties: {
      file_name: { type: 'string', minLength: 1 }
    }
  };
}
