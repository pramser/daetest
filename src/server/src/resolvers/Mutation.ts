/// <reference path="../schema.d.ts" />

import { File } from '../models/file';

export const Mutation = {
  async uploadFile(parent: any, { file }: any) {
    const { stream, filename, mimetype, encoding } = await file;

    // 1. Validate file metadata.

    // 2. Stream file contents into cloud storage:
    // https://nodejs.org/api/stream.html

    // 3. Record the file upload in your DB.
    // const id = await recordFile( … )

    return { filename, mimetype, encoding };
  }
};
