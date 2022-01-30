import { Exception } from "@bluelibs/core";

export interface IFieldValueIsNotValidExceptionData {
  fieldName: string;
}

export class FieldValueIsNotValidException extends Exception<IFieldValueIsNotValidExceptionData> {
  getMessage() {
    // Note: you have access to this.data
    return `Exception FieldValueNotValid has occured.`;
  }
}
