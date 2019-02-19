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
    path: string | Promise<string>;
    filename: string | Promise<string>;
    mimetype: string | Promise<string>;
    encoding: string | Promise<string>;
    product: string | Promise<string>;
    meta: string | Promise<string>;
    filestatus: FileStatus | Promise<FileStatus>;
    resulttype: ResultType | Promise<ResultType>;
    createdat: Date | Promise<Date>;
  }

  const enum FileStatus {
    PENDING = 'PENDING',
    PASS = 'PASS',
    FAIL = 'FAIL'
  }

  const enum ResultType {
    NONE = 'NONE',
    TESTMON = 'TESTMON',
    JUNIT = 'JUNIT'
  }

  interface IResult {
    __typename: 'Result';
    id: string | Promise<string>;
    name: string | Promise<string>;
    description: string | Promise<string>;
    assignee: string | Promise<string>;
    resultstatus: ResultStatus | Promise<ResultStatus>;
  }

  const enum ResultStatus {
    NONE = 'NONE',
    PASS = 'PASS',
    FAIL = 'FAIL'
  }

  interface IMutation {
    __typename: 'Mutation';
    uploadFile: IFile | Promise<IFile>;
    multipleUpload:
      | Array<IFile | Promise<IFile>>
      | null
      | Promise<Array<IFile | Promise<IFile>> | null>;
  }

  interface IUploadFileOnMutationArguments {
    file: any | Promise<any>;
  }

  interface IMultipleUploadOnMutationArguments {
    files: Array<any | Promise<any>> | Promise<Array<any | Promise<any>>>;
  }
}

// tslint:enable
