import { assertEquals, assert } from "https://deno.land/std/testing/asserts.ts";
import JUnitParser from "../../parsers/junit_parser.ts";

Deno.test("parseFile", () => {
  const file = `
    <?xml version="1.0" encoding="UTF-8"?>
    <testsuites tests="3">
        <testcase classname="foo1" name="ASuccessfulTest"/>
        <testcase classname="foo2" name="AnotherSuccessfulTest"/>
        <testcase classname="foo3" name="AFailingTest">
            <failure type="NotEnoughFoo"> details about failure </failure>
        </testcase>
    </testsuites>
  `;

  let junitParser = new JUnitParser();
  let testcases = junitParser.parseFile(file);

  assert(testcases, "no test cases returned");
  assertEquals(testcases.length, 3);

  testcases.forEach(({ attributes: { name, classname } }: any) => {
    assert(name, "name not being returned");
    assert(classname, "classname not being returned");
  });
});
