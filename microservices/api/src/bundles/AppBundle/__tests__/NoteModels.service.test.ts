import { NoteModelsService } from "../services/NoteModels.service";
import { container } from "../../../__tests__/ecosystem";
import { FieldType } from "../collections";
import { createEndUser } from "./utilities";

// Jest Setup & Teardown: https://jestjs.io/docs/en/setup-teardown
// API: https://jestjs.io/docs/en/api
// Expect: https://jestjs.io/docs/en/expect

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
  });

  test.only("update()", async () => {
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
  });
});
