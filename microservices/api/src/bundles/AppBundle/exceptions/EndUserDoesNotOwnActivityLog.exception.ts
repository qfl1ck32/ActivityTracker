import { Exception } from "@bluelibs/core";

export class EndUserDoesNotOwnActivityLogException extends Exception<any> {
  getMessage() {
    // Note: you have access to this.data
    return `Exception EndUserDoesNotOwnActivityLog has occured.`;
  }
}
