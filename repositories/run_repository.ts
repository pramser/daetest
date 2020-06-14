import { IRepository, Run, Result, RunType } from "../interfaces.ts";

class InMemoryRunRepository implements IRepository<Run> {
  runs_index = 2;

  runs = [
    {
      id: 1,
      file_name: "file_name.xml",
      product: "denouer",
      result: Result.Pass,
      type: RunType.JUnit,
      created_at: new Date(2020, 2, 2),
    },
    {
      id: 2,
      file_name: "file_name.feature",
      product: "denouer",
      result: Result.Fail,
      type: RunType.Cucumber,
      created_at: new Date(2020, 2, 2),
    },
    {
      id: 3,
      file_name: "file_name.denouer",
      product: "denouer",
      result: Result.Unknown,
      type: RunType.Denouer,
      created_at: new Date(2020, 2, 2),
    },
  ] as Run[];

  create(run: Run): Run {
    run.id = this.runs_index++;
    this.runs = [...this.runs, run];
    return run;
  }

  createBatch(runs: Run[]): void {
    throw new Error("not implemented");
  }

  update(id: number, run: any): Run {
    var index = this.runs.findIndex((r) => r.id == id);
    var m_run = this.runs[index] as any;

    Object.keys(run).forEach((key: any) => {
      if (run[key]) m_run[key] = run[key];
    });

    this.runs[index] = m_run;
    return run;
  }

  delete(id: number): void {
    this.runs = this.runs.filter((run) => run.id != id);
  }

  selectAll(): Run[] {
    return this.runs;
  }

  selectById(id: number): Run {
    return this.runs.find((run) => run.id == id) as Run;
  }
}

export default new InMemoryRunRepository();
