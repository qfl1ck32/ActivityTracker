import { ActivityLogDetailsService } from "../services/ActivityLogDetails.service";
import { container } from "../../../__tests__/ecosystem";
import {
  createActivity,
  createActivityLog,
  createEndUser,
  createNoteModel,
  getActivityLogDetail,
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

    const activityLogId = await createActivityLog(
      {
        name: "Calisthenics",
        activityId,
        noteModelId,
      },
      userId
    );

    const activityLogDetail = await activityLogDetailsService.create(
      {
        activityLogId,
      },
      userId
    );

    expect(activityLogDetail).toBeTruthy();

    const { _id: activityLogDetailsId } = activityLogDetail;

    const timing = await getActivityTimingByActivityLogDetailsId(
      activityLogDetailsId
    );

    expect(timing).toBeTruthy();

    expect(timing.startedAt).toBeTruthy();
    expect(timing.finishedAt).toBeFalsy();

    let note = await getActivityNoteByActivityLogDetailsId(
      activityLogDetailsId
    );

    expect(note).toBeTruthy();

    expect(note.value).toBe(JSON.stringify({}));
  });

  test("finish()", async () => {
    const activityLogDetailsService = container.get(ActivityLogDetailsService);

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

    const activityLogId = await createActivityLog(
      {
        name: "Calisthenics",
        activityId,
        noteModelId,
      },
      userId
    );

    let activityLogDetail = await activityLogDetailsService.create(
      {
        activityLogId,
      },
      userId
    );

    expect(activityLogDetail.timing.isFinished).toBe(false);
    expect(activityLogDetail.timing.finishedAt).toBeFalsy();

    await activityLogDetailsService.finish(
      { activityLogDetailsId: activityLogDetail._id },
      userId
    );

    activityLogDetail = await getActivityLogDetail(activityLogDetail._id);

    expect(activityLogDetail.timing.finishedAt).toBeTruthy();
    expect(activityLogDetail.timing.isFinished).toBe(true);
  });

  test("delete()", async () => {
    const activityLogDetailsService = container.get(ActivityLogDetailsService);

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

    const activityLogId = await createActivityLog(
      {
        name: "Calisthenics",
        activityId,
        noteModelId,
      },
      userId
    );

    const activityLogDetail = await activityLogDetailsService.create(
      {
        activityLogId,
      },
      userId
    );

    expect(await getActivityLogDetail(activityLogDetail._id)).toBeTruthy();

    await activityLogDetailsService.delete(
      {
        activityLogDetailId: activityLogDetail._id,
      },
      userId
    );

    expect(await getActivityLogDetail(activityLogDetail._id)).toBeFalsy();
  });
});
