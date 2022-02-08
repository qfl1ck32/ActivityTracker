import * as X from "@bluelibs/x-bundle";
import { IResolverMap } from "@bluelibs/graphql-bundle";

import { EndUsersUpdateProfileInput } from "../../../services/inputs/EndUsersUpdateProfile.input";
import { EndUserService } from "../../../services/EndUser.service";
import { UserRole } from "@bundles/AppBundle/collections";

export default {
  Mutation: {
    EndUsersUpdateProfile: [
      X.CheckLoggedIn(),
      X.CheckPermission(UserRole.END_USER),
      X.ToModel(EndUsersUpdateProfileInput),
      X.Validate(),
      X.ToService(EndUserService, "updateProfile"),
    ],
  },
} as IResolverMap;
