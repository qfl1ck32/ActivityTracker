import { Exception } from "@bluelibs/core";

export interface IFieldEnumValuesAreNotUniqueData {
  fieldName: string;
}

export class FieldEnumValuesAreNotUnique extends Exception<IFieldEnumValuesAreNotUniqueData> {
  getMessage() {
    // Note: you have access to this.data
    return `Exception FieldEnumValuesContainsDuplicates has occured.`;
  }
}
