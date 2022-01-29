import { Schema, Is, a, an } from "@bluelibs/validator-bundle";
import { NoteModelInsertInput as BaseNoteModelInsertInput } from "./NoteModelInsert.input.base";

@Schema()
export class NoteModelInsertInput extends BaseNoteModelInsertInput {
  // You can extend the base here
}
