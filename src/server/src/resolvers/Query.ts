/// <reference path="../schema.d.ts" />

import { Result } from '../models/result';

export const Query = {
  async allResults() {
    const results = await Result.query();
    return results;
  },
  async resultById(_: any, args: TestmonApi.IResultByIdOnQueryArguments) {
    const result = await Result.query().findById(args.id as string);
    if (!result) {
      return null;
    }
    return result;
  }
};
