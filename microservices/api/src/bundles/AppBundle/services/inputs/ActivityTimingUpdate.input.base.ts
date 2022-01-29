/** @overridable */
import { ObjectId } from "@bluelibs/ejson";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";

@Schema()
export class ActivityTimingUpdateInput {
  @Is(an.objectId().nullable())
  activityLogId?: ObjectId;

  @Is(an.objectId().nullable())
  endUserId?: ObjectId;

  @Is(a.date().nullable())
  finishedAt?: Date;

  @Is(a.string().nullable())
  name?: string;

  @Is(a.date().nullable())
  startedAt?: Date;
}
