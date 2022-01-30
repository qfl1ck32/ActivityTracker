import { Exception } from "@bluelibs/core";

export class DatesAreNotInChronologicalOrderException extends Exception<any> {
  getMessage() {
    // Note: you have access to this.data
    return `Exception DatesAreNotInChronologicalOrder has occured.`;
  }
}
