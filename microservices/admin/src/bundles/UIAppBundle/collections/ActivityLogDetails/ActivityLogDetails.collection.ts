import {
  Collection,
  CollectionLinkConfig,
  CollectionTransformMap,
} from "@bluelibs/x-ui";
import { ActivityLogDetail } from "@root/api.types";
import {
  UsersCollection,
  ActivityTimingsCollection,
  ActivityNotesCollection,
  ActivityLogsCollection,
} from "@bundles/UIAppBundle/collections";
import { ObjectId } from "@bluelibs/ejson";

export type { ActivityLogDetail };

export class ActivityLogDetailsCollection extends Collection<ActivityLogDetail> {
  getName() {
    return "ActivityLogDetails";
  }

  getInputs() {
    return {
      insert: "ActivityLogDetailInsertInput!",
      update: "ActivityLogDetailUpdateInput!",
    };
  }

  // Return here the relations with other configs
  getLinks(): CollectionLinkConfig<ActivityLogDetail>[] {
    return [
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
        collection: () => ActivityTimingsCollection,
        name: "timing",
        field: "timingId",
      },
      {
        collection: () => ActivityNotesCollection,
        name: "notes",
        field: "notesId",
      },
      {
        collection: () => ActivityLogsCollection,
        name: "activityLog",
        field: "activityLogId",
      },
    ];
  }

  // Return here how you want to transform certain fields
  getTransformMap(): CollectionTransformMap<ActivityLogDetail> {
    return {
      createdAt: (v) => new Date(v),
      updatedAt: (v) => new Date(v),
    };
  }
}
