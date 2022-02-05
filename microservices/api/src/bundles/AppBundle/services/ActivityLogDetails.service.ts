import { ContainerInstance, Inject, Service } from "@bluelibs/core";
import { ObjectId } from "@bluelibs/ejson";
import { IExecutionContext } from "@bluelibs/mongo-bundle";
import { QueryBodyType } from "@bluelibs/nova";
import {
  ActivityLogDetail,
  ActivityLogDetailsCollection,
  ActivityNotesCollection,
  ActivityTimingsCollection,
} from "../collections";
import { EndUserService } from "./EndUser.service";
import { EndUsersActivityLogDetailsCreateInput } from "./inputs";
import { EndUsersActivityLogDetailsFinishInput } from "./inputs/EndUsersActivityLogDetailsFinish.input";
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

        isFinished: 1,
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

          startedAt: new Date(), // TODO:is it good?
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

  public async finish(
    input: EndUsersActivityLogDetailsFinishInput,
    userId: ObjectId
  ) {
    const { activityLogDetailsId } = input;

    const endUserId = await this.endUserService.getIdByOwnerId(userId);

    await this.securityService.activityLogDetails.checkEndUserOwnsActivityLogDetails(
      activityLogDetailsId,
      endUserId
    );

    await this.securityService.activityLogDetails.checkActivityLogDetailIsNotFinished(
      activityLogDetailsId
    );

    await this.activityTimingsCollection.updateOne(
      {
        activityLogDetailsId,
      },
      {
        $set: {
          finishedAt: new Date(), // TODO: good??
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
