import {
  Service,
  Inject,
  EventManager,
  ContainerInstance,
} from "@bluelibs/core";
import { ObjectId } from "@bluelibs/ejson";
import { QueryBodyType } from "@bluelibs/nova";
import { ActivityLogDetailsService } from ".";
import { ActivityLog, ActivityLogsCollection } from "../collections";
import { EndUserService } from "./EndUser.service";
import { EndUsersActivityLogsCreateInput } from "./inputs/EndUsersActivityLogsCreate.input";
import { EndUsersActivityLogsGetOneInput } from "./inputs/EndUsersActivityLogsGetOne.input";
import { SecurityService } from "./Security.service";

@Service()
export class ActivityLogsService {
  constructor(protected readonly container: ContainerInstance) {
    this.queryBody = {
      _id: 1,

      name: 1,

      activity: {
        name: 1,
      },

      noteModel: {
        name: 1,
      },

      createdAt: 1,
    };
  }

  private queryBody: QueryBodyType<ActivityLog>;

  // FIXME: why doesn't it work without (() => ...) ?
  @Inject(() => SecurityService)
  private securityService: SecurityService;

  @Inject()
  private activityLogsCollection: ActivityLogsCollection;

  @Inject()
  private endUserService: EndUserService;

  // FIXME: maybe it's a reasonable idea to have this query body parts somewhere else
  // rather than in all services. just one place, and use from there?
  @Inject(() => ActivityLogDetailsService)
  private activityLogDetailsService: ActivityLogDetailsService;

  public async create(
    input: EndUsersActivityLogsCreateInput,
    userId: ObjectId
  ) {
    const { name, activityId, noteModelId } = input;

    const endUserId = await this.endUserService.getIdByOwnerId(userId);

    await this.securityService.activityLogs.checkEndUserDoesNotHaveAnotherActivityLogForSameActivity(
      activityId,
      endUserId
    );

    await this.securityService.noteModels.checkEndUserOwnsNoteModel(
      noteModelId,
      endUserId
    );

    const { insertedId } = await this.activityLogsCollection.insertOne(
      {
        activityId,
        name,
        endUserId,
        noteModelId,
      },
      {
        context: { userId },
      }
    );

    return this.activityLogsCollection.queryOne({
      $: {
        filters: {
          _id: insertedId,
        },
      },

      ...this.queryBody,
    });
  }

  public async getAll(userId: ObjectId) {
    const endUserId = await this.endUserService.getIdByOwnerId(userId);

    return this.activityLogsCollection.query({
      $: {
        filters: {
          endUserId,
        },
      },

      ...this.queryBody,
    });
  }

  public async getOne(
    input: EndUsersActivityLogsGetOneInput,
    userId: ObjectId
  ) {
    const { activityLogId } = input;

    const endUserId = await this.endUserService.getIdByOwnerId(userId);

    await this.securityService.activityLogs.checkEndUserOwnsActivityLog(
      activityLogId,
      endUserId
    );

    return this.activityLogsCollection.queryOne({
      $: {
        filters: {
          _id: activityLogId,
        },
      },

      _id: 1,

      name: 1,

      activity: {
        name: 1,
      },

      noteModel: {
        fields: {
          id: 1,
          name: 1,
          type: 1,
          enumValues: {
            id: 1,
            value: 1,
          },
        },
      },

      details: {
        ...this.activityLogDetailsService.queryBody,
      },
    });
  }
}
