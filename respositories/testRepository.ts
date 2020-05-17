import client from "../db/database.ts";

class TestRepository {
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
