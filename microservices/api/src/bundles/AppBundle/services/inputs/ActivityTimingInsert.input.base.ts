/** @overridable */
import { ObjectId } from "@bluelibs/ejson";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";

@Schema()
export class ActivityTimingInsertInput {
  @Is(an.objectId().required())
  activityLogDetailId: ObjectId;

  @Is(an.objectId().required())
  endUserId: ObjectId;

  @Is(a.date().nullable())
  finishedAt?: Date;

  @Is(a.date().required())
  startedAt: Date;
}
