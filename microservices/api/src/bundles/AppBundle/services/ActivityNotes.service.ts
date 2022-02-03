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

    // TODO: this looks HARSH. Maybe... an... improvement?...
    for (const activityNote of activityNotesThatNeedUpdate) {
      const { _id, value } = activityNote;

      const parsedValue = EJSON.parse(value) as Record<string, any>;

      const newValue = {};

      // TODO: if it's an enum, check if we need to remove the value, or to update them. :)
      for (const fieldName of Object.keys(parsedValue)) {
        const oldFieldByName = oldFieldsByName[fieldName];

        const newField = newFieldsById[oldFieldByName.id];

        let newFieldName = "";

        // the name has been changed
        if (newField) {
          newFieldName = newField.name;
        } else {
          // the field didn't change
          // but it was deleted
          if (newFieldsById[oldFieldByName.id]) {
            newFieldName = fieldName;
          }
        }

        if (!newFieldName) continue; // the field was removed, so we also remove the value in the note

        newValue[newFieldName] = parsedValue[fieldName];

        // TODO: doesn't work if we change field types. but I don't think we should ALLOW that. :)
        if (oldFieldByName.type === FieldType.ENUM) {
          if (!newField) break;

          // TODO: these are kinda recalculated for every field. but is it better than calculating them for every field, from the beginning?

          const oldEnumValuesByName = {} as Record<string, FieldEnumValues>;
          const newEnumValuesByName = {} as Record<string, FieldEnumValues>;

          const oldEnumValuesById = {} as Record<string, FieldEnumValues>;
          const newEnumValuesById = {} as Record<string, FieldEnumValues>;

          for (const enumValue of oldFieldByName.enumValues) {
            oldEnumValuesById[enumValue.id] = enumValue;
            oldEnumValuesByName[enumValue.value] = enumValue;
          }

          for (const enumValue of newField.enumValues) {
            newEnumValuesById[enumValue.id] = enumValue;
            newEnumValuesByName[enumValue.value] = enumValue;
          }

          const fieldValue = newValue[newFieldName];

          const newEnumValue =
            newEnumValuesById[oldEnumValuesByName[fieldValue].id];

          if (!newEnumValue) {
            // the field has been deleted!
            delete newValue[newFieldName];
            break;
          }

          newValue[newFieldName] = newEnumValue.value;
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
