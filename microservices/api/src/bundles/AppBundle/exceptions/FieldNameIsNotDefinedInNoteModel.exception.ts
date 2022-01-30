import { Exception } from "@bluelibs/core";

export interface IFieldNameIsNotDefinedInNoteModelExceptionData {
  fieldName: string;
}

export class FieldNameIsNotDefinedInNoteModelException extends Exception<IFieldNameIsNotDefinedInNoteModelExceptionData> {
  getMessage() {
    // Note: you have access to this.data
    return `The field ${this.data.fieldName} is not defined by the Note Model.`;
  }
}
