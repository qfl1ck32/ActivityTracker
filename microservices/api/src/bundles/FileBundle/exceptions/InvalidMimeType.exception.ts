import { Exception } from "@bluelibs/core";

export interface IInvalidMimeTypeExceptionData {
  expected: string[];
  received: string;
}

export class InvalidMimeTypeException extends Exception<IInvalidMimeTypeExceptionData> {
  getMessage() {
    // Note: you have access to this.data
    return `An invalid type has been provided for the file. Expected: ${this.data.expected.join(
      ", "
    )} / received: ${this.data.received}`;
  }
}
