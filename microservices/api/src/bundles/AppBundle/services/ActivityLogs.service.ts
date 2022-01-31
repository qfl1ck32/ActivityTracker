import {
  Service,
  Inject,
  EventManager,
  ContainerInstance,
} from "@bluelibs/core";
import { ObjectId } from "@bluelibs/ejson";
import { QueryBodyType } from "@bluelibs/nova";
import { ActivityLog, ActivityLogsCollection } from "../collections";
import { EndUserService } from "./EndUser.service";
import { EndUsersActivityLogsCreateInput } from "./inputs/EndUsersActivityLogsCreate.input";
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
}
