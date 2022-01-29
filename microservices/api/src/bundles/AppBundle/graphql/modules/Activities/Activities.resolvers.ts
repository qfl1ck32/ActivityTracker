import * as X from "@bluelibs/x-bundle";
import { IResolverMap } from "@bluelibs/graphql-bundle";
import {
  ActivityInsertInput,
  ActivityUpdateInput,
} from "../../../services/inputs";
import { ActivitiesCollection } from "../../../collections/Activities/Activities.collection";

export default {
  Query: [
    [],
    {
      ActivitiesFindOne: [X.ToNovaOne(ActivitiesCollection)],
      ActivitiesFind: [X.ToNova(ActivitiesCollection)],
      ActivitiesCount: [X.ToCollectionCount(ActivitiesCollection)],
    },
  ],
  Mutation: [
    [],
    {
      ActivitiesInsertOne: [
        X.ToModel(ActivityInsertInput, { field: "document" }),
        X.Validate({ field: "document" }),
        X.ToDocumentInsert(ActivitiesCollection),
        X.ToNovaByResultID(ActivitiesCollection),
      ],
      ActivitiesUpdateOne: [
        X.ToModel(ActivityUpdateInput, { field: "document" }),
        X.Validate({ field: "document" }),
        X.CheckDocumentExists(ActivitiesCollection),
        X.ToDocumentUpdateByID(ActivitiesCollection, null, ({ document }) => ({
          $set: document,
        })),
        X.ToNovaByResultID(ActivitiesCollection),
      ],
      ActivitiesDeleteOne: [
        X.CheckDocumentExists(ActivitiesCollection),
        X.ToDocumentDeleteByID(ActivitiesCollection),
      ],
    },
  ],
  Subscription: {
    ActivitiesSubscription: {
      resolve: (payload) => payload,
      subscribe: [X.ToSubscription(ActivitiesCollection)],
    },
    ActivitiesSubscriptionCount: {
      resolve: (payload) => payload,
      subscribe: [X.ToSubscriptionCount(ActivitiesCollection)],
    },
  },
} as IResolverMap;
