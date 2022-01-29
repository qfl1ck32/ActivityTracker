import { Exception } from "@bluelibs/core";

export class EndUserDoesNotOwnNoteModelException extends Exception<any> {
  getMessage() {
    // Note: you have access to this.data
    return `Exception EndUserDoesNotOwnNoteModel has occured.`;
  }
}
