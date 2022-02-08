import { Constructor } from "@bluelibs/core";
import { ObjectId } from "@bluelibs/ejson";
import { Collection } from "@bluelibs/mongo-bundle";
import { FileUpload } from "graphql-upload";
import { Filter } from "mongodb";

export type AvatarServiceUploadParams<T> = {
  collection: Constructor<Collection<T>>;

  avatar: Promise<FileUpload>;
  avatarIdField: keyof T;

  documentFilter: Filter<T>;

  userId: ObjectId;
};
