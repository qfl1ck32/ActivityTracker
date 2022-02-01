import { ObjectId } from "@bluelibs/ejson";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";

@Schema()
export class EndUsersActivityLogsGetOneInput {
  @Is(an.objectId().required())
  activityLogId: ObjectId;
}
