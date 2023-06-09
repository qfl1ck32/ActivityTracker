import { ContainerInstance, Inject, Service } from "@bluelibs/core";
import { ObjectId } from "@bluelibs/ejson";
import { ActivityLogsCollection } from "../collections";
import { EndUserDoesNotOwnActivityLogException } from "../exceptions";
import { ActivityLogAlreadyExistsForGivenActivityException } from "../exceptions/ActivityLogAlreadyExistsForGivenActivity.exception";

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
      throw new ActivityLogAlreadyExistsForGivenActivityException();
    }
  }

  public async checkEndUserOwnsActivityLog(
    activityLogId: ObjectId,
    endUserId: ObjectId
  ) {
    const numberOfActivityLogsByIdAndEndUserId =
      await this.activityLogsCollection.count({
        _id: activityLogId,
        endUserId,
      });

    if (numberOfActivityLogsByIdAndEndUserId === 0) {
      throw new EndUserDoesNotOwnActivityLogException();
    }
  }
}
