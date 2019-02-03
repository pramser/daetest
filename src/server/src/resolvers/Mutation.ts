/// <reference path="../schema.d.ts" />

import fs from 'fs';
import mkdirp from 'mkdirp';
import shortid from 'shortid';

import { File } from '../models/file';

const UPLOAD_DIR = './uploads';

// Ensure upload directory exists.
mkdirp.sync(UPLOAD_DIR);

const storeFS = ({ stream, filename }: any) => {
  const id = shortid.generate();
  const path = `${UPLOAD_DIR}/${id}-${filename}`;
  return new Promise((resolve, reject) =>
    stream
      .on('error', (error: any) => {
        if (stream.truncated)
          // Delete the truncated file.
          fs.unlinkSync(path);
        reject(error);
      })
      .pipe(fs.createWriteStream(path))
      .on('error', (error: any) => reject(error))
      .on('finish', () => resolve({ id, path }))
  );
};

const storeDB = (file: any) => {
  return File.query().insertAndFetch(file);
};

const processUpload = async (upload: any) => {
  const { createReadStream, filename, mimetype } = await upload;
  const stream = createReadStream();
  const { id, path } = (await storeFS({ stream, filename })) as any;
  return storeDB({ id, filename, mimetype, path });
};

export const Mutation = {
  uploadFile: (obj: any, { file }: any) => processUpload(file)
};
