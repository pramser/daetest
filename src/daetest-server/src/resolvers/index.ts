import { GraphQLDate, GraphQLDateTime, GraphQLTime } from 'graphql-iso-date';
import { IResolvers } from 'graphql-tools';
import { TypeMap } from 'graphql/type/schema';

import { Query } from './Query';
import { Mutation } from './Mutation';

import { TestRunStatus, TestRunType, TestCaseResult } from './Enum';

export const resolvers: IResolvers<TypeMap> = {
  Date: GraphQLDate,
  DateTime: GraphQLDateTime,
  Time: GraphQLTime,

  Query: Query as any,
  Mutation: Mutation as any,

  TestRunStatus: TestRunStatus as any,
  TestRunType: TestRunType as any,
  TestCaseResult: TestCaseResult as any
};
