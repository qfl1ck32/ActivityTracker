import * as X from "@bluelibs/x-bundle";
import { IResolverMap } from "@bluelibs/graphql-bundle";
import {
  NoteModelInsertInput,
  NoteModelUpdateInput,
} from "../../../services/inputs";
import { NoteModelsCollection } from "../../../collections/NoteModels/NoteModels.collection";

export default {
  Query: [
    [],
    {
      NoteModelsFindOne: [X.ToNovaOne(NoteModelsCollection)],
      NoteModelsFind: [X.ToNova(NoteModelsCollection)],
      NoteModelsCount: [X.ToCollectionCount(NoteModelsCollection)],
    },
  ],
  Mutation: [
    [],
    {
      NoteModelsInsertOne: [
        X.ToModel(NoteModelInsertInput, { field: "document" }),
        X.Validate({ field: "document" }),
        X.ToDocumentInsert(NoteModelsCollection),
        X.ToNovaByResultID(NoteModelsCollection),
      ],
      NoteModelsUpdateOne: [
        X.ToModel(NoteModelUpdateInput, { field: "document" }),
        X.Validate({ field: "document" }),
        X.CheckDocumentExists(NoteModelsCollection),
        X.ToDocumentUpdateByID(NoteModelsCollection, null, ({ document }) => ({
          $set: document,
        })),
        X.ToNovaByResultID(NoteModelsCollection),
      ],
      NoteModelsDeleteOne: [
        X.CheckDocumentExists(NoteModelsCollection),
        X.ToDocumentDeleteByID(NoteModelsCollection),
      ],
    },
  ],
  Subscription: {
    NoteModelsSubscription: {
      resolve: (payload) => payload,
      subscribe: [X.ToSubscription(NoteModelsCollection)],
    },
    NoteModelsSubscriptionCount: {
      resolve: (payload) => payload,
      subscribe: [X.ToSubscriptionCount(NoteModelsCollection)],
    },
  },
} as IResolverMap;
