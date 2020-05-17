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
    allTestRuns:
      | Array<ITestRun | null | Promise<ITestRun | null>>
      | null
      | Promise<Array<ITestRun | null | Promise<ITestRun | null>> | null>;
    allTestCases:
      | Array<ITestCase | Promise<ITestCase>>
      | Promise<Array<ITestCase | Promise<ITestCase>>>;
    testRunById: ITestRun | null | Promise<ITestRun | null>;
    testCaseById: ITestCase | null | Promise<ITestCase | null>;
    testCasesByRunId:
      | Array<ITestCase | null | Promise<ITestCase | null>>
      | null
      | Promise<Array<ITestCase | null | Promise<ITestCase | null>> | null>;
    getDashboardReport: IDashboardReport | Promise<IDashboardReport>;
  }

  interface ITestRunByIdOnQueryArguments {
    id: string | Promise<string>;
  }

  interface ITestCaseByIdOnQueryArguments {
    id: string | Promise<string>;
  }

  interface ITestCasesByRunIdOnQueryArguments {
    runid: string | Promise<string>;
  }

  interface ITestRun {
    __typename: 'TestRun';
    id: string | Promise<string>;
    path: string | Promise<string>;
    filename: string | Promise<string>;
    mimetype: string | Promise<string>;
    encoding: string | Promise<string>;
    product: string | Promise<string>;
    meta: string | Promise<string>;
    status: TestRunStatus | Promise<TestRunStatus>;
    type: TestRunType | Promise<TestRunType>;
    createdat: Date | Promise<Date>;
  }

  const enum TestRunStatus {
    PENDING = 'PENDING',
    PASS = 'PASS',
    FAIL = 'FAIL'
  }

  const enum TestRunType {
    NONE = 'NONE',
    TESTMON = 'TESTMON',
    JUNIT = 'JUNIT',
    CUCUMBER = 'CUCUMBER'
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

  interface IDashboardReport {
    __typename: 'DashboardReport';
    testsTotalCount: number | Promise<number>;
    testsFailingCount: number | Promise<number>;
    testsFailing:
      | Array<ITestCase | null | Promise<ITestCase | null>>
      | null
      | Promise<Array<ITestCase | null | Promise<ITestCase | null>> | null>;
    testsUnassignedCount: number | Promise<number>;
    testsUnassigned:
      | Array<ITestCase | null | Promise<ITestCase | null>>
      | null
      | Promise<Array<ITestCase | null | Promise<ITestCase | null>> | null>;
    assignmentMetadatas:
      | Array<IAssignmentMetadata | null | Promise<IAssignmentMetadata | null>>
      | null
      | Promise<Array<
          IAssignmentMetadata | null | Promise<IAssignmentMetadata | null>
        > | null>;
    productMetadatas:
      | Array<IProductMetadata | null | Promise<IProductMetadata | null>>
      | null
      | Promise<Array<
          IProductMetadata | null | Promise<IProductMetadata | null>
        > | null>;
  }

  interface IAssignmentMetadata {
    __typename: 'AssignmentMetadata';
    assignedName: string | Promise<string>;
    testCount: number | Promise<number>;
  }

  interface IProductMetadata {
    __typename: 'ProductMetadata';
    product: string | Promise<string>;
    testCount: number | Promise<number>;
  }

  interface IMutation {
    __typename: 'Mutation';
    createTestRun: ITestRun | Promise<ITestRun>;
    uploadFile: ITestRun | Promise<ITestRun>;
    multipleUpload:
      | Array<ITestRun | Promise<ITestRun>>
      | null
      | Promise<Array<ITestRun | Promise<ITestRun>> | null>;
    createTestCase: ITestCase | Promise<ITestCase>;
    modifyTestCase: ITestCase | Promise<ITestCase>;
    removeTestCase: boolean | null | Promise<boolean | null>;
  }

  interface ICreateTestRunOnMutationArguments {
    testrun?: ITestRunInput | null | Promise<ITestRunInput | null>;
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

  interface IModifyTestCaseOnMutationArguments {
    id: string | Promise<string>;
    testCase: ITestCaseInput | Promise<ITestCaseInput>;
  }

  interface IRemoveTestCaseOnMutationArguments {
    id: string | Promise<string>;
  }

  interface ITestRunInput {
    filename: string | Promise<string>;
    product?: string | null | Promise<string | null>;
    meta?: string | null | Promise<string | null>;
    type: TestRunType | Promise<TestRunType>;
  }

  interface ITestCaseInput {
    name?: string | null | Promise<string | null>;
    info?: string | null | Promise<string | null>;
    description?: string | null | Promise<string | null>;
    result?: TestCaseResult | null | Promise<TestCaseResult | null>;
  }
}

// tslint:enable
