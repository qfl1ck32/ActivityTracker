/** @overridable */
import { ObjectId } from "@bluelibs/ejson";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";

@Schema()
export class ActivityLogInsertInput {
  @Is(an.objectId().required())
  activityId: ObjectId;

  @Is(an.objectId().required())
  endUserId: ObjectId;

  @Is(a.boolean().required())
  isFinished: boolean;

  @Is(a.string().required())
  name: string;

  @Is(an.objectId().required())
  noteModelId: ObjectId;
}
