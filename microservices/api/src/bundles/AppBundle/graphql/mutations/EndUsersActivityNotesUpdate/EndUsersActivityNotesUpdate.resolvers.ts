import * as X from "@bluelibs/x-bundle";
import { IResolverMap } from "@bluelibs/graphql-bundle";

import { EndUsersActivityNotesUpdateInput } from "../../../services/inputs/EndUsersActivityNotesUpdate.input";
import { ActivityNotesService } from "../../../services/ActivityNotes.service";

export default {
  Mutation: {
    EndUsersActivityNotesUpdate: [
      X.CheckLoggedIn(),
      X.CheckPermission(["ADMIN"]),
      X.ToModel(EndUsersActivityNotesUpdateInput),
      X.Validate(),
      X.ToService(ActivityNotesService, "update"),
    ],
  },
} as IResolverMap;
