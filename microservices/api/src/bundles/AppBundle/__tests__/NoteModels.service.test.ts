import { NoteModelsService } from "../services/NoteModels.service";
import { container } from "../../../__tests__/ecosystem";
import { FieldType, NoteModelsCollection } from "../collections";
import { createEndUser } from "./utilities";

// Jest Setup & Teardown: https://jestjs.io/docs/en/setup-teardown
// API: https://jestjs.io/docs/en/api
// Expect: https://jestjs.io/docs/en/expect

describe("NoteModelsService", () => {
  test("create()", async () => {
    const noteModelsService = container.get(NoteModelsService);

    const noteModelsCollection = container.get(NoteModelsCollection);

    const { userId } = await createEndUser();

    const noteModelId = await noteModelsService.create(
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

    expect(noteModelId).toBeTruthy();

    const noteModel = await noteModelsCollection.findOne({
      _id: noteModelId,
    });

    expect(noteModel).toBeTruthy();
  });
});
