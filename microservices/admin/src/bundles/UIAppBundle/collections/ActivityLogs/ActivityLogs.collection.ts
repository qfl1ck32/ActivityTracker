import {
  Collection,
  CollectionLinkConfig,
  CollectionTransformMap,
} from "@bluelibs/x-ui";
import { ActivityLog } from "@root/api.types";
import {
  ActivitiesCollection,
  NoteModelsCollection,
  ActivityLogDetailsCollection,
  EndUsersCollection,
  UsersCollection,
} from "@bundles/UIAppBundle/collections";
import { ObjectId } from "@bluelibs/ejson";

export type { ActivityLog };

export class ActivityLogsCollection extends Collection<ActivityLog> {
  getName() {
    return "ActivityLogs";
  }

  getInputs() {
    return {
      insert: "ActivityLogInsertInput!",
      update: "ActivityLogUpdateInput!",
    };
  }

  // Return here the relations with other configs
  getLinks(): CollectionLinkConfig<ActivityLog>[] {
    return [
      {
        collection: () => ActivitiesCollection,
        name: "activity",
        field: "activityId",
      },
      {
        collection: () => NoteModelsCollection,
        name: "noteModel",
        field: "noteModelId",
      },
      {
        collection: () => EndUsersCollection,
        name: "endUser",
        field: "endUserId",
      },
      {
        collection: () => UsersCollection,
        name: "createdBy",
        field: "createdById",
      },
      {
        collection: () => UsersCollection,
        name: "updatedBy",
        field: "updatedById",
      },
      {
        collection: () => ActivityLogDetailsCollection,
        name: "details",
      },
    ];
  }

  // Return here how you want to transform certain fields
  getTransformMap(): CollectionTransformMap<ActivityLog> {
    return {
      createdAt: (v) => new Date(v),
      updatedAt: (v) => new Date(v),
    };
  }
}
