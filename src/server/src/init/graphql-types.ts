import eol from 'eol';
import fs from 'fs';
import { importSchema } from 'graphql-import';
import os from 'os';
import path from 'path';
import { promisify } from 'util';

import { generateNamespace } from '@gql2ts/from-schema';
import { IFromQueryOptions, ITypeMap } from '@gql2ts/types';

export async function init() {
  const overrides: Partial<IFromQueryOptions> = {
    typeMap: ({ DateTime: 'Date' } as {
      [x: string]: string | undefined;
    }) as ITypeMap,
    printType: (type, isNonNull) => {
      const declaration = isNonNull ? type : `${type} | null`;
      return `${declaration} | Promise<${declaration}>`;
    }
  };

  const myNamespace = eol.auto(
    '// prettier-ignore' +
      os.EOL +
      generateNamespace(
        'TestmonApi',
        importSchema(path.resolve(__dirname, '..', 'schema.graphql')),
        {},
        overrides
      )
  );

  const schemaFile = path.resolve(__dirname, '..', 'schema.d.ts');
  const content = fs.existsSync(schemaFile)
    ? eol.auto(await promisify(fs.readFile)(schemaFile, 'utf8'))
    : null;
  if (content !== myNamespace) {
    await promisify(fs.writeFile)(schemaFile, myNamespace);
  }
}
