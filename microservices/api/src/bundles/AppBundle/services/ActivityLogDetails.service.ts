import {
  Service,
  Inject,
  EventManager,
  ContainerInstance,
} from "@bluelibs/core";
import { ObjectId } from "@bluelibs/ejson";
import {
  ActivityLogDetailsCollection,
  ActivityNotesCollection,
  ActivityTimingsCollection,
} from "../collections";
import { EndUserService } from "./EndUser.service";
import { EndUsersActivityLogDetailsCreateInput } from "./inputs";
import { SecurityService } from "./Security.service";

@Service()
export class ActivityLogDetailsService {
  constructor(protected readonly container: ContainerInstance) {}

  @Inject()
  private activityLogDetailsCollection: ActivityLogDetailsCollection;

  @Inject()
  private activityTimingsCollection: ActivityTimingsCollection;

  @Inject()
  private activityNotesCollection: ActivityNotesCollection;

  @Inject()
  private securityService: SecurityService;

  @Inject()
  private endUserService: EndUserService;

  public async create(
    input: EndUsersActivityLogDetailsCreateInput,
    userId: ObjectId
  ) {
    const { activityLogId, startedAt, finishedAt } = input;

    const endUserId = await this.endUserService.getIdByOwnerId(userId);

    await this.securityService.activityLogs.checkEndUserOwnsActivityLog(
      activityLogId,
      endUserId
    );

    this.securityService.date.checkDatesAreInChronologicalOrder(
      startedAt,
      finishedAt
    );

    const activityTimingsInsertResponse =
      await this.activityTimingsCollection.insertOne({
        name: "random", // TODO: we should delete this
        startedAt,
        finishedAt,
        activityLogId,
        endUserId,
      });

    const activityNoteInsertResponse =
      await this.activityNotesCollection.insertOne(
        {
          value: JSON.stringify({}),
          activityLogId,
          endUserId,
        },
        {
          context: { userId },
        }
      );

    const { insertedId } = await this.activityLogDetailsCollection.insertOne(
      {
        timingId: activityTimingsInsertResponse.insertedId,
        noteId: activityNoteInsertResponse.insertedId,
        activityLogId,
        endUserId,
      },
      { context: { userId } }
    );

    return insertedId;
  }
}
