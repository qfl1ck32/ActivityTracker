import { ContainerInstance, Inject, Service } from "@bluelibs/core";
import { ObjectId } from "@bluelibs/ejson";
import {
  ActivityLogDetailsCollection,
  ActivityLogsCollection,
} from "../collections";
import { EndUserDoesNotOwnActivityLogDetailsException } from "../exceptions";
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
  private activityLogsCollection: ActivityLogsCollection;

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
