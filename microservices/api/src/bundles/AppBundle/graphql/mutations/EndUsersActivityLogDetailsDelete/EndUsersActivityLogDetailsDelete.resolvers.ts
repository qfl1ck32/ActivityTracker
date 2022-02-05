import * as X from "@bluelibs/x-bundle";
import { IResolverMap } from "@bluelibs/graphql-bundle";

import { EndUsersActivityLogDetailsDeleteInput } from "../../../services/inputs/EndUsersActivityLogDetailsDelete.input";
import { ActivityLogDetailsService } from "../../../services/ActivityLogDetails.service";
import { UserRole } from "@bundles/AppBundle/collections";

export default {
  Mutation: {
    EndUsersActivityLogDetailsDelete: [
      X.CheckLoggedIn(),
      X.CheckPermission(UserRole.END_USER),
      X.ToModel(EndUsersActivityLogDetailsDeleteInput),
      X.Validate(),
      X.ToService(ActivityLogDetailsService, "delete"),
    ],
  },
} as IResolverMap;
