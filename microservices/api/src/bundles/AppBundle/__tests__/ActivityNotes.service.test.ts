import { EJSON } from "@bluelibs/ejson";
import { container } from "../../../__tests__/ecosystem";
import { FieldType, NoteModelsCollection } from "../collections";
import {
  FieldNameIsNotDefinedInNoteModelException,
  FieldValueIsNotValidException,
} from "../exceptions";
import { ActivityNotesService } from "../services/ActivityNotes.service";
import { FieldCreateInput, FieldInput } from "../services/inputs";
import {
  createActivity,
  createActivityLog,
  createActivityLogDetails,
  createEndUser,
  createNoteModel,
  getActivityNoteByActivityLogDetailId,
  getNoteModelById,
  updateActivityNote,
} from "./utilities";

// Jest Setup & Teardown: https://jestjs.io/docs/en/setup-teardown
// API: https://jestjs.io/docs/en/api
// Expect: https://jestjs.io/docs/en/expect

describe("ActivityNotesService", () => {
  test("update()", async () => {
    const activityNotesService = container.get(ActivityNotesService);

    const { userId } = await createEndUser();

    const activityId = await createActivity();

    const noteModelId = await createNoteModel(
      {
        name: "my note model",
        fields: [
          {
            name: "How it went?",
            type: FieldType.ENUM,
            isArray: false,

            enumValues: ["GREAT", "EXCELLENT"],
          },
          {
            name: "How many reps?",
            type: FieldType.NUMBER,
            isArray: false,
            enumValues: [],
          },
          {
            name: "Did you rest?",
            type: FieldType.BOOLEAN,
            isArray: false,
            enumValues: [],
          },
        ],
      },
      userId
    );

    const { fields } = await getNoteModelById(noteModelId);

    const activityLogId = await createActivityLog(
      {
        activityId,
        noteModelId,
      },
      userId
    );

    const activityLogDetailId = await createActivityLogDetails(
      {
        activityLogId,
      },
      userId
    );

    const value = EJSON.stringify({
      [fields[0].id]: fields[0].enumValues[1].id,
      [fields[1].id]: 10,
      [fields[2].id]: false,
    });

    await activityNotesService.update(
      {
        activityLogDetailId,
        value,
      },
      userId
    );

    const activityNote = await getActivityNoteByActivityLogDetailId(
      activityLogDetailId
    );

    expect(activityNote.value).toBe(value);

    await expect(
      activityNotesService.update(
        {
          activityLogDetailId,
          value: EJSON.stringify({
            [fields[0].id]: "Wrong id",
          }),
        },
        userId
      )
    ).rejects.toThrow(
      new FieldValueIsNotValidException({ fieldName: "How it went?" })
    );

    await expect(
      activityNotesService.update(
        {
          activityLogDetailId,
          value: EJSON.stringify({
            "inexisting-field": "Wrong id",
          }),
        },
        userId
      )
    ).rejects.toThrow(
      new FieldNameIsNotDefinedInNoteModelException({
        fieldName: "inexisting-field",
      })
    );
  });

  test("syncWithNewFields()", async () => {
    const activityNotesService = container.get(ActivityNotesService);

    const noteModelsCollection = container.get(NoteModelsCollection);

    const { userId } = await createEndUser();

    const activityId = await createActivity();

    const inputFields = [
      {
        name: "test",
        type: FieldType.ENUM,

        enumValues: ["YES", "NO"],
      },
      {
        name: "test2",
        type: FieldType.BOOLEAN,
        enumValues: [],
      },
    ] as FieldCreateInput[];

    const noteModelId = await createNoteModel(
      {
        name: "my note model",
        fields: inputFields,
      },
      userId
    );

    const { fields } = await getNoteModelById(noteModelId);

    const activityLogId = await createActivityLog(
      {
        activityId,
        noteModelId,
      },
      userId
    );

    const enumValueFieldId = fields[0].id;
    const enumValueFieldEnumValueId = fields[0].enumValues[0].id;

    const activityLogDetailId = await createActivityLogDetails(
      {
        activityLogId,
      },
      userId
    );

    await updateActivityNote(
      {
        activityLogDetailId,
        value: JSON.stringify({
          [enumValueFieldId]: enumValueFieldEnumValueId,

          [fields[1].id]: true,
        }),
      },
      userId
    );

    // simulate removing the enum value that was not used
    fields[0].enumValues.pop();

    await noteModelsCollection.updateOne(
      {
        _id: noteModelId,
      },
      {
        $set: {
          fields,
        },
      }
    );

    await activityNotesService.syncWithNewFields(noteModelId);

    let note = await getActivityNoteByActivityLogDetailId(activityLogDetailId);

    let value = EJSON.parse(note.value);

    expect(enumValueFieldId in value).toBeTruthy();

    // simulate removing the enum value that was used
    fields[0].enumValues.pop();

    // because in reality you can't have 0 enum values
    fields[0].enumValues.push({ id: "new", value: "nobody-cares" });

    await noteModelsCollection.updateOne(
      {
        _id: noteModelId,
      },
      {
        $set: {
          fields,
        },
      }
    );

    await activityNotesService.syncWithNewFields(noteModelId);

    note = await getActivityNoteByActivityLogDetailId(activityLogDetailId);

    value = EJSON.parse(note.value);

    expect(enumValueFieldId in value).toBeFalsy();

    // simulate removing a field
    fields.pop();
    await noteModelsCollection.updateOne(
      {
        _id: noteModelId,
      },
      {
        $set: {
          fields,
        },
      }
    );

    await activityNotesService.syncWithNewFields(noteModelId);

    note = await getActivityNoteByActivityLogDetailId(activityLogDetailId);

    value = EJSON.parse(note.value);

    expect(value).toStrictEqual({});
  });
});
