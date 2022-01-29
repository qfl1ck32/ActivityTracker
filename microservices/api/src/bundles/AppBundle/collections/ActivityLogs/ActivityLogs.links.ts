import { UsersCollection } from "../Users/Users.collection";
import { EndUsersCollection } from "../EndUsers/EndUsers.collection";
import { ActivityLogDetailsCollection } from "../ActivityLogDetails/ActivityLogDetails.collection";
import { NoteModelsCollection } from "../NoteModels/NoteModels.collection";
import { ActivitiesCollection } from "../Activities/Activities.collection";
import { IBundleLinkCollectionOption } from "@bluelibs/mongo-bundle";

// Export link names as constants with type of: IBundleLinkCollectionOption, sample:
// export const myCustomLink: IBundleLinkCollectionOption = { ... }

export const activity: IBundleLinkCollectionOption = {
  collection: () => ActivitiesCollection,
  field: "activityId",
};

export const noteModel: IBundleLinkCollectionOption = {
  collection: () => NoteModelsCollection,
  field: "noteModelId",
};

export const details: IBundleLinkCollectionOption = {
  collection: () => ActivityLogDetailsCollection,
  inversedBy: "activityLog",
};

export const endUser: IBundleLinkCollectionOption = {
  collection: () => EndUsersCollection,
  field: "endUserId",
};

export const createdBy: IBundleLinkCollectionOption = {
  collection: () => UsersCollection,
  field: "createdById",
};

export const updatedBy: IBundleLinkCollectionOption = {
  collection: () => UsersCollection,
  field: "updatedById",
};
