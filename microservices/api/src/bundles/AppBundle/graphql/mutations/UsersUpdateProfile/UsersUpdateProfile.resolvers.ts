import * as X from "@bluelibs/x-bundle";
import { IResolverMap } from "@bluelibs/graphql-bundle";

import { UsersUpdateProfileInput } from "../../../services/inputs/UsersUpdateProfile.input";
import { UserService } from "../../../services/User.service";

export default {
  Mutation: {
    UsersUpdateProfile: [
      X.CheckLoggedIn(),
      X.ToModel(UsersUpdateProfileInput),
      X.Validate(),
      X.ToService(UserService, "updateProfile"),
    ],
  },
} as IResolverMap;
