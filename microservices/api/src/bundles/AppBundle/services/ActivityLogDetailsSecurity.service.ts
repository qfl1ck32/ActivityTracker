import { ContainerInstance, Inject, Service } from "@bluelibs/core";
import { ObjectId } from "@bluelibs/ejson";
import {
  ActivityLogDetailsCollection,
  ActivityLogsCollection,
  ActivityTimingsCollection,
} from "../collections";
import { EndUserDoesNotOwnActivityLogDetailsException } from "../exceptions";
import { ActivityLogDetailsTimingHasAlreadyBeenFinishedException } from "../exceptions/ActivityLogDetailsTimingHasAlreadyBeenFinished.exception";
import { ActivityNotesSecurityService } from "./ActivityNotesSecurity.service";
import { EndUsersActivityLogDetailsCreateInput } from "./inputs";

@Service()
export class ActivityLogDetailsSecurityService {
  constructor(protected readonly container: ContainerInstance) {}

  @Inject()
  private activityLogDetailsCollection: ActivityLogDetailsCollection;

  @Inject()
  private activityNotesSecurityService: ActivityNotesSecurityService;

  @Inject()
  private activityTimingsCollection: ActivityTimingsCollection;

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

  public async checkActivityLogDetailIsNotFinished(
    activityLogDetailsId: ObjectId
  ) {
    const numberOfActivityLogDetailsByIdAndFinishedAtTruthy =
      await this.activityTimingsCollection.count({
        activityLogDetailsId,

        finishedAt: {
          $nin: [null, undefined],
        },
      });

    if (numberOfActivityLogDetailsByIdAndFinishedAtTruthy) {
      throw new ActivityLogDetailsTimingHasAlreadyBeenFinishedException();
    }
  }
}
