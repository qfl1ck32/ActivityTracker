import { Service } from "@bluelibs/core";
import { NoteModelListFiltersForm as BaseNoteModelListFiltersForm } from "./NoteModelListFiltersForm.base";

@Service({ transient: true })
export class NoteModelListFiltersForm extends BaseNoteModelListFiltersForm {
  build() {
    super.build();

    // Perform additional modifications such as updating rendering functions, labels, description
  }
}
