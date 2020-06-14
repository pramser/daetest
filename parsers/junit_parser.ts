import { IFileParser, Test } from "../interfaces.ts";
import parse from "https://denopkg.com/nekobato/deno-xml-parser/index.ts";

export default class JUnitParser implements IFileParser {
  public parseFile(file: string): Test[] {
    let xml = parse(file);

    if (xml.root && xml.root.name == "testsuites") {
      return this.buildTests(xml.root?.children);
    }

    return [];
  }

  buildTests(objs: []): Test[] {
    let tests: any = [];
    objs.forEach((obj: any) => {
      const test = new Test({
        name: obj.attributes.name,
        info: "",
        description: "",
        result: 0
      })
      tests.push(test)
    });

    return tests;
  }
}
