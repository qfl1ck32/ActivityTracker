import { ObjectId } from "@bluelibs/ejson";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";

@Schema()
export class EndUsersActivityLogDetailsDeleteInput {
  @Is(an.objectId().required())
  activityLogDetailId: ObjectId;
}
