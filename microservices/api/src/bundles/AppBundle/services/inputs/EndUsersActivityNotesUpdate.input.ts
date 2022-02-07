import { ObjectId } from "@bluelibs/ejson";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";

@Schema()
export class EndUsersActivityNotesUpdateInput {
  @Is(an.objectId().required())
  activityLogDetailId: ObjectId;

  @Is(a.string().required())
  value: string;
}
