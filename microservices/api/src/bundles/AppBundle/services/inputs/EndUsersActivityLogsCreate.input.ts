import { ObjectId } from "@bluelibs/ejson";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";

@Schema()
export class EndUsersActivityLogsCreateInput {
  @Is(an.objectId().required())
  activityId: ObjectId;

  @Is(a.string().required())
  name: string;

  @Is(an.objectId().required())
  noteModelId: ObjectId;
}
