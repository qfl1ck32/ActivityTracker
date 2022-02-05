import { Exception } from "@bluelibs/core";

export class ActivityLogDetailsTimingHasAlreadyBeenFinishedException extends Exception<any> {
  getMessage() {
    // Note: you have access to this.data
    return `Exception ActivityLogDetailsTimingHasAlreadyBeenFinished has occured.`;
  }
}
