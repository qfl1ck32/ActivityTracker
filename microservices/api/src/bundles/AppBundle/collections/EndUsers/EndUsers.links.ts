import { ActivityLogsCollection } from "../ActivityLogs/ActivityLogs.collection";
import { UsersCollection } from "../Users/Users.collection";
import { IBundleLinkCollectionOption } from "@bluelibs/mongo-bundle";

// Export link names as constants with type of: IBundleLinkCollectionOption, sample:
// export const myCustomLink: IBundleLinkCollectionOption = { ... }

export const owner: IBundleLinkCollectionOption = {
  collection: () => UsersCollection,
  field: "ownerId",
  unique: true,
};

export const activityLogs: IBundleLinkCollectionOption = {
  collection: () => ActivityLogsCollection,
  many: true,
  inversedBy: "endUser",
};

export const createdBy: IBundleLinkCollectionOption = {
  collection: () => UsersCollection,
  field: "createdById",
};

export const updatedBy: IBundleLinkCollectionOption = {
  collection: () => UsersCollection,
  field: "updatedById",
};
