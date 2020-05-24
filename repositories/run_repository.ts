import { IRepository, Run } from "../interfaces.ts";

class InMemoryTestRepository implements IRepository<Run> {
  runs_index = 2;

  runs = [
    {
      id: 1,
      file_path: "../file_path",
      file_name: "file_name.xml",
      mime_type: "application/xml",
      encoding: "UTC-8",
      product: "denouer",
      meta: "e2e",
      status: 2,
      type: 2,
      created_at: new Date(2020, 2, 2),
    },
    {
      id: 2,
      file_path: "../file_path",
      file_name: "file_name.feature",
      mime_type: "application/feature",
      encoding: "UTC-8",
      product: "denouer",
      meta: "ui",
      status: 3,
      type: 3,
      created_at: new Date(2020, 2, 2),
    },
  ] as Run[];

  create(run: Run): Run {
    run.id = this.runs_index++;
    this.runs = [...this.runs, run];
    return run;
  }

  update(id: number, run: Run): Run {
    var index = this.runs.findIndex((run) => run.id == id);
    this.runs[index] = run;
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

export default new InMemoryTestRepository();
