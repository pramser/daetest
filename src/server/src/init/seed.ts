import { Result } from '../models/result';
import { Coverage } from '../models/coverage';
import { ResultType, CoverageType, FileType } from '../models/enum';

export async function init() {
  let results = await Result.query().where('name', 'unit_2018_12_01_1.json');
  if (results.length < 1) {
    results = [
      await Result.query().insert({
        name: 'unit_2018_12_01_1.json',
        description: 'Results for a single file.',
        file_type: FileType.Json,
        result_type: ResultType.TestMon
      })
    ];
  }

  let coverages = await Coverage.query().where('name', 'cov_2018_12_01_1.json');
  if (coverages.length < 1) {
    coverages = [
      await Coverage.query().insert({
        name: 'cov_2018_12_01_1.json',
        description: 'Coverage for a single file.',
        file_type: FileType.Json,
        coverage_type: CoverageType.TestMon
      })
    ];
  }

  const [{ id: resultId }] = results;
}
