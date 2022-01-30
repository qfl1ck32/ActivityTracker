import {
  Service,
  Inject,
  EventManager,
  ContainerInstance,
} from "@bluelibs/core";
import { ObjectId } from "@bluelibs/ejson";
import { ActivityLogDetailsCollection } from "../collections";
import { EndUserDoesNotOwnActivityLogDetailsException } from "../exceptions";

@Service()
export class ActivityLogDetailsSecurityService {
  constructor(protected readonly container: ContainerInstance) {}

  @Inject()
  private activityLogDetailsCollection: ActivityLogDetailsCollection;

  public async checkEndUserOwnsActivityLogDetails(
    activityLogDetailsId: ObjectId,
    endUserId: ObjectId
  ) {
    const numberOfActivityLogDetailsByIdAndEndUserId =
      await this.activityLogDetailsCollection.count({
        _id: activityLogDetailsId,
        endUserId,
      });

    if (numberOfActivityLogDetailsByIdAndEndUserId === 0) {
      throw new EndUserDoesNotOwnActivityLogDetailsException();
    }
  }
}
