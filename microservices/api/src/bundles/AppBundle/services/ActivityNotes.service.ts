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
  }

  public async syncWithNewFields(
    oldFields: Field[],
    newFields: Field[],
    noteModelId: ObjectId
  ) {
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

    const oldFieldsByName = {} as Record<string, Field>;
    const newFieldsByName = {} as Record<string, Field>;

    const newFieldsById = {} as Record<string, Field>;

    for (const field of oldFields) {
      oldFieldsByName[field.name] = field;
    }

    for (const field of newFields) {
      newFieldsByName[field.name] = field;
      newFieldsById[field.id] = field;
    }

    for (const activityNote of activityNotesThatNeedUpdate) {
      const { _id, value } = activityNote;

      const parsedValue = EJSON.parse(value) as Record<string, any>;

      const newValue = {};

      // TODO: if it's an enum, check if we need to remove the value, or to update them. :)
      for (const fieldName of Object.keys(parsedValue)) {
        const oldFieldByName = oldFieldsByName[fieldName];

        const newField = newFieldsById[oldFieldByName.id];

        // TODO: doesn't work if we change field types. but I don't think we should ALLOW that. :)
        const fieldType = oldFieldByName.type;

        // the name has been changed
        if (newField) {
          newValue[newField.name] = parsedValue[fieldName];
        } else {
          // the field didn't change
          // but it was deleted
          if (newFieldsById[oldFieldByName.id]) {
            newValue[fieldName] = parsedValue[fieldName];
          }
        }

        if (fieldType === FieldType.ENUM) {
          if (newField) {
            for (const enumValue of oldFieldByName.enumValues) {
              console.log(enumValue);
            }
          }
        }
      }

      await this.activityNotesCollection.updateOne(
        {
          _id,
        },
        {
          $set: {
            value: EJSON.stringify(newValue),
          },
        }
      );
    }
  }
}
