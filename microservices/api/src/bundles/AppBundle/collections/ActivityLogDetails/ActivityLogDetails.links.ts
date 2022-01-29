import { ActivityLogsCollection } from "../ActivityLogs/ActivityLogs.collection";
import { ActivityNotesCollection } from "../ActivityNotes/ActivityNotes.collection";
import { ActivityTimingsCollection } from "../ActivityTimings/ActivityTimings.collection";
import { UsersCollection } from "../Users/Users.collection";
import { IBundleLinkCollectionOption } from "@bluelibs/mongo-bundle";

// Export link names as constants with type of: IBundleLinkCollectionOption, sample:
// export const myCustomLink: IBundleLinkCollectionOption = { ... }

export const createdBy: IBundleLinkCollectionOption = {
  collection: () => UsersCollection,
  field: "createdById",
};

export const updatedBy: IBundleLinkCollectionOption = {
  collection: () => UsersCollection,
  field: "updatedById",
};

export const timing: IBundleLinkCollectionOption = {
  collection: () => ActivityTimingsCollection,
  field: "timingId",
};

export const notes: IBundleLinkCollectionOption = {
  collection: () => ActivityNotesCollection,
  field: "notesId",
};

export const activityLog: IBundleLinkCollectionOption = {
  collection: () => ActivityLogsCollection,
  field: "activityLogId",
};
