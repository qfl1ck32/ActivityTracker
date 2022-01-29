import * as X from "@bluelibs/x-bundle";
import { IResolverMap } from "@bluelibs/graphql-bundle";

import { EndUsersActivityLogsCreateInput } from "../../../services/inputs/EndUsersActivityLogsCreate.input";
import { ActivityLogsService } from "../../../services/ActivityLogs.service";

export default {
  Mutation: {
    EndUsersActivityLogsCreate: [
      X.CheckLoggedIn(),
      X.CheckPermission(["ADMIN"]),
      X.ToModel(EndUsersActivityLogsCreateInput),
      X.Validate(),
      X.ToService(ActivityLogsService, "create"),
    ],
  },
} as IResolverMap;
