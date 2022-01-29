/** @overridable */
import { ObjectId } from "@bluelibs/ejson";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";

@Schema()
export class ActivityLogDetailUpdateInput {
  @Is(an.objectId().nullable())
  activityLogId?: ObjectId;

  @Is(a.string().nullable())
  name?: string;

  @Is(an.objectId().nullable())
  notesId?: ObjectId;

  @Is(an.objectId().nullable())
  timingId?: ObjectId;
}
