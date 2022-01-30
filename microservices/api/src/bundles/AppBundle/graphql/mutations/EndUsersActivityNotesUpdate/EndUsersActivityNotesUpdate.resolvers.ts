import * as X from "@bluelibs/x-bundle";
import { IResolverMap } from "@bluelibs/graphql-bundle";

import { EndUsersActivityNotesUpdateInput } from "../../../services/inputs/EndUsersActivityNotesUpdate.input";
import { ActivityNotesService } from "../../../services/ActivityNotes.service";
import { UserRole } from "../../../collections";

export default {
  Mutation: {
    EndUsersActivityNotesUpdate: [
      X.CheckLoggedIn(),
      X.CheckPermission(UserRole.END_USER),
      X.ToModel(EndUsersActivityNotesUpdateInput),
      X.Validate(),
      X.ToService(ActivityNotesService, "update"),
    ],
  },
} as IResolverMap;
