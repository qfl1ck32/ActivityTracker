import { ActivityNotesService } from "../services/ActivityNotes.service";
import { container } from "../../../__tests__/ecosystem";
import {
  createEndUser,
  createActivity,
  createNoteModel,
  createActivityLog,
  createActivityLogDetails,
  getActivityNoteByActivityLogDetailsId,
} from "./utilities";
import { FieldType } from "../collections";

// Jest Setup & Teardown: https://jestjs.io/docs/en/setup-teardown
// API: https://jestjs.io/docs/en/api
// Expect: https://jestjs.io/docs/en/expect

describe("ActivityNotesService", () => {
  test("update()", async () => {
    const activityNotesService = container.get(ActivityNotesService);

    const { userId, endUserId } = await createEndUser();

    const activityId = await createActivity();

    const noteModelId = await createNoteModel(
      {
        name: "my note model",
        fields: [
          {
            name: "How it went?",
            type: FieldType.ENUM,

            enumValues: ["GREAT", "EXCELLENT"],
          },
          {
            name: "How many reps?",
            type: FieldType.BOOLEAN, // TODO: add numbers!
          },
        ],
      },
      userId
    );

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

    const value = JSON.stringify({
      "my field": 32,
    });

    await activityNotesService.update(
      {
        activityLogDetailsId,
        value,
      },
      userId
    );

    let activityNote = await getActivityNoteByActivityLogDetailsId(
      activityLogDetailsId
    );

    console.log(activityNote.value);
  });
});
