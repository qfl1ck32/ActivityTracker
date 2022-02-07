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
  FieldEnumValues,
  FieldType,
  NoteModelsCollection,
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

  @Inject()
  private noteModelsCollection: NoteModelsCollection;

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

    return this.activityNotesCollection.queryOne({
      $: {
        filters: {
          activityLogDetailsId,
        },
      },

      activityLogDetailsId: 1,
      value: 1,
    });
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

    const { fields } = await this.noteModelsCollection.findOne({
      _id: noteModelId,
    });

    const activityNotesThatNeedUpdate = activityLogs.flatMap((log) =>
      log.details.map((detail) => detail.note)
    );

    const fieldsIds = {} as Record<string, Field>;
    const fieldsEnumValuesIdsByFieldId = {} as Record<
      string,
      Record<string, boolean>
    >;

    for (const field of fields) {
      fieldsIds[field.id] = field;

      fieldsEnumValuesIdsByFieldId[field.id] = {};

      for (const enumValue of field.enumValues) {
        fieldsEnumValuesIdsByFieldId[field.id][enumValue.id] = true;
      }
    }

    for (const activityNote of activityNotesThatNeedUpdate) {
      const { _id } = activityNote;

      const value = EJSON.parse(activityNote.value) as Record<string, any>;

      for (const key in value) {
        const field = fieldsIds[key];

        if (!field) {
          delete value[key];

          continue;
        }

        const fieldValue = value[key];

        if (field.type === FieldType.ENUM) {
          if (!fieldsEnumValuesIdsByFieldId[field.id][fieldValue]) {
            delete value[key];
          }
        }
      }

      await this.activityNotesCollection.updateOne(
        {
          _id,
        },
        {
          $set: {
            value: EJSON.stringify(value),
          },
        }
      );
    }
  }
}
