import { ActivityLogDetailsSecurityService } from "../services/ActivityLogDetailsSecurity.service";
import { container } from "../../../__tests__/ecosystem";
import {
  createActivity,
  createActivityLog,
  createActivityLogDetails,
  createEndUser,
  createNoteModel,
  endUsersRegisterInput,
  finishActivity,
  getNoteModelById,
  updateActivityNote,
} from "./utilities";
import {
  EndUserDoesNotOwnActivityLogDetailsException,
  FieldValueIsNotValidException,
} from "../exceptions";
import { FieldType } from "../collections";
import { EndUsersActivityLogDetailsCreateInput } from "../services/inputs";
import { ObjectId } from "@bluelibs/ejson";
import { ActivityLogDetailsTimingHasAlreadyBeenFinishedException } from "../exceptions/ActivityLogDetailsTimingHasAlreadyBeenFinished.exception";

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

    const activityLogId = await createActivityLog(
      {
        activityId,
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

  test("checkActivityLogDetailIsNotFinished()", async () => {
    const activityLogDetailsSecurityService = container.get(
      ActivityLogDetailsSecurityService
    );

    const check = (activityLogDetailsId: ObjectId) =>
      activityLogDetailsSecurityService.checkActivityLogDetailIsNotFinished(
        activityLogDetailsId
      );

    const { userId, endUserId } = await createEndUser();

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

    const activityLogId = await createActivityLog(
      {
        activityId,
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

    await expect(check(activityLogDetailsId)).resolves.not.toThrow();

    await finishActivity(
      {
        activityLogDetailsId,
      },
      userId
    );

    await expect(check(activityLogDetailsId)).rejects.toThrow(
      new ActivityLogDetailsTimingHasAlreadyBeenFinishedException()
    );
  });
});
