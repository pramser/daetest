// prettier-ignore
// tslint:disable
// graphql typescript definitions

declare namespace TestmonApi {
  interface IGraphQLResponseRoot {
    data?: IQuery;
    errors?: Array<IGraphQLResponseError>;
  }

  interface IGraphQLResponseError {
    /** Required for all errors */
    message: string;
    locations?: Array<IGraphQLResponseErrorLocation>;
    /** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
    [propName: string]: any;
  }

  interface IGraphQLResponseErrorLocation {
    line: number;
    column: number;
  }

  interface IQuery {
    __typename: 'Query';
    allResults:
      | Array<IResult | Promise<IResult>>
      | Promise<Array<IResult | Promise<IResult>>>;
    resultById: IResult | null | Promise<IResult | null>;
  }

  interface IResultByIdOnQueryArguments {
    id: string | Promise<string>;
  }

  interface IResult {
    __typename: 'Result';
    id: string | Promise<string>;
    name: string | Promise<string>;
    description: string | Promise<string>;
    created_at: Date | Promise<Date>;
    updated_at: Date | Promise<Date>;
  }

  interface ICoverage {
    __typename: 'Coverage';
    id: string | Promise<string>;
    name: string | Promise<string>;
    description: string | Promise<string>;
    created_at: Date | Promise<Date>;
    updated_at: Date | Promise<Date>;
  }
}

// tslint:enable
