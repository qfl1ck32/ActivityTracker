import { NoteModelsService } from "../services/NoteModels.service";
import { container } from "../../../__tests__/ecosystem";
import { FieldType } from "../collections";
import {
  createActivity,
  createActivityLog,
  createActivityLogDetails,
  createEndUser,
  createNoteModel,
  getActivityNoteByActivityLogDetailsId,
  getNoteModelById,
} from "./utilities";
import { FieldInput } from "../services/inputs";
import { EJSON } from "@bluelibs/ejson";

// Jest Setup & Teardown: https://jestjs.io/docs/en/setup-teardown
// API: https://jestjs.io/docs/en/api
// Expect: https://jestjs.io/docs/en/expect

// TODO: test it nicer
describe("NoteModelsService", () => {
  test("create()", async () => {
    const noteModelsService = container.get(NoteModelsService);

    const { userId } = await createEndUser();

    const noteModel = await noteModelsService.create(
      {
        name: "noteModelName",
        fields: [
          {
            name: "isThisOk",
            type: FieldType.BOOLEAN,
          },
        ],
      },
      userId
    );

    expect(noteModel).toBeTruthy();

    expect(noteModel.fields[0].id).toBeTruthy();
    expect(noteModel.fields[0].id).toHaveLength(36); // UUID :)
  });

  test("update()", async () => {
    const noteModelsService = container.get(NoteModelsService);

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

    const { fields: noteModelFields } = await getNoteModelById(noteModelId);

    noteModelFields[0].name = "newName";

    await noteModelsService.update(
      {
        name: "NewName",
        fields: noteModelFields,
        noteModelId,
      },
      userId
    );

    const noteModel = await getNoteModelById(noteModelId);

    expect(noteModel.fields).toStrictEqual(noteModelFields);

    const activityNote = await getActivityNoteByActivityLogDetailsId(
      activityLogDetailsId
    );

    const value = EJSON.parse(activityNote.value);

    expect(value["test"]).toBeFalsy();
    expect(value["newName"]).toBe("YES");

    expect(noteModel.name).toBe("NewName");
  });
});
