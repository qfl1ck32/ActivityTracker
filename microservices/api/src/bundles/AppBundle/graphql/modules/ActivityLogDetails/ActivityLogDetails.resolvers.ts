import * as X from "@bluelibs/x-bundle";
import { IResolverMap } from "@bluelibs/graphql-bundle";
import {
  ActivityLogDetailInsertInput,
  ActivityLogDetailUpdateInput,
} from "../../../services/inputs";
import { ActivityLogDetailsCollection } from "../../../collections/ActivityLogDetails/ActivityLogDetails.collection";

export default {
  Query: [
    [],
    {
      ActivityLogDetailsFindOne: [X.ToNovaOne(ActivityLogDetailsCollection)],
      ActivityLogDetailsFind: [X.ToNova(ActivityLogDetailsCollection)],
      ActivityLogDetailsCount: [
        X.ToCollectionCount(ActivityLogDetailsCollection),
      ],
    },
  ],
  Mutation: [
    [],
    {
      ActivityLogDetailsInsertOne: [
        X.ToModel(ActivityLogDetailInsertInput, { field: "document" }),
        X.Validate({ field: "document" }),
        X.ToDocumentInsert(ActivityLogDetailsCollection),
        X.ToNovaByResultID(ActivityLogDetailsCollection),
      ],
      ActivityLogDetailsUpdateOne: [
        X.ToModel(ActivityLogDetailUpdateInput, { field: "document" }),
        X.Validate({ field: "document" }),
        X.CheckDocumentExists(ActivityLogDetailsCollection),
        X.ToDocumentUpdateByID(
          ActivityLogDetailsCollection,
          null,
          ({ document }) => ({
            $set: document,
          })
        ),
        X.ToNovaByResultID(ActivityLogDetailsCollection),
      ],
      ActivityLogDetailsDeleteOne: [
        X.CheckDocumentExists(ActivityLogDetailsCollection),
        X.ToDocumentDeleteByID(ActivityLogDetailsCollection),
      ],
    },
  ],
  Subscription: {
    ActivityLogDetailsSubscription: {
      resolve: (payload) => payload,
      subscribe: [X.ToSubscription(ActivityLogDetailsCollection)],
    },
    ActivityLogDetailsSubscriptionCount: {
      resolve: (payload) => payload,
      subscribe: [X.ToSubscriptionCount(ActivityLogDetailsCollection)],
    },
  },
} as IResolverMap;
