import { Exception } from "@bluelibs/core";

export class NoteModelsUpdateFieldsInputIsInvalidException extends Exception<any> {
  getMessage() {
    // Note: you have access to this.data
    return `Exception NoteModelsUpdateFieldsInputIsInvalid has occured.`;
  }
}
