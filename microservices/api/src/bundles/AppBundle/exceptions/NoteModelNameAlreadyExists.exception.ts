import { Exception } from "@bluelibs/core";

export class NoteModelNameAlreadyExistsException extends Exception<any> {
  getMessage() {
    // Note: you have access to this.data
    return `Exception NoteModelNameAlreadyExists has occured.`;
  }
}
