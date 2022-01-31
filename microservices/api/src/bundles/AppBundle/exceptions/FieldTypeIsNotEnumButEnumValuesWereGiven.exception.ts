import { Exception } from "@bluelibs/core";

export class FieldTypeIsNotEnumButEnumValuesWereGivenException extends Exception<any> {
  getMessage() {
    // Note: you have access to this.data
    return `Exception FieldTypeIsNotEnumButEnumValuesWereGiven has occured.`;
  }
}
