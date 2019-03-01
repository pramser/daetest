import { TestRun } from '../models/testrun';
import { TestCase } from '../models/testcase';
import { TestRunType, TestRunStatus, TestCaseResult } from '../models/enum';

export async function init() {
  let testRuns = await TestRun.query().where(
    'filename',
    'unit_2018_12_01_1.xml'
  );
  if (testRuns.length < 1) {
    testRuns = await TestRun.query().insert([
      {
        filename: 'unit_2018_12_01_1.xml',
        path: './',
        mimetype: 'text/xml',
        encoding: 'utc-8',

        product: 'schedule',
        meta: 'unit',
        status: TestRunStatus.Pending,
        type: TestRunType.JUnit
      },
      {
        filename: 'int_2018_12_01_1.xml',
        path: './',
        mimetype: 'text/xml',
        encoding: 'utc-8',

        product: 'schedule',
        meta: 'int',
        status: TestRunStatus.Pending,
        type: TestRunType.JUnit
      },
      {
        filename: 'perf_2018_12_01_1.xml',
        path: './',
        mimetype: 'text/xml',
        encoding: 'utc-8',

        product: 'engage',
        meta: 'perf',
        status: TestRunStatus.Pending,
        type: TestRunType.JUnit
      }
    ]);
  }

  let results = await TestCase.query().where('name', 'test_success');
  if (results.length < 1) {
    results = await TestCase.query().insert([
      {
        name: 'test_success',
        runid: testRuns[0].id,
        info: '',
        description: 'Verifies the test can be imported successfully',
        result: TestCaseResult.Pass
      },
      {
        name: 'test_failure',
        runid: testRuns[0].id,
        info: 'ERR: Connection aborted during test run.',
        description: 'Verifies the test can be imported failingly',
        result: TestCaseResult.Fail
      },
      {
        name: 'test_none',
        runid: testRuns[1].id,
        info: '',
        description: 'Verifies the test can be imported noningly',
        result: TestCaseResult.None
      }
    ]);
  }

  const [{ id: resultId }] = results;
}
