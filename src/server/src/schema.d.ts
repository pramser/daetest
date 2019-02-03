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
    allResults:
      | Array<IResult | Promise<IResult>>
      | Promise<Array<IResult | Promise<IResult>>>;
    resultById: IResult | null | Promise<IResult | null>;
    allFiles:
      | Array<IFile | null | Promise<IFile | null>>
      | null
      | Promise<Array<IFile | null | Promise<IFile | null>> | null>;
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

  interface IFile {
    __typename: 'File';
    filename: string | Promise<string>;
    mimetype: string | Promise<string>;
    encoding: string | Promise<string>;
  }

  interface IMutation {
    __typename: 'Mutation';
    uploadFile: IFile | Promise<IFile>;
  }

  interface IUploadFileOnMutationArguments {
    file: any | Promise<any>;
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
