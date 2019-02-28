/// <reference path="../schema.d.ts" />

import { createWriteStream } from 'fs';
import mkdirp from 'mkdirp';
import shortid from 'shortid';

import { File } from '../models/file';
import { Result } from '../models/result';

const UPLOAD_DIR = './uploads';

// Ensure upload directory exists.
mkdirp.sync(UPLOAD_DIR);

const storeFS = ({ stream, filename }: any): Promise<any> => {
  const id = shortid.generate();
  const path = `${UPLOAD_DIR}/${id}-${filename}`;

  return new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(path))
      .on('finish', () => resolve({ id, path }))
      .on('error', reject)
  );
};

const storeDB = (file: any) => {
  return File.query().insertAndFetch(file);
};

const processUpload = async (upload: any) => {
  console.log(upload);
  const { stream, filename, mimetype, encoding } = await upload;
  const { id, path } = (await storeFS({ stream, filename })) as any;
  return storeDB({ id, filename, mimetype, encoding, path });
};

const processCreate = (file: any) => {
  const { filename, product, meta } = file;
  return storeDB({
    filename,
    product,
    meta
  });
};

const createTestCase = (runid: string, testCase: any) => {
  const { name, description } = testCase;
  return Result.query().insertAndFetch({ runid, name, description });
};

export const Mutation = {
  createFile: (obj: any, { file }: any) => processCreate(file),
  uploadFile: (obj: any, { file }: any) => processUpload(file),
  multipleUpload: (obj: any, { files }: any) =>
    Promise.all(files.map(processUpload)),
  createTestCase: (obj: any, { runid, testCase }: any) =>
    createTestCase(runid, testCase)
};
