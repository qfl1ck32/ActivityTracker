import { Event } from "@bluelibs/core";
import { ObjectId } from "@bluelibs/ejson";

export interface IUserProfileUpdatedEventData {
  userId: ObjectId;
}

export class UserProfileUpdatedEvent extends Event<IUserProfileUpdatedEventData> {}
