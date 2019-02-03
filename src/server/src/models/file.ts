import { Model } from 'objection';

export class File extends Model {
  readonly id!: string;

  filename!: string;
  mimetype!: string;
  encoding!: string;

  static tableName = 'testmon.file';
  static idColumn = 'id';

  static jsonSchema = {
    type: 'object',
    required: ['name'],

    properties: {
      name: { type: 'string', minLength: 1 }
    }
  };
}
