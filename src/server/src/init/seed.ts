import Faker from 'faker';

import { Result } from '../models/result';
import { Coverage } from '../models/coverage';

export async function init() {
  let results = await Result.query().where('name', 'Development Company');
  if (results.length < 1) {
    results = [
      await Result.query().insert({
        name: 'Development Company',
        description: 'Development Seed Company (fake data)'
      })
    ];
  }

  const [{ id: resultId }] = results;
}
