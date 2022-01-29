import {
  Collection,
  CollectionLinkConfig,
  CollectionTransformMap,
} from "@bluelibs/x-ui";
import { NoteModel } from "@root/api.types";
import { EndUsersCollection } from "@bundles/UIAppBundle/collections";
import { ObjectId } from "@bluelibs/ejson";

export type { NoteModel };

export class NoteModelsCollection extends Collection<NoteModel> {
  getName() {
    return "NoteModels";
  }

  getInputs() {
    return {
      insert: "NoteModelInsertInput!",
      update: "NoteModelUpdateInput!",
    };
  }

  // Return here the relations with other configs
  getLinks(): CollectionLinkConfig<NoteModel>[] {
    return [
      {
        collection: () => EndUsersCollection,
        name: "endUser",
        field: "endUserId",
      },
    ];
  }

  // Return here how you want to transform certain fields
  getTransformMap(): CollectionTransformMap<NoteModel> {
    return {
      createdAt: (v) => new Date(v),
      updatedAt: (v) => new Date(v),
    };
  }
}
