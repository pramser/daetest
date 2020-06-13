import { assert, assertEquals } from "https://deno.land/std/testing/asserts.ts";
import FileImporter from "../../parsers/file_importer.ts";
import { RunType } from "../../interfaces.ts";

Deno.test("convertFile", () => {
  let fileImporter = new FileImporter(RunType.JUnit);
  let isConverted = fileImporter.convertFile(
    "./tests/_files/junit.xml",
    (tests) => {
      assert(tests, "tests not returned");
      assertEquals(tests.length, 3, "tests length incorrect");
    }
  );

  assert(isConverted, "file conversion failed");
});
