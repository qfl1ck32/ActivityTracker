import * as X from "@bluelibs/x-bundle";
import { IResolverMap } from "@bluelibs/graphql-bundle";

import { ActivityService } from "../../../services/Activity.service";
import { UserRole } from "@bundles/AppBundle/collections";

export default {
  Query: {
    EndUsersActivitiesGetAll: [
      X.CheckLoggedIn(),
      X.CheckPermission(UserRole.END_USER),
      X.ToService(ActivityService, "getAll", (_, ctx) => [ctx.userId]),
    ],
  },
} as IResolverMap;
