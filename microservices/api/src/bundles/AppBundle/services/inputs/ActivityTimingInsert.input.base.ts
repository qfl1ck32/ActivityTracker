/** @overridable */
import { ObjectId } from "@bluelibs/ejson";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";

@Schema()
export class ActivityTimingInsertInput {
  @Is(an.objectId().required())
  activityLogDetailsId: ObjectId;

  @Is(an.objectId().required())
  endUserId: ObjectId;

  @Is(a.date().nullable())
  finishedAt?: Date;

  @Is(a.string().required())
  name: string;

  @Is(a.date().required())
  startedAt: Date;
}
