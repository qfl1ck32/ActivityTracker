import { Exception } from "@bluelibs/core";

export class ActivityLogAlreadyExistsForGivenActivityException extends Exception<any> {
  getMessage() {
    // Note: you have access to this.data
    return "You already have a log for the given activity.";
  }
}
