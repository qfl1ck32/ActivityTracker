import {
  Collection,
  CollectionLinkConfig,
  CollectionTransformMap,
} from "@bluelibs/x-ui";
import { ActivityTiming } from "@root/api.types";
import {
  EndUsersCollection,
  ActivityLogsCollection,
  UsersCollection,
} from "@bundles/UIAppBundle/collections";
import { ObjectId } from "@bluelibs/ejson";

export type { ActivityTiming };

export class ActivityTimingsCollection extends Collection<ActivityTiming> {
  getName() {
    return "ActivityTimings";
  }

  getInputs() {
    return {
      insert: "ActivityTimingInsertInput!",
      update: "ActivityTimingUpdateInput!",
    };
  }

  // Return here the relations with other configs
  getLinks(): CollectionLinkConfig<ActivityTiming>[] {
    return [
      {
        collection: () => EndUsersCollection,
        name: "endUser",
        field: "endUserId",
      },
      {
        collection: () => ActivityLogsCollection,
        name: "activityLog",
        field: "activityLogId",
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
    ];
  }

  // Return here how you want to transform certain fields
  getTransformMap(): CollectionTransformMap<ActivityTiming> {
    return {
      startedAt: (v) => new Date(v),
      finishedAt: (v) => new Date(v),
      createdAt: (v) => new Date(v),
      updatedAt: (v) => new Date(v),
    };
  }
}
