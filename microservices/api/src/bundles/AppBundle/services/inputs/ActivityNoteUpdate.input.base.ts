/** @overridable */
import { ObjectId } from "@bluelibs/ejson";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";

@Schema()
export class ActivityNoteUpdateInput {
  @Is(an.objectId().nullable())
  activityLogDetailsId?: ObjectId;

  @Is(an.objectId().nullable())
  endUserId?: ObjectId;

  /**
   * @description We are representing the value as an object, because we don't have an exact representation of how the note will look like.
   */
  @Is(a.string().nullable())
  value?: string;
}
