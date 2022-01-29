import {
  Service,
  Inject,
  EventManager,
  ContainerInstance,
} from "@bluelibs/core";
import { ObjectId } from "@bluelibs/ejson";
import { XPasswordService } from "@bluelibs/x-password-bundle";
import { EndUsersCollection, UsersCollection } from "../collections";
import { EndUsersRegisterInput } from "./inputs/EndUsersRegister.input";

@Service()
export class EndUserService {
  constructor(protected readonly container: ContainerInstance) {}

  @Inject()
  private xPasswordService: XPasswordService;

  @Inject()
  private endUsersCollection: EndUsersCollection;

  public async register(input: EndUsersRegisterInput) {
    const { userId } = await this.xPasswordService.register(input);

    await this.endUsersCollection.insertOne({
      ...input,
      ownerId: userId as ObjectId,
    });
  }

  public async getIdByOwnerId(ownerId: ObjectId) {
    const endUser = await this.endUsersCollection.findOne({ ownerId });

    return endUser._id;
  }
}
