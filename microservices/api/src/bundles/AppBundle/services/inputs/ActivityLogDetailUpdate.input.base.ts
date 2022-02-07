/** @overridable */
import { ObjectId } from "@bluelibs/ejson";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";

@Schema()
export class ActivityLogDetailUpdateInput {
  @Is(an.objectId().nullable())
  activityLogId?: ObjectId;

  @Is(an.objectId().nullable())
  endUserId?: ObjectId;

  @Is(an.objectId().nullable())
  noteId?: ObjectId;

  @Is(an.objectId().nullable())
  timingId?: ObjectId;
}
