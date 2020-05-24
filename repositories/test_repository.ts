import client from "../db/database.ts";
import { IRepository, Test, TestResult } from "../interfaces.ts";
import { APP_ENV } from "../config.ts";

class DatabaseTestRepository implements IRepository<Test> {
  create(test: Test) {
    return client.query(
      "INSERT INTO tests (name, info, description, result) VALUES ($1, $2, $3, $4)",
      test.name,
      test.info,
      test.description,
      test.result
    );
  }

  update(id: number, test: Test): Test {
    var query = `UPDATE beers `;
    var hasSet = false;
    if (test.name !== undefined) {
      query +=
        ` SET name = '${test.name}'` + (test.info !== undefined ? "," : "");
      hasSet = true;
    }

    if (test.info !== undefined) {
      if (!hasSet) query += " SET ";
      query +=
        ` info = '${test.info}'` + (test.description !== undefined ? "," : "");
      hasSet = true;
    }

    if (test.description !== undefined) {
      if (!hasSet) query += " SET ";
      query +=
        ` description = '${test.description}'` +
        (test.result !== undefined ? "," : "");
    }

    if (test.result !== undefined) {
      if (!hasSet) query += " SET ";
      query += ` result = '${test.result}'`;
    }

    query += ` WHERE id = ${id}`;

    var obj: any = new Object();
    var tests = client.query(query);

    tests.rows.map((test: any) => {
      tests.rowDescription.columns.map((el: any, i: any) => {
        obj[el.name] = test[i];
      });
    });

    return obj as Test;
  }

  delete(id: number): void {
    client.query(`DELETE FROM tests WHERE id = $1`, id);
  }

  selectAll(): Test[] {
    var result = new Array();
    var tests = client.query("SELECT * FROM tests ORDER BY id");

    tests.rows.map((test: any) => {
      var obj: any = new Object();

      tests.rowDescription.columns.map((el: any, i: any) => {
        obj[el.name] = test[i];
      });
      result.push(obj);
    });

    return result as Test[];
  }

  selectById(id: number): Test {
    var obj: any = new Object();
    var tests = client.query(`SELECT * FROM tests WHERE id = $1`, id);

    tests.rows.map((test: any) => {
      tests.rowDescription.columns.map((el: any, i: any) => {
        obj[el.name] = test[i];
      });
    });

    return obj as Test;
  }
}

class InMemoryTestRepository implements IRepository<Test> {
  tests_index = 1;

  tests = [
    {
      id: 1,
      name: "Name of the test",
      description: "Describe the test",
      info: "Information on the test",
      result: TestResult.Pass,
    },
  ] as Test[];

  create(test: Test): Test {
    test.id = this.tests_index++;
    this.tests = [...this.tests, test];
    return test;
  }

  update(id: number, test: Test): Test {
    var index = this.tests.findIndex((test) => test.id == id);
    this.tests[index] = test;
    return test;
  }

  delete(id: number): void {
    this.tests = this.tests.filter((test) => test.id != id);
  }

  selectAll(): Test[] {
    return this.tests;
  }

  selectById(id: number): Test {
    return this.tests.find((test) => test.id == id) as Test;
  }
}

export default APP_ENV === "local"
  ? new InMemoryTestRepository()
  : new DatabaseTestRepository();
