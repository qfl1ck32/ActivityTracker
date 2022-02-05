import * as X from "@bluelibs/x-bundle";
import { IResolverMap } from "@bluelibs/graphql-bundle";

import { EndUsersActivityLogDetailsFinishInput } from "../../../services/inputs/EndUsersActivityLogDetailsFinish.input";
import { ActivityLogDetailsService } from "../../../services/ActivityLogDetails.service";

export default {
  Mutation: {
    EndUsersActivityLogDetailsFinish: [
      X.CheckLoggedIn(),
      X.CheckPermission(["ADMIN"]),
      X.ToModel(EndUsersActivityLogDetailsFinishInput),
      X.Validate(),
      X.ToService(ActivityLogDetailsService, "finish"),
    ],
  },
} as IResolverMap;
