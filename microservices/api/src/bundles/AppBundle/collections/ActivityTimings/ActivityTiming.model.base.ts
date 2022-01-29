/** @overridable */
import { ObjectId } from "@bluelibs/ejson";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";
import { ActivityLog } from "../";
import { User } from "../";
import { EndUser } from "../";

@Schema()
export class ActivityTiming {
  @Is(an.objectId())
  _id?: ObjectId;

  activityLog: ActivityLog;

  @Is(an.objectId().required())
  activityLogId: ObjectId;

  /**
   * @description Represents the date when this object was created
   */
  @Is(a.date().required())
  createdAt: Date;

  /**
   * @description Represents the user who has created this object
   */
  createdBy?: User;

  /**
   * @description Represents the user's id who has created this object
   */
  @Is(an.objectId().nullable())
  createdById?: ObjectId;

  endUser: EndUser;

  @Is(an.objectId().required())
  endUserId: ObjectId;

  @Is(a.date().nullable())
  finishedAt?: Date;

  @Is(a.string().required())
  name: string;

  @Is(a.date().required())
  startedAt: Date;

  /**
   * @description Represents the last time when the object was updated
   */
  @Is(a.date().required())
  updatedAt: Date;

  /**
   * @description Represents the user who has made the latest update on this object
   */
  updatedBy?: User;

  /**
   * @description Represents the user's id who has made the latest update on this object
   */
  @Is(an.objectId().nullable())
  updatedById?: ObjectId;
}
