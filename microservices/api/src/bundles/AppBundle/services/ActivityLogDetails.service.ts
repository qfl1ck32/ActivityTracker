import {
  Service,
  Inject,
  EventManager,
  ContainerInstance,
} from "@bluelibs/core";
import { ObjectId } from "@bluelibs/ejson";
import { QuerySubBodyType, QueryBodyType } from "@bluelibs/nova";
import {
  ActivityLogDetail,
  ActivityLogDetailsCollection,
  ActivityNotesCollection,
  ActivityTimingsCollection,
} from "../collections";
import { EndUserService } from "./EndUser.service";
import { EndUsersActivityLogDetailsCreateInput } from "./inputs";
import { SecurityService } from "./Security.service";

@Service()
export class ActivityLogDetailsService {
  constructor(protected readonly container: ContainerInstance) {
    this.queryBody = {
      name: 1,

      note: {
        _id: 1,

        value: 1,
      },

      timing: {
        _id: 1,

        startedAt: 1,
        finishedAt: 1,
      },

      createdAt: 1,
    };
  }

  public queryBody: QueryBodyType<ActivityLogDetail>;

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
    const { activityLogId, startedAt, finishedAt, noteDetailsValue } = input;

    const endUserId = await this.endUserService.getIdByOwnerId(userId);

    await this.securityService.activityLogs.checkEndUserOwnsActivityLog(
      activityLogId,
      endUserId
    );

    this.securityService.date.checkDatesAreInChronologicalOrder(
      startedAt,
      finishedAt
    );

    if (noteDetailsValue) {
      await this.securityService.activityLogDetails.checkCreateInputIsValid(
        input
      );
    }

    const activityTimingsInsertResponse =
      await this.activityTimingsCollection.insertOne(
        {
          name: "random", // TODO: we should delete this
          startedAt,
          finishedAt,
          endUserId,
        },
        {
          context: { userId },
        }
      );

    const activityNoteInsertResponse =
      await this.activityNotesCollection.insertOne(
        {
          value: JSON.stringify(noteDetailsValue || {}),
          endUserId,
        },
        {
          context: { userId },
        }
      );

    const { insertedId: activityLogDetailsId } =
      await this.activityLogDetailsCollection.insertOne(
        {
          name: "random", // TODO: remove as well
          timingId: activityTimingsInsertResponse.insertedId,
          noteId: activityNoteInsertResponse.insertedId,
          activityLogId,
          endUserId,
        },
        { context: { userId } }
      );

    await this.activityTimingsCollection.updateOne(
      {
        _id: activityTimingsInsertResponse.insertedId,
      },
      {
        $set: {
          activityLogDetailsId,
        },
      }
    );

    await this.activityNotesCollection.updateOne(
      {
        _id: activityNoteInsertResponse.insertedId,
      },
      {
        $set: {
          activityLogDetailsId,
        },
      }
    );

    return this.activityLogDetailsCollection.queryOne({
      $: {
        filters: {
          _id: activityLogDetailsId,
        },
      },

      ...this.queryBody,
    });
  }
}
