import { createReadStream } from "fs";
import { FileUpload } from "graphql-upload";
import { resolve } from "path";

export const files = [
  {
    filename: "background.jpeg",
    mimetype: "image/jpeg",
    encoding: "7bit",
  },
] as Partial<FileUpload>[];

export const fileList = files.map((file) =>
  Promise.resolve({
    ...file,

    createReadStream: () =>
      createReadStream(
        resolve(`./src/bundles/AppBundle/fixtures/files/${file.filename}`)
      ),
  })
) as Promise<FileUpload>[];

export const mockImage = fileList[0];
