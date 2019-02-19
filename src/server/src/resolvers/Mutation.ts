/// <reference path="../schema.d.ts" />

import { createWriteStream } from 'fs';
import mkdirp from 'mkdirp';
import shortid from 'shortid';

import { File } from '../models/file';

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

export const Mutation = {
  uploadFile: (obj: any, { file }: any) => processUpload(file),
  multipleUpload: (obj: any, { files }: any) =>
    Promise.all(files.map(processUpload))
};
