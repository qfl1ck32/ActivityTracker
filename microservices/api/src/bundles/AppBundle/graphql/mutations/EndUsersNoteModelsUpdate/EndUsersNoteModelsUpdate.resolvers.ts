import * as X from "@bluelibs/x-bundle";
import { IResolverMap } from "@bluelibs/graphql-bundle";

import { EndUsersNoteModelsUpdateInput } from "../../../services/inputs/EndUsersNoteModelsUpdate.input";
import { NoteModelsService } from "../../../services/NoteModels.service";
import { UserRole } from "@bundles/AppBundle/collections";

export default {
  Mutation: {
    EndUsersNoteModelsUpdate: [
      X.CheckLoggedIn(),
      X.CheckPermission(UserRole.END_USER),
      X.ToModel(EndUsersNoteModelsUpdateInput),
      X.Validate(),
      X.ToService(NoteModelsService, "update"),
    ],
  },
} as IResolverMap;
