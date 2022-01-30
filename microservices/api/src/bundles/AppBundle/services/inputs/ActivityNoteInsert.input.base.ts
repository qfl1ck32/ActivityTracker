/** @overridable */
import { ObjectId } from "@bluelibs/ejson";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";

@Schema()
export class ActivityNoteInsertInput {
  @Is(an.objectId().required())
  activityLogDetailsId: ObjectId;

  @Is(an.objectId().required())
  endUserId: ObjectId;

  /**
   * @description We are representing the value as an object, because we don't have an exact representation of how the note will look like.
   */
  @Is(a.string().required())
  value: string = "{}";
}
