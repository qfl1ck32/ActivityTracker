import * as X from "@bluelibs/x-bundle";
import { IResolverMap } from "@bluelibs/graphql-bundle";

import { EndUsersActivityLogsCreateInput } from "../../../services/inputs/EndUsersActivityLogsCreate.input";
import { ActivityLogsService } from "../../../services/ActivityLogs.service";
import { UserRole } from "../../../collections";

export default {
  Mutation: {
    EndUsersActivityLogsCreate: [
      X.CheckLoggedIn(),
      X.CheckPermission(UserRole.END_USER),
      X.ToModel(EndUsersActivityLogsCreateInput),
      X.Validate(),
      X.ToService(ActivityLogsService, "create"),
    ],
  },
} as IResolverMap;
