import { UsersCollection } from "../Users/Users.collection";
import { ActivityLogDetailsCollection } from "../ActivityLogDetails/ActivityLogDetails.collection";
import { EndUsersCollection } from "../EndUsers/EndUsers.collection";
import { IBundleLinkCollectionOption } from "@bluelibs/mongo-bundle";

// Export link names as constants with type of: IBundleLinkCollectionOption, sample:
// export const myCustomLink: IBundleLinkCollectionOption = { ... }

export const endUser: IBundleLinkCollectionOption = {
  collection: () => EndUsersCollection,
  field: "endUserId",
};

export const activityLogDetail: IBundleLinkCollectionOption = {
  collection: () => ActivityLogDetailsCollection,
  field: "activityLogDetailId",
};

export const createdBy: IBundleLinkCollectionOption = {
  collection: () => UsersCollection,
  field: "createdById",
};

export const updatedBy: IBundleLinkCollectionOption = {
  collection: () => UsersCollection,
  field: "updatedById",
};
