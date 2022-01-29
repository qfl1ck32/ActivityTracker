import { Service } from "@bluelibs/core";
import { NoteModelCreateForm as BaseNoteModelCreateForm } from "./NoteModelCreateForm.base";

@Service({ transient: true })
export class NoteModelCreateForm extends BaseNoteModelCreateForm {
  build() {
    super.build();

    // Perform additional modifications such as updating rendering functions, labels, description
  }
}
