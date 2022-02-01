import * as X from "@bluelibs/x-bundle";
import { IResolverMap } from "@bluelibs/graphql-bundle";

import { EndUsersActivityLogsGetOneInput } from "../../../services/inputs/EndUsersActivityLogsGetOne.input";
import { ActivityLogsService } from "../../../services/ActivityLogs.service";
import { UserRole } from "@bundles/AppBundle/collections";

export default {
  Query: {
    EndUsersActivityLogsGetOne: [
      X.CheckLoggedIn(),
      X.CheckPermission(UserRole.END_USER),
      X.ToModel(EndUsersActivityLogsGetOneInput),
      X.Validate(),
      X.ToService(ActivityLogsService, "getOne"),
    ],
  },
} as IResolverMap;
