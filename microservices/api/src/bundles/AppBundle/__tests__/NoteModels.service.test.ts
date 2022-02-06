import { EJSON } from "@bluelibs/ejson";
import { container } from "../../../__tests__/ecosystem";
import { FieldType } from "../collections";
import {
  NoteModelsFieldsAreMissingException,
  NoteModelsUpdateFieldsInputIsInvalidException,
} from "../exceptions";
import { FieldInput } from "../services/inputs";
import { NoteModelsService } from "../services/NoteModels.service";
import {
  createActivity,
  createActivityLog,
  createActivityLogDetails,
  createEndUser,
  createNoteModel,
  getActivityNoteByActivityLogDetailsId,
  getNoteModelById,
  updateActivityNote,
} from "./utilities";

// Jest Setup & Teardown: https://jestjs.io/docs/en/setup-teardown
// API: https://jestjs.io/docs/en/api
// Expect: https://jestjs.io/docs/en/expect

// TODO: test it nicer? :))
describe("NoteModelsService", () => {
  test("create()", async () => {
    const noteModelsService = container.get(NoteModelsService);

    const { userId } = await createEndUser();

    await expect(
      noteModelsService.create(
        {
          name: "test",
          fields: [],
        },
        userId
      )
    ).rejects.toThrow(new NoteModelsFieldsAreMissingException());

    const noteModel = await noteModelsService.create(
      {
        name: "noteModelName",
        fields: [
          {
            name: "isThisOk",
            type: FieldType.ENUM,
            enumValues: ["TEST"],
          },
        ],
      },
      userId
    );

    expect(noteModel).toBeTruthy();

    expect(noteModel.fields[0].id).toBeTruthy();
    expect(noteModel.fields[0].id).toHaveLength(36); // UUID :)

    expect(noteModel.fields[0].enumValues[0].id).toBeTruthy();
    expect(noteModel.fields[0].enumValues[0].id).toHaveLength(36);
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

    const activityLogDetailsId = await createActivityLogDetails(
      {
        activityLogId,
      },
      userId
    );

    await updateActivityNote(
      {
        activityLogDetailsId,
        value: EJSON.stringify({
          [fields[0].id]: fields[0].enumValues[0].id,
        }),
      },
      userId
    );

    await expect(
      noteModelsService.update(
        {
          name: "test",
          fields: [],
          noteModelId,
        },
        userId
      )
    ).rejects.toThrow(new NoteModelsFieldsAreMissingException());

    const { fields: noteModelFields } = await getNoteModelById(noteModelId);

    noteModelFields[0].enumValues.splice(0, 1);

    noteModelFields[0].enumValues.push({
      id: "should-not-be-here",

      value: "lol",
    });

    await expect(
      noteModelsService.update(
        {
          name: "newName",
          fields: noteModelFields,
          noteModelId,
        },
        userId
      )
    ).rejects.toThrow(new NoteModelsUpdateFieldsInputIsInvalidException());

    delete noteModelFields[0].enumValues[1].id;

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

    expect(noteModel.fields.some((field) => !field.id)).toBe(false); // a.k.a. all fields have an id

    expect(
      noteModel.fields.some((field) =>
        field.enumValues.some((enumValue) => !enumValue.id)
      )
    ).toBe(false); // a.k.a. all enumValues from all fields have ids

    const activityNote = await getActivityNoteByActivityLogDetailsId(
      activityLogDetailsId
    );

    const value = EJSON.parse(activityNote.value);

    expect(fields[0].id in value).toBeFalsy();

    expect(noteModel.name).toBe("NewName");
  });
});
