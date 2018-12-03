/// <reference path="../schema.d.ts" />
import { Omit } from 'graphql-yoga/dist/types';

import { Result } from '../models/result';

export const Query = {
  async allResults() {
    const results = (await Result.query()) as Omit<
      TestmonApi.IResult,
      '__typename' | 'customers'
    >[];
    return results as Omit<TestmonApi.IQuery['allResults'], '__typename'>;
  },
  async resultById(_: any, args: TestmonApi.IResultByIdOnQueryArguments) {
    const result = await Result.query().findById(args.id as string);
    if (!result) {
      return null;
    }
    return (result as Omit<
      TestmonApi.IResult,
      '__typename' | 'customers'
    >) as Omit<TestmonApi.IQuery['resultById'], '__typename'>;
  }
};
