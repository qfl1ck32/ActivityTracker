import { ObjectId } from "@bluelibs/ejson";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";

@Schema()
export class EndUsersActivityLogDetailsCreateInput {
  @Is(an.objectId().required())
  activityLogId: ObjectId;

  @Is(a.date().required())
  startedAt: Date;

  @Is(a.date().required())
  finishedAt: Date;

  @Is(a.string().nullable())
  noteDetailsValue?: string;
}
