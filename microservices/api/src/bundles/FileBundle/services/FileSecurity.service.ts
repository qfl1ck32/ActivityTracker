import {
  Service,
  Inject,
  EventManager,
  ContainerInstance,
} from "@bluelibs/core";
import { FileUpload } from "graphql-upload";
import { InvalidMimeTypeException } from "../exceptions";
import { MimeType } from "./types";

@Service()
export class FileSecurityService {
  constructor(protected readonly container: ContainerInstance) {}

  public checkMimeType(file: FileUpload, mimeType: MimeType | MimeType[]) {
    const mimeTypes = Array.isArray(mimeType) ? mimeType : [mimeType];

    const { mimetype } = file;

    if (!mimeTypes.some((type) => mimetype.startsWith(type))) {
      throw new InvalidMimeTypeException({
        expected: mimeTypes,
        received: mimetype,
      });
    }
  }
}
