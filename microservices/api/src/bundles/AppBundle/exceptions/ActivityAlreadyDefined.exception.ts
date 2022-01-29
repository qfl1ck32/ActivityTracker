import { Exception } from "@bluelibs/core";

export class ActivityAlreadyDefinedException extends Exception<any> {
  getMessage() {
    // Note: you have access to this.data
    return `Exception ActivityAlreadyDefined has occured.`;
  }
}
