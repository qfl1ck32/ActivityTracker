/** @overridable */
import { ObjectId } from "@bluelibs/ejson";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";

@Schema()
export class ActivityTimingUpdateInput {
  @Is(an.objectId().nullable())
  activityLogDetailsId?: ObjectId;

  @Is(an.objectId().nullable())
  endUserId?: ObjectId;

  @Is(a.date().nullable())
  finishedAt?: Date;

  @Is(a.date().nullable())
  startedAt?: Date;
}
