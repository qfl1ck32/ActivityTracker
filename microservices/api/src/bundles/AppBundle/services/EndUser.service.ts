import {
  Service,
  Inject,
  EventManager,
  ContainerInstance,
} from "@bluelibs/core";
import { ObjectId } from "@bluelibs/ejson";
import { PermissionService } from "@bluelibs/security-bundle";
import { XPasswordService } from "@bluelibs/x-password-bundle";
import { pickBy } from "lodash";
import { UserService } from ".";
import { EndUsersCollection, UserRole, UsersCollection } from "../collections";
import { PermissionDomain } from "../permissions";
import { EndUsersRegisterInput } from "./inputs/EndUsersRegister.input";
import { EndUsersUpdateProfileInput } from "./inputs/EndUsersUpdateProfile.input";

@Service()
export class EndUserService {
  constructor(protected readonly container: ContainerInstance) {}

  @Inject()
  private xPasswordService: XPasswordService;

  @Inject()
  private endUsersCollection: EndUsersCollection;

  @Inject()
  private permissionService: PermissionService;

  @Inject()
  private userService: UserService;

  public async register(input: EndUsersRegisterInput) {
    const { userId } = await this.xPasswordService.register(input);

    await this.permissionService.add({
      domain: PermissionDomain.APP,
      userId,
      permission: UserRole.END_USER,
    });

    await this.endUsersCollection.insertOne(
      {
        ...input,
        ownerId: userId as ObjectId,
      },
      {
        context: {
          userId,
        },
      }
    );
  }

  public async getIdByOwnerId(ownerId: ObjectId) {
    const endUser = await this.endUsersCollection.findOne({ ownerId });

    return endUser._id;
  }

  public async updateProfile(
    input: EndUsersUpdateProfileInput,
    userId: ObjectId
  ) {
    const endUserId = await this.getIdByOwnerId(userId);

    const fieldsToUpdate = pickBy(input, Boolean);

    const { firstName, lastName } = fieldsToUpdate;

    await this.endUsersCollection.updateOne(
      {
        _id: endUserId,
      },
      {
        $set: fieldsToUpdate,
      }
    );

    await this.userService.updateProfile(
      {
        firstName,
        lastName,
      },
      userId
    );

    return this.endUsersCollection.findOne({ _id: endUserId });
  }
}
