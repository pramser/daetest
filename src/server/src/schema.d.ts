// prettier-ignore
// tslint:disable
// graphql typescript definitions

declare namespace TestmonApi {
  interface IGraphQLResponseRoot {
    data?: IQuery | IMutation;
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
    allFiles:
      | Array<IFile | null | Promise<IFile | null>>
      | null
      | Promise<Array<IFile | null | Promise<IFile | null>> | null>;
    allResults:
      | Array<IResult | Promise<IResult>>
      | Promise<Array<IResult | Promise<IResult>>>;
    resultById: IResult | null | Promise<IResult | null>;
  }

  interface IResultByIdOnQueryArguments {
    id: string | Promise<string>;
  }

  interface IFile {
    __typename: 'File';
    id: string | Promise<string>;
    file_name: string | Promise<string>;
    mime_type: string | Promise<string>;
    encoding: string | Promise<string>;
    product: string | Promise<string>;
    meta: string | Promise<string>;
    file_status: number | Promise<number>;
    result_type: number | Promise<number>;
    created_at: Date | Promise<Date>;
  }

  interface IResult {
    __typename: 'Result';
    id: string | Promise<string>;
    name: string | Promise<string>;
    description: string | Promise<string>;
    assignee: string | Promise<string>;
    result_status: number | Promise<number>;
  }

  interface IMutation {
    __typename: 'Mutation';
    uploadFile: IFile | Promise<IFile>;
  }

  interface IUploadFileOnMutationArguments {
    file: any | Promise<any>;
  }
}

// tslint:enable
