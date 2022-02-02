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
} from "./utilities";
import { FieldType } from "../collections";

// Jest Setup & Teardown: https://jestjs.io/docs/en/setup-teardown
// API: https://jestjs.io/docs/en/api
// Expect: https://jestjs.io/docs/en/expect

describe("ActivityLogDetailsService", () => {
  test("create()", async () => {
    const activityLogDetailsService = container.get(ActivityLogDetailsService);

    const dateService = container.get(DateService);

    const { userId, endUserId } = await createEndUser();

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

    const note = await getActivityNoteByActivityLogDetailsId(
      activityLogDetailsId
    );

    expect(note).toBeTruthy();

    expect(note.value).toBe(JSON.stringify({}));
  });
});
