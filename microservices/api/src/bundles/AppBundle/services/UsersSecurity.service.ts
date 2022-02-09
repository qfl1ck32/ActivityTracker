import {
  Service,
  Inject,
  EventManager,
  ContainerInstance,
} from "@bluelibs/core";
import { ObjectId } from "@bluelibs/ejson";
import {
  PasswordService,
  UsernameAlreadyExistsException,
} from "@bluelibs/password-bundle";

@Service()
export class UsersSecurityService {
  constructor(protected readonly container: ContainerInstance) {}

  @Inject()
  private passwordService: PasswordService;

  public async checkEmailIsNotTaken(email: string, userId: ObjectId) {
    const foundUserId = await this.passwordService.findUserIdByUsername(email);

    if (foundUserId && !userId.equals(foundUserId as any)) {
      throw new UsernameAlreadyExistsException({
        username: email,
      });
    }
  }
}
