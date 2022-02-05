import { ObjectId } from "@bluelibs/ejson";
import { container } from "../../../__tests__/ecosystem";
import { Field, FieldType } from "../collections";
import {
  FieldNamesAreNotUniqueException,
  FieldTypeIsNotEnumButEnumValuesWereGivenException,
  NoteModelNameAlreadyExistsException,
  NoteModelsUpdateFieldsInputIsInvalidException,
} from "../exceptions";
import { EndUserDoesNotOwnNoteModelException } from "../exceptions/EndUserDoesNotOwnNoteModel.exception";
import { NoteModelsService } from "../services";
import { FieldInput } from "../services/inputs";
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
        fields: [],
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
        fields: [],
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

    const noteModelsService = container.get(NoteModelsService)

    const check = (input: { fields: (Field | FieldInput)[] }, noteModelId?: ObjectId) => noteModelsSecurityService.checkFieldsInputIsValid(input, noteModelId);

    await expect(
      check({
        fields: [
          {
            name: "abc",
            type: FieldType.NUMBER,
            enumValues: []
          },
          {
            name: "abc",
            type: FieldType.STRING,
            enumValues: []
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
    ).rejects.toThrowError(new FieldTypeIsNotEnumButEnumValuesWereGivenException());

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

      const { userId } = await createEndUser()
    
    const noteModel = await noteModelsService.create({
      name: "test",

      fields: [
        {
          name: "myField",
          type: FieldType.BOOLEAN,
          enumValues: []
        }
      ]
    }, userId)

    const { _id: noteModelId, fields } = noteModel

    fields.push({
      id: "id-that-should-not-be-here",
      name: "test",
      type: FieldType.BOOLEAN,
       enumValues: []
    })

    await expect(
      check({
        fields
      }, noteModelId)
    ).rejects.toThrow(new NoteModelsUpdateFieldsInputIsInvalidException())
  });
});
