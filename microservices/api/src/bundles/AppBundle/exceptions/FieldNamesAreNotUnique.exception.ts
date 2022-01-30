import { Exception } from "@bluelibs/core";

export class FieldNamesAreNotUniqueException extends Exception<any> {
  getMessage() {
    // Note: you have access to this.data
    return `Exception FieldNamesAreNotUnique has occured.`;
  }
}
