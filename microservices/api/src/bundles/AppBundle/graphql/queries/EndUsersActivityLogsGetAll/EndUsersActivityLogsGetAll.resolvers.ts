import * as X from "@bluelibs/x-bundle";
import { IResolverMap } from "@bluelibs/graphql-bundle";

import { ActivityLogsService } from "../../../services/ActivityLogs.service";

export default {
  Query: {
    EndUsersActivityLogsGetAll: [
      X.CheckLoggedIn(),
      X.CheckPermission(["ADMIN"]),
      X.ToService(ActivityLogsService, "getAll", (_, ctx) => [ctx.userId]),
    ],
  },
} as IResolverMap;
