/** @overridable */
import { ObjectId } from "@bluelibs/ejson";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";

@Schema()
export class ActivityLogUpdateInput {
  @Is(an.objectId().nullable())
  activityId?: ObjectId;

  @Is(an.objectId().nullable())
  endUserId?: ObjectId;

  @Is(a.boolean().nullable())
  isFinished?: boolean;

  @Is(a.string().nullable())
  name?: string;

  @Is(an.objectId().nullable())
  noteModelId?: ObjectId;
}
