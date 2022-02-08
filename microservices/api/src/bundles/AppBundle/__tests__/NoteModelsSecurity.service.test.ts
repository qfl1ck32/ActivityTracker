import { ObjectId } from "@bluelibs/ejson";
import { container } from "../../../__tests__/ecosystem";
import { Field, FieldType } from "../collections";
import {
  FieldNamesAreNotUniqueException,
  FieldTypeIsNotEnumButEnumValuesWereGivenException,
  NoteModelNameAlreadyExistsException,
  NoteModelsFieldsAreMissingException,
  NoteModelsUpdateFieldsInputIsInvalidException,
} from "../exceptions";
import { EndUserDoesNotOwnNoteModelException } from "../exceptions/EndUserDoesNotOwnNoteModel.exception";
import { NoteModelsTypeOfExistingFieldCanNotBeChangedException } from "../exceptions/NoteModelsTypeOfExistingFieldCanNotBeChanged.exception";
import { NoteModelsService } from "../services";
import { FieldCreateInput, FieldInput } from "../services/inputs";
import { NoteModelsSecurityService } from "../services/NoteModelsSecurity.service";
import {
  createEndUser,
  createNoteModel,
  endUsersRegisterInput,
} from "./utilities";

// Jest Setup & Teardown: https://jestjs.io/docs/en/setup-teardown
// API: https://jestjs.io/docs/en/api
// Expect: https://jestjs.io/docs/en/expect

describe("NoteModelsSecurityService", () => {
  test("checkEndUserOwnsNoteModel()", async () => {
    const noteModelsSecurityService = container.get(NoteModelsSecurityService);

    const { userId, endUserId } = await createEndUser();

    const noteModelId = await createNoteModel(
      {
        name: "abc",
        fields: [
          {
            name: "dummy",
            type: FieldType.BOOLEAN,
            enumValues: [],
          },
        ],
      },
      userId
    );

    await expect(
      noteModelsSecurityService.checkEndUserOwnsNoteModel(
        noteModelId,
        endUserId
      )
    ).resolves.not.toThrow();

    const { endUserId: secondEndUserId } = await createEndUser({
      ...endUsersRegisterInput,
      email: "enduser-2@app.com",
    });

    await expect(
      noteModelsSecurityService.checkEndUserOwnsNoteModel(
        noteModelId,
        secondEndUserId
      )
    ).rejects.toThrowError(new EndUserDoesNotOwnNoteModelException());
  });

  test("checkEndUserDoesNotHaveNoteModelWithTheSameName()", async () => {
    const noteModelsSecurityService = container.get(NoteModelsSecurityService);

    const { userId, endUserId } = await createEndUser();

    const name = "abc";

    await expect(
      noteModelsSecurityService.checkEndUserDoesNotHaveNoteModelWithTheSameName(
        name,
        endUserId
      )
    ).resolves.not.toThrow();

    await createNoteModel(
      {
        name,
        fields: [
          {
            name: "dummy",
            type: FieldType.BOOLEAN,
            enumValues: [],
          },
        ],
      },
      userId
    );

    await expect(
      noteModelsSecurityService.checkEndUserDoesNotHaveNoteModelWithTheSameName(
        name,
        endUserId
      )
    ).rejects.toThrowError(new NoteModelNameAlreadyExistsException());
  });

  test("checkFieldsInputIsValid()", async () => {
    const noteModelsSecurityService = container.get(NoteModelsSecurityService);

    const noteModelsService = container.get(NoteModelsService);

    const check = (
      input: { fields: (Field | FieldCreateInput)[] },
      noteModelId?: ObjectId
    ) => noteModelsSecurityService.checkFieldsInputIsValid(input, noteModelId);

    await expect(
      check({
        fields: [
          {
            name: "abc",
            type: FieldType.NUMBER,
            enumValues: [],
          },
          {
            name: "abc",
            type: FieldType.STRING,
            enumValues: [],
          },
        ],
      })
    ).rejects.toThrowError(new FieldNamesAreNotUniqueException());

    await expect(
      check({
        fields: [
          {
            name: "abc",
            type: FieldType.STRING,

            enumValues: ["A"],
          },
        ],
      })
    ).rejects.toThrowError(
      new FieldTypeIsNotEnumButEnumValuesWereGivenException()
    );

    await expect(
      check({
        fields: [
          {
            name: "abc",
            type: FieldType.ENUM,

            enumValues: ["A"],
          },
        ],
      })
    ).resolves.not.toThrow();

    await expect(
      check({
        fields: [],
      })
    ).rejects.toThrow(new NoteModelsFieldsAreMissingException());

    const { userId } = await createEndUser();

    const noteModel = await noteModelsService.create(
      {
        name: "test",

        fields: [
          {
            name: "myField",
            type: FieldType.ENUM,
            enumValues: ["test"],
          },
        ],
      },
      userId
    );

    const { _id: noteModelId, fields } = noteModel;

    fields.push({
      id: "id-that-should-not-be-here",
      name: "test",
      type: FieldType.BOOLEAN,
      enumValues: [],
    });

    await expect(
      check(
        {
          fields,
        },
        noteModelId
      )
    ).rejects.toThrow(new NoteModelsUpdateFieldsInputIsInvalidException());

    delete fields[1].id;

    await expect(
      check(
        {
          fields,
        },
        noteModelId
      )
    ).resolves.not.toThrow();

    fields.pop();

    fields[0].type = FieldType.STRING;

    await expect(
      check(
        {
          fields,
        },
        noteModelId
      )
    ).rejects.toThrow(
      new NoteModelsTypeOfExistingFieldCanNotBeChangedException()
    );

    fields[0].type = FieldType.ENUM;

    fields[0].enumValues.push({
      id: "should-not-be-here",
      value: "dummy",
    });

    await expect(
      check(
        {
          fields,
        },
        noteModelId
      )
    ).rejects.toThrow(new NoteModelsUpdateFieldsInputIsInvalidException());

    delete fields[0].enumValues[1].id;

    await expect(
      check(
        {
          fields,
        },
        noteModelId
      )
    ).resolves.not.toThrow();

    // try to "cheat" by removing the id and simulating "new field", should check by name:

    delete fields[0].id;

    fields[0].type = FieldType.BOOLEAN;
    fields[0].enumValues = [];

    await expect(
      check(
        {
          fields,
        },
        noteModelId
      )
    ).rejects.toThrow(
      new NoteModelsTypeOfExistingFieldCanNotBeChangedException()
    );
  });
});
