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
    const { activityLogId } = input;

    const endUserId = await this.endUserService.getIdByOwnerId(userId);

    await this.securityService.activityLogs.checkEndUserOwnsActivityLog(
      activityLogId,
      endUserId
    );

    const activityTimingsInsertResponse =
      await this.activityTimingsCollection.insertOne({
        name: "random", // TODO: we should delete this
        activityLogId,
        endUserId,
      });

    const activityNoteInsertResponse =
      await this.activityNotesCollection.insertOne({
        value: JSON.stringify({}),
        activityLogId,
        endUserId,
      });

    const { insertedId } = await this.activityLogDetailsCollection.insertOne({
      timingId: activityTimingsInsertResponse.insertedId,
      notesId: activityNoteInsertResponse.insertedId,
      activityLogId,
    });
  }
}
