import { UsersCollection } from "../Users/Users.collection";
import { ActivityLogsCollection } from "../ActivityLogs/ActivityLogs.collection";
import { EndUsersCollection } from "../EndUsers/EndUsers.collection";
import { IBundleLinkCollectionOption } from "@bluelibs/mongo-bundle";

// Export link names as constants with type of: IBundleLinkCollectionOption, sample:
// export const myCustomLink: IBundleLinkCollectionOption = { ... }

export const endUser: IBundleLinkCollectionOption = {
  collection: () => EndUsersCollection,
  field: "endUserId",
};

export const activityLog: IBundleLinkCollectionOption = {
  collection: () => ActivityLogsCollection,
  field: "activityLogId",
};

export const createdBy: IBundleLinkCollectionOption = {
  collection: () => UsersCollection,
  field: "createdById",
};

export const updatedBy: IBundleLinkCollectionOption = {
  collection: () => UsersCollection,
  field: "updatedById",
};
