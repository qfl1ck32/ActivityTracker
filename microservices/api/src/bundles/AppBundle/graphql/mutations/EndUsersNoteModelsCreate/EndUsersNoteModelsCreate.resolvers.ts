import * as X from "@bluelibs/x-bundle";
import { IResolverMap } from "@bluelibs/graphql-bundle";

import { EndUsersNoteModelsCreateInput } from "../../../services/inputs/EndUsersNoteModelsCreate.input";
import { NoteModelsService } from "../../../services/NoteModels.service";

export default {
  Mutation: {
    EndUsersNoteModelsCreate: [
      X.CheckLoggedIn(),
      X.CheckPermission(["ADMIN"]),
      X.ToModel(EndUsersNoteModelsCreateInput),
      X.Validate(),
      X.ToService(NoteModelsService, "create"),
    ],
  },
} as IResolverMap;
