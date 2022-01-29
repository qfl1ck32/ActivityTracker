import * as X from "@bluelibs/x-bundle";
import { IResolverMap } from "@bluelibs/graphql-bundle";

import { EndUsersRegisterInput } from "../../../services/inputs/EndUsersRegister.input";
import { EndUserService } from "../../../services/EndUser.service";

export default {
  Mutation: {
    EndUsersRegister: [
      X.ToModel(EndUsersRegisterInput),
      X.Validate(),
      X.ToService(EndUserService, "register"),
    ],
  },
} as IResolverMap;
