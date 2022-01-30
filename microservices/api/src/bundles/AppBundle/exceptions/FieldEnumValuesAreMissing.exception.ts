import { Exception } from "@bluelibs/core";

export class FieldEnumValuesAreMissingException extends Exception<any> {
  getMessage() {
    // Note: you have access to this.data
    return `Exception FieldEnumValuesAreMissing has occured.`;
  }
}
