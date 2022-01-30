import {
  Service,
  Inject,
  EventManager,
  ContainerInstance,
} from "@bluelibs/core";
import { ObjectId } from "@bluelibs/ejson";
import { PermissionService } from "@bluelibs/security-bundle";
import { XPasswordService } from "@bluelibs/x-password-bundle";
import { EndUsersCollection, UserRole, UsersCollection } from "../collections";
import { PermissionDomain } from "../permissions";
import { EndUsersRegisterInput } from "./inputs/EndUsersRegister.input";

@Service()
export class EndUserService {
  constructor(protected readonly container: ContainerInstance) {}

  @Inject()
  private xPasswordService: XPasswordService;

  @Inject()
  private endUsersCollection: EndUsersCollection;

  @Inject()
  private permissionService: PermissionService;

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
}
