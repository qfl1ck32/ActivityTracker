import {
  Service,
  Inject,
  EventManager,
  ContainerInstance,
} from "@bluelibs/core";
import { EJSON, ObjectId } from "@bluelibs/ejson";
import { IExecutionContext } from "@bluelibs/mongo-bundle";
import { QuerySubBodyType, QueryBodyType } from "@bluelibs/nova";
import {
  ActivityLog,
  ActivityLogDetail,
  ActivityLogDetailsCollection,
  ActivityLogsCollection,
  ActivityNotesCollection,
  ActivityTimingsCollection,
  Field,
  FieldEnumValues,
  FieldType,
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

  @Inject()
  private activityLogsCollection: ActivityLogsCollection;

  public async create(
    input: EndUsersActivityLogDetailsCreateInput,
    userId: ObjectId
  ) {
    const { activityLogId } = input;

    const endUserId = await this.endUserService.getIdByOwnerId(userId);

    await this.securityService.activityLogs.checkEndUserOwnsActivityLog(
      activityLogId,
      endUserId
    );

    const activityTimingsInsertResponse =
      await this.activityTimingsCollection.insertOne(
        {
          name: "random", // TODO: we should delete this
          endUserId,
        },
        {
          context: { userId } as IExecutionContext,
        }
      );

    const activityNoteInsertResponse =
      await this.activityNotesCollection.insertOne(
        {
          value: "{}",
          endUserId,
        },
        {
          context: { userId } as IExecutionContext,
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
        { context: { userId } as IExecutionContext }
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

  // public async finish()
}
