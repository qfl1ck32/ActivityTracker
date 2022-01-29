export * from "./NoteModel.model.base";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";
import { NoteModel as BaseNoteModel } from "./NoteModel.model.base";

@Schema()
export class NoteModel extends BaseNoteModel {
  // You can extend the base here
}
