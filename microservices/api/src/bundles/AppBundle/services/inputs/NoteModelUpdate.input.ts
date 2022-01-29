import { Schema, Is, a, an } from "@bluelibs/validator-bundle";
import { NoteModelUpdateInput as BaseNoteModelUpdateInput } from "./NoteModelUpdate.input.base";

@Schema()
export class NoteModelUpdateInput extends BaseNoteModelUpdateInput {
  // You can extend the base here
}
