import * as X from "@bluelibs/x-bundle";
import { IResolverMap } from "@bluelibs/graphql-bundle";

import { UsersUploadAvatarInput } from "../../../services/inputs/UsersUploadAvatar.input";
import { UserService } from "../../../services/User.service";

export default {
  Mutation: {
    UsersUploadAvatar: [
      X.CheckLoggedIn(),
      X.ToModel(UsersUploadAvatarInput),
      X.Validate(),
      X.ToService(UserService, "uploadAvatar"),
    ],
  },
} as IResolverMap;
