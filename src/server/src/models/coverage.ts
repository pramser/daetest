import { Model } from 'objection';
import { CoverageType, FileType } from './enum';

export class Coverage extends Model {
  readonly id!: string;

  name!: string;
  description!: string;

  file_type!: FileType;
  coverage_type!: CoverageType;

  created_at!: Date;
  updated_at!: Date;

  static tableName = 'testmon.coverage';
  static idColumn = 'id';

  static jsonSchema = {
    type: 'object',
    required: ['name'],

    properties: {
      name: { type: 'string', minLength: 1 }
    }
  };
}
