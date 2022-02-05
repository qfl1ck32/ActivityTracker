import { ObjectId } from "@bluelibs/ejson";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";

// TODO: I think it should be "detailId", right?
@Schema()
export class EndUsersActivityLogDetailsFinishInput {
  @Is(an.objectId().required())
  activityLogDetailsId: ObjectId;
}
