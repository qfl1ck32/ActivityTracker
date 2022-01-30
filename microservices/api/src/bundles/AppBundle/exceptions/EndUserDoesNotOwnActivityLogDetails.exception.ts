import { Exception } from "@bluelibs/core";

export class EndUserDoesNotOwnActivityLogDetailsException extends Exception<any> {
  getMessage() {
    // Note: you have access to this.data
    return `Exception EndUserDoesNotOwnActivityLogDetails has occured.`;
  }
}
