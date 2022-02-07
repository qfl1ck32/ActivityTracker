import * as X from "@bluelibs/x-bundle";
import { IResolverMap } from "@bluelibs/graphql-bundle";

import { ActivityLogDetailsService } from "../../../services/ActivityLogDetails.service";
import { UserRole } from "@bundles/AppBundle/collections";

export default {
  Query: {
    EndUsersActivityLogDetailsGetUnfinished: [
      X.CheckLoggedIn(),
      X.CheckPermission(UserRole.END_USER),
      X.ToService(ActivityLogDetailsService, "getUnfinished", (_, ctx) => [
        ctx.userId,
      ]),
    ],
  },
} as IResolverMap;
