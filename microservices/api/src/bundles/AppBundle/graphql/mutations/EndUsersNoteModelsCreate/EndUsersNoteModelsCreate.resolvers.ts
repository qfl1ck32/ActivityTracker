import * as X from "@bluelibs/x-bundle";
import { IResolverMap } from "@bluelibs/graphql-bundle";

import { EndUsersNoteModelsCreateInput } from "../../../services/inputs/EndUsersNoteModelsCreate.input";
import { NoteModelsService } from "../../../services/NoteModels.service";
import { UserRole } from "@bundles/AppBundle/collections";

export default {
  Mutation: {
    EndUsersNoteModelsCreate: [
      X.CheckLoggedIn(),
      X.CheckPermission(UserRole.END_USER),
      X.ToModel(EndUsersNoteModelsCreateInput),
      X.Validate(),
      X.ToService(NoteModelsService, "create"),
    ],
  },
} as IResolverMap;
