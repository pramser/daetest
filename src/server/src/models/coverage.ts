import { Model } from 'objection';

export class Coverage extends Model {
  readonly id!: string;

  name!: string;
  description!: string;

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
