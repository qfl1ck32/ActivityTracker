import { ActivityLogDetailsSecurityService } from "../services/ActivityLogDetailsSecurity.service";
import { container } from "../../../__tests__/ecosystem";
import {
  createActivity,
  createActivityLog,
  createActivityLogDetails,
  createEndUser,
  createNoteModel,
  endUsersRegisterInput,
  getNoteModelById,
} from "./utilities";
import {
  EndUserDoesNotOwnActivityLogDetailsException,
  FieldValueIsNotValidException,
} from "../exceptions";
import { FieldType } from "../collections";
import { EndUsersActivityLogDetailsCreateInput } from "../services/inputs";

// Jest Setup & Teardown: https://jestjs.io/docs/en/setup-teardown
// API: https://jestjs.io/docs/en/api
// Expect: https://jestjs.io/docs/en/expect

describe("ActivityLogDetailsSecurityService", () => {
  test("checkEndUserOwnsActivityLogDetails()", async () => {
    const activityLogDetailsSecurityService = container.get(
      ActivityLogDetailsSecurityService
    );

    const { userId, endUserId } = await createEndUser();

    const activityId = await createActivity();

    const noteModelId = await createNoteModel(
      {
        name: "my note model",
        fields: [],
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
      },
      userId
    );

    await expect(
      activityLogDetailsSecurityService.checkEndUserOwnsActivityLogDetails(
        activityLogDetailsId,
        endUserId
      )
    ).resolves.not.toThrow();

    const { endUserId: anotherEndUserId } = await createEndUser({
      ...endUsersRegisterInput,
      email: "enduser-2@app.com",
    });

    await expect(
      activityLogDetailsSecurityService.checkEndUserOwnsActivityLogDetails(
        activityLogDetailsId,
        anotherEndUserId
      )
    ).rejects.toThrowError(new EndUserDoesNotOwnActivityLogDetailsException());
  });
});
