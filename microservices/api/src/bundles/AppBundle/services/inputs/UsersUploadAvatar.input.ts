import { Schema, Is, a, an } from "@bluelibs/validator-bundle";
import { FileUpload } from "graphql-upload";

@Schema()
export class UsersUploadAvatarInput {
  avatar?: Promise<FileUpload>;
}
