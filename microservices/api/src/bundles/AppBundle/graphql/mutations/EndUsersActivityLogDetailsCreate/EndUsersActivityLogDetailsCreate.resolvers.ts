import * as X from "@bluelibs/x-bundle";
import { IResolverMap } from "@bluelibs/graphql-bundle";

import { EndUsersActivityLogDetailsCreateInput } from "../../../services/inputs/EndUsersActivityLogDetailsCreate.input";
import { ActivityLogDetailsService } from "../../../services/ActivityLogDetails.service";
import { UserRole } from "../../../collections";

export default {
  Mutation: {
    EndUsersActivityLogDetailsCreate: [
      X.CheckLoggedIn(),
      X.CheckPermission(UserRole.END_USER),
      X.ToModel(EndUsersActivityLogDetailsCreateInput),
      X.Validate(),
      X.ToService(ActivityLogDetailsService, "create"),
    ],
  },
} as IResolverMap;
