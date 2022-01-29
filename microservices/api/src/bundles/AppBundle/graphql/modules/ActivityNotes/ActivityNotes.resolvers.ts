import * as X from "@bluelibs/x-bundle";
import { IResolverMap } from "@bluelibs/graphql-bundle";
import {
  ActivityNoteInsertInput,
  ActivityNoteUpdateInput,
} from "../../../services/inputs";
import { ActivityNotesCollection } from "../../../collections/ActivityNotes/ActivityNotes.collection";

export default {
  Query: [
    [],
    {
      ActivityNotesFindOne: [X.ToNovaOne(ActivityNotesCollection)],
      ActivityNotesFind: [X.ToNova(ActivityNotesCollection)],
      ActivityNotesCount: [X.ToCollectionCount(ActivityNotesCollection)],
    },
  ],
  Mutation: [
    [],
    {
      ActivityNotesInsertOne: [
        X.ToModel(ActivityNoteInsertInput, { field: "document" }),
        X.Validate({ field: "document" }),
        X.ToDocumentInsert(ActivityNotesCollection),
        X.ToNovaByResultID(ActivityNotesCollection),
      ],
      ActivityNotesUpdateOne: [
        X.ToModel(ActivityNoteUpdateInput, { field: "document" }),
        X.Validate({ field: "document" }),
        X.CheckDocumentExists(ActivityNotesCollection),
        X.ToDocumentUpdateByID(
          ActivityNotesCollection,
          null,
          ({ document }) => ({
            $set: document,
          })
        ),
        X.ToNovaByResultID(ActivityNotesCollection),
      ],
      ActivityNotesDeleteOne: [
        X.CheckDocumentExists(ActivityNotesCollection),
        X.ToDocumentDeleteByID(ActivityNotesCollection),
      ],
    },
  ],
  Subscription: {
    ActivityNotesSubscription: {
      resolve: (payload) => payload,
      subscribe: [X.ToSubscription(ActivityNotesCollection)],
    },
    ActivityNotesSubscriptionCount: {
      resolve: (payload) => payload,
      subscribe: [X.ToSubscriptionCount(ActivityNotesCollection)],
    },
  },
} as IResolverMap;
