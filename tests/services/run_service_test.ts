import { assertEquals, assert } from "https://deno.land/std/testing/asserts.ts";
import { createRun } from '../../services/run_service.ts'
import { Run } from '../../interfaces.ts'

Deno.test("createRun", () => {
    const run = new Run({ file_path: "./_files", file_name: "name_of_file.txt" });
    const createdRun = createRun(run);
    assert(createdRun);
    assertEquals(createdRun.file_path, "./_files");
});
