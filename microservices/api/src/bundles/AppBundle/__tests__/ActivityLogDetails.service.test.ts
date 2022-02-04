import { ActivityLogDetailsService } from "../services/ActivityLogDetails.service";
import { container } from "../../../__tests__/ecosystem";
import { DateService } from "../services";
import {
  createActivity,
  createActivityLog,
  createEndUser,
  createNoteModel,
  getActivityNoteByActivityLogDetailsId,
  getActivityTimingByActivityLogDetailsId,
  getNoteModelById,
} from "./utilities";
import { FieldType } from "../collections";
import { EJSON } from "@bluelibs/ejson";

// Jest Setup & Teardown: https://jestjs.io/docs/en/setup-teardown
// API: https://jestjs.io/docs/en/api
// Expect: https://jestjs.io/docs/en/expect

describe("ActivityLogDetailsService", () => {
  test("create()", async () => {
    const activityLogDetailsService = container.get(ActivityLogDetailsService);

    const dateService = container.get(DateService);

    const { userId } = await createEndUser();

    const activityId = await createActivity();

    const noteModelId = await createNoteModel(
      {
        name: "For Calisthenics",
        fields: [
          {
            name: "Went hardcore?",
            type: FieldType.ENUM,
            enumValues: ["YES", "HELL YES!"],
          },
        ],
      },
      userId
    );

    const { fields } = await getNoteModelById(noteModelId);

    const activityLogId = await createActivityLog(
      {
        name: "Calisthenics",
        activityId,
        noteModelId,
      },
      userId
    );

    const startedAt = dateService.toDayJS().toDate();
    const finishedAt = dateService.toDayJS().add(1, "minute").toDate();

    const { _id: activityLogDetailsId } =
      await activityLogDetailsService.create(
        {
          activityLogId,
          startedAt,
          finishedAt,
        },
        userId
      );

    expect(activityLogDetailsId).toBeTruthy();

    const timing = await getActivityTimingByActivityLogDetailsId(
      activityLogDetailsId
    );

    expect(timing).toBeTruthy();

    expect(timing.startedAt).toStrictEqual(startedAt);
    expect(timing.finishedAt).toStrictEqual(finishedAt);

    let note = await getActivityNoteByActivityLogDetailsId(
      activityLogDetailsId
    );

    expect(note).toBeTruthy();

    expect(note.value).toBe(JSON.stringify({}));

    // TODO: maybe test with wrong field name?
    const noteDetailsValue = EJSON.stringify({
      [fields[0].id]: fields[0].enumValues[0].id,
    });

    const { _id: activityLogDetailsId2 } =
      await activityLogDetailsService.create(
        {
          activityLogId,
          startedAt,
          finishedAt,
          noteDetailsValue,
        },
        userId
      );

    note = await getActivityNoteByActivityLogDetailsId(activityLogDetailsId2);

    expect(note.value).toBe(noteDetailsValue);
  });
});
