import * as X from "@bluelibs/x-bundle";
import { IResolverMap } from "@bluelibs/graphql-bundle";
import {
  ActivityTimingInsertInput,
  ActivityTimingUpdateInput,
} from "../../../services/inputs";
import { ActivityTimingsCollection } from "../../../collections/ActivityTimings/ActivityTimings.collection";

export default {
  Query: [
    [],
    {
      ActivityTimingsFindOne: [X.ToNovaOne(ActivityTimingsCollection)],
      ActivityTimingsFind: [X.ToNova(ActivityTimingsCollection)],
      ActivityTimingsCount: [X.ToCollectionCount(ActivityTimingsCollection)],
    },
  ],
  Mutation: [
    [],
    {
      ActivityTimingsInsertOne: [
        X.ToModel(ActivityTimingInsertInput, { field: "document" }),
        X.Validate({ field: "document" }),
        X.ToDocumentInsert(ActivityTimingsCollection),
        X.ToNovaByResultID(ActivityTimingsCollection),
      ],
      ActivityTimingsUpdateOne: [
        X.ToModel(ActivityTimingUpdateInput, { field: "document" }),
        X.Validate({ field: "document" }),
        X.CheckDocumentExists(ActivityTimingsCollection),
        X.ToDocumentUpdateByID(
          ActivityTimingsCollection,
          null,
          ({ document }) => ({
            $set: document,
          })
        ),
        X.ToNovaByResultID(ActivityTimingsCollection),
      ],
      ActivityTimingsDeleteOne: [
        X.CheckDocumentExists(ActivityTimingsCollection),
        X.ToDocumentDeleteByID(ActivityTimingsCollection),
      ],
    },
  ],
  Subscription: {
    ActivityTimingsSubscription: {
      resolve: (payload) => payload,
      subscribe: [X.ToSubscription(ActivityTimingsCollection)],
    },
    ActivityTimingsSubscriptionCount: {
      resolve: (payload) => payload,
      subscribe: [X.ToSubscriptionCount(ActivityTimingsCollection)],
    },
  },
} as IResolverMap;
