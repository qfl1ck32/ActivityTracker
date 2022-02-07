/** @overridable */
import { ObjectId } from "@bluelibs/ejson";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";
import { Activity } from "../";
import { User } from "../";
import { ActivityLogDetail } from "../";
import { EndUser } from "../";
import { NoteModel } from "../";

@Schema()
export class ActivityLog {
  @Is(an.objectId())
  _id?: ObjectId;

  activity: Activity;

  @Is(an.objectId().required())
  activityId: ObjectId;

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

  details: ActivityLogDetail[] = [];

  endUser: EndUser;

  @Is(an.objectId().required())
  endUserId: ObjectId;

  /**
   * @description This field is used to identify if this object has been soft-deleted
   */
  @Is(a.boolean().nullable())
  isDeleted?: boolean;

  noteModel: NoteModel;

  @Is(an.objectId().required())
  noteModelId: ObjectId;

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
