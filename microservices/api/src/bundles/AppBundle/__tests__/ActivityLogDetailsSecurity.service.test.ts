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
  test("checkEndUserOwnsActivityLogDetail()", async () => {
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
            isArray: false,
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

    const activityLogDetailId = await createActivityLogDetails(
      {
        activityLogId,
      },
      userId
    );

    await expect(
      activityLogDetailsSecurityService.checkEndUserOwnsActivityLogDetail(
        activityLogDetailId,
        endUserId
      )
    ).resolves.not.toThrow();

    const { endUserId: anotherEndUserId } = await createEndUser({
      ...endUsersRegisterInput,
      email: "enduser-2@app.com",
    });

    await expect(
      activityLogDetailsSecurityService.checkEndUserOwnsActivityLogDetail(
        activityLogDetailId,
        anotherEndUserId
      )
    ).rejects.toThrowError(new EndUserDoesNotOwnActivityLogDetailsException());
  });

  test("checkActivityLogDetailIsNotFinished()", async () => {
    const activityLogDetailsSecurityService = container.get(
      ActivityLogDetailsSecurityService
    );

    const check = (activityLogDetailId: ObjectId) =>
      activityLogDetailsSecurityService.checkActivityLogDetailIsNotFinished(
        activityLogDetailId
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
            isArray: false,
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

    const activityLogDetailId = await createActivityLogDetails(
      {
        activityLogId,
      },
      userId
    );

    await expect(check(activityLogDetailId)).resolves.not.toThrow();

    await finishActivity(
      {
        activityLogDetailId,
      },
      userId
    );

    await expect(check(activityLogDetailId)).rejects.toThrow(
      new ActivityLogDetailsTimingHasAlreadyBeenFinishedException()
    );
  });
});
