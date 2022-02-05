import { Exception } from "@bluelibs/core";

export class NoteModelsTypeOfExistingFieldCanNotBeChangedException extends Exception<any> {
  getMessage() {
    // Note: you have access to this.data
    return `Exception NoteModelsTypeOfExistingFieldCanNotBeChanged has occured.`;
  }
}
