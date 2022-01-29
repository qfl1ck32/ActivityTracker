import {
  Collection,
  CollectionLinkConfig,
  CollectionTransformMap,
} from "@bluelibs/x-ui";
import { EndUser } from "@root/api.types";
import {
  UsersCollection,
  ActivityLogsCollection,
} from "@bundles/UIAppBundle/collections";
import { ObjectId } from "@bluelibs/ejson";

export type { EndUser };

export class EndUsersCollection extends Collection<EndUser> {
  getName() {
    return "EndUsers";
  }

  getInputs() {
    return {
      insert: "EndUserInsertInput!",
      update: "EndUserUpdateInput!",
    };
  }

  // Return here the relations with other configs
  getLinks(): CollectionLinkConfig<EndUser>[] {
    return [
      {
        collection: () => UsersCollection,
        name: "owner",
        field: "ownerId",
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
        collection: () => ActivityLogsCollection,
        name: "activityLogs",
        many: true,
      },
    ];
  }

  // Return here how you want to transform certain fields
  getTransformMap(): CollectionTransformMap<EndUser> {
    return {
      createdAt: (v) => new Date(v),
      updatedAt: (v) => new Date(v),
    };
  }
}
