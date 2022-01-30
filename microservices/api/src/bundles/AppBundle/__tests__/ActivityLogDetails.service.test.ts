import { ActivityLogDetailsService } from "../services/ActivityLogDetails.service";
import { container } from "../../../__tests__/ecosystem";
import { DateService } from "../services";
import {
  createActivity,
  createActivityLog,
  createEndUser,
  createNoteModel,
} from "./utilities";
import { FieldType } from "../collections";

// Jest Setup & Teardown: https://jestjs.io/docs/en/setup-teardown
// API: https://jestjs.io/docs/en/api
// Expect: https://jestjs.io/docs/en/expect

describe.only("ActivityLogDetailsService", () => {
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

    const activityLogDetailsId = await activityLogDetailsService.create(
      {
        activityLogId,

        startedAt: dateService.toDayJS().toDate(),
        finishedAt: dateService.toDayJS().add(1, "minute").toDate(),
      },
      userId
    );
  });
});
