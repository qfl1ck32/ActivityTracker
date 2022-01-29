import * as X from "@bluelibs/x-bundle";
import { IResolverMap } from "@bluelibs/graphql-bundle";
import {
  EndUserInsertInput,
  EndUserUpdateInput,
} from "../../../services/inputs";
import { EndUsersCollection } from "../../../collections/EndUsers/EndUsers.collection";

export default {
  Query: [
    [],
    {
      EndUsersFindOne: [X.ToNovaOne(EndUsersCollection)],
      EndUsersFind: [X.ToNova(EndUsersCollection)],
      EndUsersCount: [X.ToCollectionCount(EndUsersCollection)],
    },
  ],
  Mutation: [
    [],
    {
      EndUsersInsertOne: [
        X.ToModel(EndUserInsertInput, { field: "document" }),
        X.Validate({ field: "document" }),
        X.ToDocumentInsert(EndUsersCollection),
        X.ToNovaByResultID(EndUsersCollection),
      ],
      EndUsersUpdateOne: [
        X.ToModel(EndUserUpdateInput, { field: "document" }),
        X.Validate({ field: "document" }),
        X.CheckDocumentExists(EndUsersCollection),
        X.ToDocumentUpdateByID(EndUsersCollection, null, ({ document }) => ({
          $set: document,
        })),
        X.ToNovaByResultID(EndUsersCollection),
      ],
      EndUsersDeleteOne: [
        X.CheckDocumentExists(EndUsersCollection),
        X.ToDocumentDeleteByID(EndUsersCollection),
      ],
    },
  ],
  Subscription: {
    EndUsersSubscription: {
      resolve: (payload) => payload,
      subscribe: [X.ToSubscription(EndUsersCollection)],
    },
    EndUsersSubscriptionCount: {
      resolve: (payload) => payload,
      subscribe: [X.ToSubscriptionCount(EndUsersCollection)],
    },
  },
} as IResolverMap;
