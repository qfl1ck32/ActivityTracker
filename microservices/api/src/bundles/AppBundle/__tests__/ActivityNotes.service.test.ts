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
import { EJSON } from "@bluelibs/ejson";

// Jest Setup & Teardown: https://jestjs.io/docs/en/setup-teardown
// API: https://jestjs.io/docs/en/api
// Expect: https://jestjs.io/docs/en/expect

describe("ActivityNotesService", () => {
  test("update()", async () => {
    const activityNotesService = container.get(ActivityNotesService);

    const { userId } = await createEndUser();

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
            type: FieldType.NUMBER,
          },
          {
            name: "Did you rest?",
            type: FieldType.BOOLEAN,
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

    const value = EJSON.stringify({
      "How it went?": "EXCELLENT",
      "How many reps?": 10,
      "Did you rest?": false,
    });

    await activityNotesService.update(
      {
        activityLogDetailsId,
        value,
      },
      userId
    );

    const activityNote = await getActivityNoteByActivityLogDetailsId(
      activityLogDetailsId
    );

    expect(activityNote.value).toBe(value);
  });
});
