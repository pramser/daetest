/// <reference path="../schema.d.ts" />

import { File } from '../models/file';
import { Result } from '../models/result';

export const Query = {
  async allFiles() {
    const files = await File.query();
    return files;
  },
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
  },
  async resultsByRunId(
    _: any,
    args: TestmonApi.IResultsByRunIdOnQueryArguments
  ) {
    const results = await Result.query().where('runid', args.runid as string);
    if (!results) {
      return null;
    }
    return results;
  }
};
