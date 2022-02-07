import { ActivityLogsService } from "../services/ActivityLogs.service";
import { container } from "../../../__tests__/ecosystem";
import { createActivity, createEndUser, createNoteModel } from "./utilities";
import { FieldType } from "../collections";

// Jest Setup & Teardown: https://jestjs.io/docs/en/setup-teardown
// API: https://jestjs.io/docs/en/api
// Expect: https://jestjs.io/docs/en/expect

describe("ActivityLogsService", () => {
  test("create()", async () => {
    const activityLogsService = container.get(ActivityLogsService);

    const { userId } = await createEndUser();

    const activityId = await createActivity();

    const noteModelId = await createNoteModel(
      {
        name: "noteModel",
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

    const activityLog = await activityLogsService.create(
      {
        activityId,
        noteModelId,
      },
      userId
    );

    expect(activityLog).toBeTruthy();
  });
});
