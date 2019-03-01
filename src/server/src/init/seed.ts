import { File } from '../models/file';
import { TestCase } from '../models/testcase';
import { ResultType, FileStatus, TestCaseResult } from '../models/enum';

export async function init() {
  let files = await File.query().where('filename', 'unit_2018_12_01_1.xml');
  if (files.length < 1) {
    files = await File.query().insert([
      {
        filename: 'unit_2018_12_01_1.xml',
        path: './',
        mimetype: 'text/xml',
        encoding: 'utc-8',

        product: 'schedule',
        meta: 'unit',
        filestatus: FileStatus.Pending,
        resulttype: ResultType.JUnit
      },
      {
        filename: 'int_2018_12_01_1.xml',
        path: './',
        mimetype: 'text/xml',
        encoding: 'utc-8',

        product: 'schedule',
        meta: 'int',
        filestatus: FileStatus.Pending,
        resulttype: ResultType.JUnit
      },
      {
        filename: 'perf_2018_12_01_1.xml',
        path: './',
        mimetype: 'text/xml',
        encoding: 'utc-8',

        product: 'engage',
        meta: 'perf',
        filestatus: FileStatus.Pending,
        resulttype: ResultType.JUnit
      }
    ]);
  }

  let results = await TestCase.query().where('name', 'test_success');
  if (results.length < 1) {
    results = await TestCase.query().insert([
      {
        name: 'test_success',
        runid: files[0].id,
        info: '',
        description: 'Verifies the test can be imported successfully',
        result: TestCaseResult.Pass
      },
      {
        name: 'test_failure',
        runid: files[0].id,
        info: 'ERR: Connection aborted during test run.',
        description: 'Verifies the test can be imported failingly',
        result: TestCaseResult.Fail
      },
      {
        name: 'test_none',
        runid: files[1].id,
        info: '',
        description: 'Verifies the test can be imported noningly',
        result: TestCaseResult.None
      }
    ]);
  }

  const [{ id: resultId }] = results;
}
