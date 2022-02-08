import {
  Service,
  Inject,
  EventManager,
  ContainerInstance,
} from "@bluelibs/core";
import { AvatarService } from "@bundles/AvatarBundle/services/Avatar.service";
import { pickBy } from "lodash";
import { ObjectId } from "mongodb";
import { UsersCollection } from "../collections";
import { UsersUploadAvatarInput } from "./inputs";
import { UserProfileInput } from "./inputs/UserInsert.input.base";

@Service()
export class UserService {
  constructor(protected readonly container: ContainerInstance) {}

  @Inject()
  private avatarService: AvatarService;

  @Inject()
  private usersCollection: UsersCollection;

  public async uploadAvatar(input: UsersUploadAvatarInput, userId: ObjectId) {
    const { avatar } = input;

    return this.avatarService.uploadAvatar({
      collection: UsersCollection,
      avatar,
      avatarIdField: "avatarId",

      documentFilter: {
        _id: userId,
      },

      userId,
    });
  }

  public async updateProfile(profile: UserProfileInput, userId: ObjectId) {
    const fieldsToUpdate = pickBy(profile, Boolean);

    await this.usersCollection.updateOne(
      {
        _id: userId,
      },
      {
        $set: fieldsToUpdate,
      }
    );
  }
}
