import {
  Service,
  Inject,
  EventManager,
  ContainerInstance,
} from "@bluelibs/core";
import { AvatarService } from "@bundles/AvatarBundle/services/Avatar.service";
import { pickBy } from "lodash";
import { ObjectId } from "mongodb";
import { SecurityService } from "./Security.service";
import { User, UsersCollection } from "../collections";
import { UsersUpdateProfileInput, UsersUploadAvatarInput } from "./inputs";
import { UserProfileUpdatedEvent } from "../events";

@Service()
export class UserService {
  constructor(protected readonly container: ContainerInstance) {}

  @Inject()
  private avatarService: AvatarService;

  @Inject()
  private usersCollection: UsersCollection;

  @Inject()
  private securityService: SecurityService;

  @Inject()
  private eventManager: EventManager;

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

  public async updateProfile(input: UsersUpdateProfileInput, userId: ObjectId) {
    const { email, firstName, lastName } = input;

    const $set = {} as Partial<User>;

    if (email) {
      await this.securityService.users.checkEmailIsNotTaken(email, userId);

      $set["password.email"] = email;
    }

    if (firstName) {
      $set["profile.firstName"] = firstName;
    }

    if (lastName) {
      $set["profile.lastName"] = lastName;
    }

    await this.usersCollection.updateOne(
      {
        _id: userId,
      },
      {
        $set,
      }
    );

    await this.eventManager.emit(
      new UserProfileUpdatedEvent({
        userId,
      })
    );
  }
}
