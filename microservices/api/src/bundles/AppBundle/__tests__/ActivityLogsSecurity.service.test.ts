import { ActivityLogsSecurityService } from "../services/ActivityLogsSecurity.service";
import { container } from "../../../__tests__/ecosystem";
import { createActivity, createEndUser, createNoteModel } from "./utilities";
import { ActivityLogsService } from "../services";
import { ActivityAlreadyDefinedException } from "../exceptions/ActivityAlreadyDefined.exception";

// Jest Setup & Teardown: https://jestjs.io/docs/en/setup-teardown
// API: https://jestjs.io/docs/en/api
// Expect: https://jestjs.io/docs/en/expect

describe("ActivityLogsSecurityService", () => {
  test("checkEndUserDoesNotHaveAnotherActivityLogForSameActivity()", async () => {
    const activityLogsSecurityService = container.get(
      ActivityLogsSecurityService
    );

    const activityLogsService = container.get(ActivityLogsService);

    const { endUserId, userId } = await createEndUser();

    const activityId = await createActivity();

    await expect(
      activityLogsSecurityService.checkEndUserDoesNotHaveAnotherActivityLogForSameActivity(
        activityId,
        endUserId
      )
    ).resolves.not.toThrow();

    const noteModelId = await createNoteModel(
      {
        name: "my note model",
        fields: [],
      },
      userId
    );

    await activityLogsService.create(
      {
        name: "activity log",
        activityId,
        noteModelId,
      },
      userId
    );

    await expect(
      activityLogsSecurityService.checkEndUserDoesNotHaveAnotherActivityLogForSameActivity(
        activityId,
        endUserId
      )
    ).rejects.toThrowError(new ActivityAlreadyDefinedException());
  });
});
