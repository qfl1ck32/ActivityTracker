import { ObjectId } from "@bluelibs/ejson";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";

@Schema()
export class EndUsersActivityLogDetailsCreateInput {
  @Is(an.objectId().required())
  activityLogId: ObjectId;
}
