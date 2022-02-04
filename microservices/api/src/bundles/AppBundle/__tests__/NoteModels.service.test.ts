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
import {
  FieldNameIsNotDefinedInNoteModelException,
  FieldValueIsNotValidException,
} from "../exceptions";

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

    const { fields } = await getNoteModelById(noteModelId);

    const activityLogId = await createActivityLog(
      {
        name: "Test",
        activityId,
        noteModelId,
      },
      userId
    );

    await expect(
      createActivityLogDetails(
        {
          activityLogId,
          noteDetailsValue: EJSON.stringify({
            test: "invalid-id",
          }),

          startedAt: new Date(),
          finishedAt: new Date(),
        },
        userId
      )
    ).rejects.toThrow(
      new FieldNameIsNotDefinedInNoteModelException({ fieldName: "test" })
    );

    await expect(
      createActivityLogDetails(
        {
          activityLogId,
          noteDetailsValue: EJSON.stringify({
            [fields[0].id]: "invalid-id",
          }),

          startedAt: new Date(),
          finishedAt: new Date(),
        },
        userId
      )
    ).rejects.toThrow(
      new FieldValueIsNotValidException({ fieldName: fields[0].id })
    );

    const activityLogDetailsId = await createActivityLogDetails(
      {
        activityLogId,
        noteDetailsValue: EJSON.stringify({
          [fields[0].id]: fields[0].enumValues[0].id,
        }),

        startedAt: new Date(),
        finishedAt: new Date(),
      },
      userId
    );

    const { fields: noteModelFields } = await getNoteModelById(noteModelId);

    noteModelFields[0].enumValues.splice(0, 1);

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

    expect(fields[0].id in value).toBeFalsy();

    expect(noteModel.name).toBe("NewName");
  });
});
