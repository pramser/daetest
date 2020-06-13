import { IFileParser } from "../interfaces.ts";
import parse from "https://denopkg.com/nekobato/deno-xml-parser/index.ts";

export default class JUnitParser implements IFileParser {
  public parseFile(file: string): [] {
    let xml = parse(file);

    if (xml.root && xml.root.name == "testsuites") {
      return xml.root?.children as [];
    }

    return [];
  }
}
