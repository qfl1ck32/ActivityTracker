import { Listener, On } from "@bluelibs/core";
import { UserProfileUpdatedEvent } from "../events";
import { EndUserService } from "../services";

export class UserProfileUpdatedListener extends Listener {
  @On(UserProfileUpdatedEvent, {})
  onMyEvent(e: UserProfileUpdatedEvent) {
    return this.container
      .get(EndUserService)
      .onUserUpdateProfile(e.data.userId);
  }
}
