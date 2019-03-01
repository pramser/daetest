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
    allTestCases:
      | Array<ITestCase | Promise<ITestCase>>
      | Promise<Array<ITestCase | Promise<ITestCase>>>;
    testCaseById: ITestCase | null | Promise<ITestCase | null>;
    testCasesByRunId:
      | Array<ITestCase | null | Promise<ITestCase | null>>
      | null
      | Promise<Array<ITestCase | null | Promise<ITestCase | null>> | null>;
  }

  interface ITestCaseByIdOnQueryArguments {
    id: string | Promise<string>;
  }

  interface ITestCasesByRunIdOnQueryArguments {
    runid: string | Promise<string>;
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

  interface ITestCase {
    __typename: 'TestCase';
    id: string | Promise<string>;
    runid: string | Promise<string>;
    name: string | Promise<string>;
    info: string | Promise<string>;
    description: string | Promise<string>;
    result: TestCaseResult | Promise<TestCaseResult>;
  }

  const enum TestCaseResult {
    NONE = 'NONE',
    PASS = 'PASS',
    FAIL = 'FAIL'
  }

  interface IMutation {
    __typename: 'Mutation';
    createFile: IFile | Promise<IFile>;
    uploadFile: IFile | Promise<IFile>;
    multipleUpload:
      | Array<IFile | Promise<IFile>>
      | null
      | Promise<Array<IFile | Promise<IFile>> | null>;
    createTestCase: ITestCase | Promise<ITestCase>;
  }

  interface ICreateFileOnMutationArguments {
    file?: IFileInput | null | Promise<IFileInput | null>;
  }

  interface IUploadFileOnMutationArguments {
    file: any | Promise<any>;
  }

  interface IMultipleUploadOnMutationArguments {
    files: Array<any | Promise<any>> | Promise<Array<any | Promise<any>>>;
  }

  interface ICreateTestCaseOnMutationArguments {
    runid: string | Promise<string>;
    testCase: ITestCaseInput | Promise<ITestCaseInput>;
  }

  interface IFileInput {
    filename: string | Promise<string>;
    product?: string | null | Promise<string | null>;
    meta?: string | null | Promise<string | null>;
  }

  interface ITestCaseInput {
    name: string | Promise<string>;
    info: string | Promise<string>;
    description: string | Promise<string>;
  }
}

// tslint:enable
