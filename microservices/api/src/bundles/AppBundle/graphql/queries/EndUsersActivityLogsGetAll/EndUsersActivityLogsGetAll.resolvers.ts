import * as X from "@bluelibs/x-bundle";
import { IResolverMap } from "@bluelibs/graphql-bundle";

import { ActivityLogsService } from "../../../services/ActivityLogs.service";
import { UserRole } from "../../../collections";

export default {
  Query: {
    EndUsersActivityLogsGetAll: [
      X.CheckLoggedIn(),
      X.CheckPermission(UserRole.END_USER),
      X.ToService(ActivityLogsService, "getAll", (_, ctx) => [ctx.userId]),
    ],
  },
} as IResolverMap;
