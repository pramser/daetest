import client from "../db/database.ts";

class TestRepository {
  create(test: any) {
    return client.query(
      "INSERT INTO tests (name, info, description, result) VALUES ($1, $2, $3, $4)",
      test.name,
      test.info,
      test.description,
      test.result
    );
  }

  selectAll() {
    return client.query("SELECT * FROM tests ORDER BY id");
  }

  selectById(id: number) {
    return client.query(`SELECT * FROM tests WHERE id = $1`, id);
  }

  delete(id: number) {
    return client.query(`DELETE FROM tests WHERE id = $1`, id);
  }
}

export default new TestRepository();
