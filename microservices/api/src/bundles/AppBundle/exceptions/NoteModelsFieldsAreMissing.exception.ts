import { Exception } from "@bluelibs/core";

export class NoteModelsFieldsAreMissingException extends Exception<any> {
  getMessage() {
    // Note: you have access to this.data
    return `Exception NoteModelsFieldsAreMissing has occured.`;
  }
}
