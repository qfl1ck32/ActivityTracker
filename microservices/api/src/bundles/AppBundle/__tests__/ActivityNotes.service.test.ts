import { ActivityNotesService } from "../services/ActivityNotes.service";
import { container } from "../../../__tests__/ecosystem";
import {
  createEndUser,
  createActivity,
  createNoteModel,
  createActivityLog,
  createActivityLogDetails,
  getActivityNoteByActivityLogDetailsId,
  getNoteModelById,
} from "./utilities";
import { FieldType, NoteModelsCollection } from "../collections";
import { EJSON } from "@bluelibs/ejson";
import { FieldInput } from "../services/inputs";

// TODO: import from /lodash-es/cloneDeep
import { cloneDeep } from "lodash";

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

            enumValues: ["GREAT", "EXCELLENT"],
          },
          {
            name: "How many reps?",
            type: FieldType.NUMBER,
          },
          {
            name: "Did you rest?",
            type: FieldType.BOOLEAN,
          },
        ],
      },
      userId
    );

    const activityLogId = await createActivityLog(
      {
        activityId,
        name: "my activity log",
        noteModelId,
      },
      userId
    );

    const activityLogDetailsId = await createActivityLogDetails(
      {
        activityLogId,
        startedAt: new Date(),
        finishedAt: new Date(),
      },
      userId
    );

    const value = EJSON.stringify({
      "How it went?": "EXCELLENT",
      "How many reps?": 10,
      "Did you rest?": false,
    });

    await activityNotesService.update(
      {
        activityLogDetailsId,
        value,
      },
      userId
    );

    const activityNote = await getActivityNoteByActivityLogDetailsId(
      activityLogDetailsId
    );

    expect(activityNote.value).toBe(value);
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
    ] as FieldInput[];

    const noteModelId = await createNoteModel(
      {
        name: "my note model",
        fields: inputFields,
      },
      userId
    );

    const { fields: oldFields } = await getNoteModelById(noteModelId);

    const activityLogId = await createActivityLog(
      {
        name: "Test",
        activityId,
        noteModelId,
      },
      userId
    );

    const activityLogDetailsId = await createActivityLogDetails(
      {
        activityLogId,
        noteDetailsValue: JSON.stringify({
          test: "YES",
        }),

        startedAt: new Date(),
        finishedAt: new Date(),
      },
      userId
    );

    const newFields = cloneDeep(oldFields);

    newFields[0].name = "I just modified this";

    newFields.push({
      id: "abcdtest",
      name: "new field",
      type: FieldType.NUMBER,
    });

    // simulate changing the name of a field
    await noteModelsCollection.updateOne(
      {
        _id: noteModelId,
      },
      {
        $set: {
          fields: newFields,
        },
      }
    );

    await activityNotesService.syncWithNewFields(
      oldFields,
      newFields,
      noteModelId
    );

    const note = await getActivityNoteByActivityLogDetailsId(
      activityLogDetailsId
    );

    const value = EJSON.parse(note.value);

    expect(value[inputFields[0].name]).toBeFalsy();
    expect(value[newFields[0].name]).toBe("YES");
  });
});
