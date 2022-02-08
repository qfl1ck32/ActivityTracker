import { UsersCollection } from "./Users.collection";
import { AppFilesCollection } from "@bluelibs/x-s3-bundle";
import { EndUsersCollection } from "../EndUsers/EndUsers.collection";
import { IBundleLinkCollectionOption } from "@bluelibs/mongo-bundle";

// Export link names as constants with type of: IBundleLinkCollectionOption, sample:
// export const myCustomLink: IBundleLinkCollectionOption = { ... }

export const endUser: IBundleLinkCollectionOption = {
  collection: () => EndUsersCollection,
  inversedBy: "owner",
};

export const avatar: IBundleLinkCollectionOption = {
  collection: () => AppFilesCollection,
  field: "avatarId",
};

export const createdBy: IBundleLinkCollectionOption = {
  collection: () => UsersCollection,
  field: "createdById",
};

export const updatedBy: IBundleLinkCollectionOption = {
  collection: () => UsersCollection,
  field: "updatedById",
};
