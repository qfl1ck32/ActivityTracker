import { MimeType } from "@bundles/FileBundle/services/types";
import { createReadStream } from "fs";
import { FileUpload } from "graphql-upload";
import { resolve } from "path";

const filesPath = "./src/bundles/AppBundle/fixtures/files";

const createFileUpload = (
  filename: string,
  mimetype: MimeType = MimeType.IMAGE
): Promise<FileUpload> => {
  return Promise.resolve({
    filename,
    encoding: "7-bit",
    mimetype,

    createReadStream: () =>
      createReadStream(resolve(`${filesPath}/${filename}`)),
  });
};

export const mockImage = createFileUpload("background.jpeg");
