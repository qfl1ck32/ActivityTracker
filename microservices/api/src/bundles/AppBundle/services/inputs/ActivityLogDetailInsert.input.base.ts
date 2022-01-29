/** @overridable */
import { ObjectId } from "@bluelibs/ejson";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";

@Schema()
export class ActivityLogDetailInsertInput {
  @Is(an.objectId().required())
  activityLogId: ObjectId;

  @Is(a.string().required())
  name: string;

  @Is(an.objectId().required())
  notesId: ObjectId;

  @Is(an.objectId().required())
  timingId: ObjectId;
}
