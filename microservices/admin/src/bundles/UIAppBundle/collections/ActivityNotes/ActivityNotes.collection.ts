import {
  Collection,
  CollectionLinkConfig,
  CollectionTransformMap,
} from "@bluelibs/x-ui";
import { ActivityNote } from "@root/api.types";
import {
  EndUsersCollection,
  ActivityLogDetailsCollection,
  UsersCollection,
} from "@bundles/UIAppBundle/collections";
import { ObjectId } from "@bluelibs/ejson";

export type { ActivityNote };

export class ActivityNotesCollection extends Collection<ActivityNote> {
  getName() {
    return "ActivityNotes";
  }

  getInputs() {
    return {
      insert: "ActivityNoteInsertInput!",
      update: "ActivityNoteUpdateInput!",
    };
  }

  // Return here the relations with other configs
  getLinks(): CollectionLinkConfig<ActivityNote>[] {
    return [
      {
        collection: () => EndUsersCollection,
        name: "endUser",
        field: "endUserId",
      },
      {
        collection: () => ActivityLogDetailsCollection,
        name: "activityLogDetail",
        field: "activityLogDetailId",
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
  getTransformMap(): CollectionTransformMap<ActivityNote> {
    return {
      createdAt: (v) => new Date(v),
      updatedAt: (v) => new Date(v),
    };
  }
}
