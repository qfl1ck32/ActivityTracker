/** @overridable */
import { ObjectId } from "@bluelibs/ejson";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";

@Schema()
export class ActivityLogDetailInsertInput {
  @Is(an.objectId().required())
  activityLogId: ObjectId;

  @Is(an.objectId().required())
  endUserId: ObjectId;

  @Is(an.objectId().required())
  noteId: ObjectId;

  @Is(an.objectId().required())
  timingId: ObjectId;
}
