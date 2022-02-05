import { ActivityLogsSecurityService } from "../services/ActivityLogsSecurity.service";
import { container } from "../../../__tests__/ecosystem";
import {
  createActivity,
  createEndUser,
  createNoteModel,
  endUsersRegisterInput,
} from "./utilities";
import { ActivityLogsService } from "../services";
import { ActivityLogAlreadyExistsForGivenActivityException } from "../exceptions/ActivityLogAlreadyExistsForGivenActivity.exception";
import { EndUserDoesNotOwnActivityLogException } from "../exceptions";
import { FieldType } from "../collections";

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
    ).rejects.toThrowError(
      new ActivityLogAlreadyExistsForGivenActivityException()
    );
  });

  test("checkEndUserOwnsActivityLog()", async () => {
    const activityLogsSecurityService = container.get(
      ActivityLogsSecurityService
    );

    const activityLogsService = container.get(ActivityLogsService);

    const { endUserId, userId } = await createEndUser();

    const activityId = await createActivity();

    const noteModelId = await createNoteModel(
      {
        name: "my note model",
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

    const { _id: activityLogId } = await activityLogsService.create(
      {
        name: "activity log",
        activityId,
        noteModelId,
      },
      userId
    );

    await expect(
      activityLogsSecurityService.checkEndUserOwnsActivityLog(
        activityLogId,
        endUserId
      )
    ).resolves.not.toThrow();

    const { endUserId: anotherEndUserId } = await createEndUser({
      ...endUsersRegisterInput,
      email: "enduser-2@app.com",
    });

    await expect(
      activityLogsSecurityService.checkEndUserOwnsActivityLog(
        activityLogId,
        anotherEndUserId
      )
    ).rejects.toThrowError(new EndUserDoesNotOwnActivityLogException());
  });
});
