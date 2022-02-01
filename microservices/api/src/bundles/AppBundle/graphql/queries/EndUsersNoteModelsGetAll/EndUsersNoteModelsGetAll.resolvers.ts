import * as X from "@bluelibs/x-bundle";
import { IResolverMap } from "@bluelibs/graphql-bundle";

import { NoteModelsService } from "../../../services/NoteModels.service";
import { UserRole } from "@bundles/AppBundle/collections";

export default {
  Query: {
    EndUsersNoteModelsGetAll: [
      X.CheckLoggedIn(),
      X.CheckPermission(UserRole.END_USER),
      X.ToService(NoteModelsService, "getAll", (_, ctx) => [ctx.userId]),
    ],
  },
} as IResolverMap;
