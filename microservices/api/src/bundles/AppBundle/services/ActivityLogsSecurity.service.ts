import {
  Service,
  Inject,
  EventManager,
  ContainerInstance,
} from "@bluelibs/core";
import { ObjectId } from "@bluelibs/ejson";
import { ActivityLogsCollection } from "../collections";
import { ActivityAlreadyDefinedException } from "../exceptions/ActivityAlreadyDefined.exception";

@Service()
export class ActivityLogsSecurityService {
  constructor(protected readonly container: ContainerInstance) {}

  @Inject()
  private activityLogsCollection: ActivityLogsCollection;

  public async checkEndUserDoesNotHaveAnotherActivityLogForSameActivity(
    activityId: ObjectId,
    endUserId: ObjectId
  ) {
    const numberOfActivityLogsByActivityIdForEndUser =
      await this.activityLogsCollection.count({
        activityId,
        endUserId,
      });

    if (numberOfActivityLogsByActivityIdForEndUser > 0) {
      throw new ActivityAlreadyDefinedException();
    }
  }
}
