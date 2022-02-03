import {
  Service,
  Inject,
  EventManager,
  ContainerInstance,
} from "@bluelibs/core";
import { EJSON, ObjectId } from "@bluelibs/ejson";
import {
  ActivityLogsCollection,
  ActivityNotesCollection,
  Field,
} from "../collections";
import { EndUserService } from "./EndUser.service";
import { EndUsersActivityNotesUpdateInput } from "./inputs";
import { SecurityService } from "./Security.service";

@Service()
export class ActivityNotesService {
  constructor(protected readonly container: ContainerInstance) {}

  @Inject()
  private activityNotesCollection: ActivityNotesCollection;

  @Inject()
  private activityLogsCollection: ActivityLogsCollection;

  // FIXME: why doesn't it work without (() => ...) ?
  @Inject(() => SecurityService)
  private securityService: SecurityService;

  @Inject()
  private endUserService: EndUserService;

  public async update(
    input: EndUsersActivityNotesUpdateInput,
    userId: ObjectId
  ) {
    const { activityLogDetailsId, value } = input;

    const endUserId = await this.endUserService.getIdByOwnerId(userId);

    await this.securityService.activityLogDetails.checkEndUserOwnsActivityLogDetails(
      activityLogDetailsId,
      endUserId
    );

    await this.securityService.activityNotes.checkUpdateInputIsValid(input);

    await this.activityNotesCollection.updateOne(
      {
        activityLogDetailsId,
      },
      {
        $set: {
          value,
        },
      },
      {
        context: { userId },
      }
    );
  }

  public async syncWithNewFields(noteModelId: ObjectId) {
    const activityLogs = await this.activityLogsCollection.query({
      $: {
        filters: {
          noteModelId,
        },
      },

      details: {
        note: {
          _id: 1,
          value: 1,
        },
      },
    });

    const activityNotesThatNeedUpdate = activityLogs.flatMap((log) =>
      log.details.map((detail) => detail.note)
    );

    for (const activityNote of activityNotesThatNeedUpdate) {
      const { _id, value } = activityNote;

      const parsedValue = EJSON.parse(value);

      // TODO: to be done
    }
  }
}
