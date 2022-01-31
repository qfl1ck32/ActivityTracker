import { NoteModelsSecurityService } from "../services/NoteModelsSecurity.service";
import { container } from "../../../__tests__/ecosystem";
import {
  createEndUser,
  createNoteModel,
  endUsersRegisterInput,
} from "./utilities";
import { EndUserDoesNotOwnNoteModelException } from "../exceptions/EndUserDoesNotOwnNoteModel.exception";
import { NoteModelNameAlreadyExistsException } from "../exceptions";

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
});
