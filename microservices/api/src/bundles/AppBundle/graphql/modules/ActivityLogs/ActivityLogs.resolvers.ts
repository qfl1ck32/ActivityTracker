import * as X from "@bluelibs/x-bundle";
import { IResolverMap } from "@bluelibs/graphql-bundle";
import {
  ActivityLogInsertInput,
  ActivityLogUpdateInput,
} from "../../../services/inputs";
import { ActivityLogsCollection } from "../../../collections/ActivityLogs/ActivityLogs.collection";

export default {
  Query: [
    [],
    {
      ActivityLogsFindOne: [X.ToNovaOne(ActivityLogsCollection)],
      ActivityLogsFind: [X.ToNova(ActivityLogsCollection)],
      ActivityLogsCount: [X.ToCollectionCount(ActivityLogsCollection)],
    },
  ],
  Mutation: [
    [],
    {
      ActivityLogsInsertOne: [
        X.ToModel(ActivityLogInsertInput, { field: "document" }),
        X.Validate({ field: "document" }),
        X.ToDocumentInsert(ActivityLogsCollection),
        X.ToNovaByResultID(ActivityLogsCollection),
      ],
      ActivityLogsUpdateOne: [
        X.ToModel(ActivityLogUpdateInput, { field: "document" }),
        X.Validate({ field: "document" }),
        X.CheckDocumentExists(ActivityLogsCollection),
        X.ToDocumentUpdateByID(
          ActivityLogsCollection,
          null,
          ({ document }) => ({
            $set: document,
          })
        ),
        X.ToNovaByResultID(ActivityLogsCollection),
      ],
      ActivityLogsDeleteOne: [
        X.CheckDocumentExists(ActivityLogsCollection),
        X.ToDocumentDeleteByID(ActivityLogsCollection),
      ],
    },
  ],
  Subscription: {
    ActivityLogsSubscription: {
      resolve: (payload) => payload,
      subscribe: [X.ToSubscription(ActivityLogsCollection)],
    },
    ActivityLogsSubscriptionCount: {
      resolve: (payload) => payload,
      subscribe: [X.ToSubscriptionCount(ActivityLogsCollection)],
    },
  },
} as IResolverMap;
