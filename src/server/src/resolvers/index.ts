import { GraphQLDate, GraphQLDateTime, GraphQLTime } from 'graphql-iso-date';
import { IResolvers } from 'graphql-tools';
import { TypeMap } from 'graphql/type/schema';

import { Query } from './Query';
import { Mutation } from './Mutation';
// import { File } from './File';
// import { Result } from './Result';

export const resolvers: IResolvers<TypeMap> = {
  Date: GraphQLDate,
  DateTime: GraphQLDateTime,
  Time: GraphQLTime,
  Query: Query as any,
  Mutation: Mutation as any
  //   File: File as any
  //   Result: Result as any
};
