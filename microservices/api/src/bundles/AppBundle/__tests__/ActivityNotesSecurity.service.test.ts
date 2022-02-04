import { EJSON } from "@bluelibs/ejson";
import { container } from "../../../__tests__/ecosystem";
import { Field, FieldType } from "../collections";
import {
  FieldNameIsNotDefinedInNoteModelException,
  FieldValueIsNotValidException,
} from "../exceptions";
import { ActivityNotesSecurityService } from "../services/ActivityNotesSecurity.service";
import {
  EndUsersActivityNotesUpdateInput,
  FieldInput,
} from "../services/inputs";
import {
  createActivity,
  createActivityLog,
  createActivityLogDetails,
  createEndUser,
  createNoteModel,
  getNoteModelById,
} from "./utilities";

// Jest Setup & Teardown: https://jestjs.io/docs/en/setup-teardown
// API: https://jestjs.io/docs/en/api
// Expect: https://jestjs.io/docs/en/expect

describe("ActivityNotesSecurityService", () => {
  test("checkUpdateInputIsValid()", async () => {
    const activityNotesSecurityService = container.get(
      ActivityNotesSecurityService
    );

    const check = (input: EndUsersActivityNotesUpdateInput) => {
      return activityNotesSecurityService.checkUpdateInputIsValid(input);
    };

    const { userId, endUserId } = await createEndUser();

    const activityId = await createActivity();

    const noteModelId = await createNoteModel(
      {
        name: "my note model",
        fields: [
          {
            name: "enumTest",
            type: FieldType.ENUM,
            enumValues: ["ACCEPTED_ENUM_VALUE"],
          },
          {
            name: "booleanTest",
            type: FieldType.BOOLEAN,
          },
        ],
      },
      userId
    );

    const { fields } = await getNoteModelById(noteModelId);

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

    const updateInput = {
      activityLogDetailsId,
      value: "",
    } as EndUsersActivityNotesUpdateInput;

    // field is not defined
    updateInput["value"] = EJSON.stringify({
      "my field": 32,
    });

    await expect(check(updateInput)).rejects.toThrowError(
      new FieldNameIsNotDefinedInNoteModelException({ fieldName: "my field" })
    );

    // field enum value is not defined
    updateInput["value"] = EJSON.stringify({
      enumTest: "NOT_ACCEPTED_ENUM_VALUE",
    });

    await expect(check(updateInput)).rejects.toThrowError(
      new FieldValueIsNotValidException({ fieldName: "enumTest" })
    );

    // field enum value is defined
    updateInput["value"] = EJSON.stringify({
      enumTest: fields[0].enumValues[0].id,
    });

    await expect(check(updateInput)).resolves.not.toThrow();

    // field boolean value is wrong
    updateInput["value"] = EJSON.stringify({
      booleanTest: "invalid boolean value",
    });

    await expect(check(updateInput)).rejects.toThrowError(
      new FieldValueIsNotValidException({ fieldName: "booleanTest" })
    );

    updateInput["value"] = EJSON.stringify({
      booleanTest: new Date(),
    });

    await expect(check(updateInput)).rejects.toThrowError(
      new FieldValueIsNotValidException({ fieldName: "booleanTest" })
    );

    // field boolean value is valid
    updateInput["value"] = EJSON.stringify({
      booleanTest: true,
    });

    await expect(check(updateInput)).resolves.not.toThrow();

    updateInput["value"] = EJSON.stringify({
      booleanTest: false,
    });

    await expect(check(updateInput)).resolves.not.toThrow();
  });

  test("checkNoteDetailsValueIsValid()", async () => {
    const activityNotesSecurityService = container.get(
      ActivityNotesSecurityService
    );

    const check = (noteDetailsValue: string, noteModelFields: Field[]) => () =>
      activityNotesSecurityService.checkNoteDetailsValueIsValid(
        noteDetailsValue,
        noteModelFields
      );

    const fields = [
      {
        name: "enumTest",
        type: FieldType.ENUM,
        enumValues: [
          {
            id: "a",
            value: "ACCEPTED_ENUM_VALUE",
          },
        ],
      },
      {
        name: "booleanTest",
        type: FieldType.BOOLEAN,
      },
    ] as Field[];

    expect(
      check(
        JSON.stringify({
          enumTest: "a",
        }),
        fields
      )
    ).not.toThrow();

    expect(
      check(
        JSON.stringify({
          enumTest: "WRONG_ENUM_VALUE_ID",
        }),
        fields
      )
    ).toThrowError(
      new FieldValueIsNotValidException({ fieldName: "enumTest" })
    );

    expect(
      check(
        JSON.stringify({
          nonExistingField: 1,
        }),
        fields
      )
    ).toThrowError(
      new FieldNameIsNotDefinedInNoteModelException({
        fieldName: "nonExistingField",
      })
    );
  });
});
