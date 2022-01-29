import { Service } from "@bluelibs/core";
import { ActivityNoteListFiltersForm as BaseActivityNoteListFiltersForm } from "./ActivityNoteListFiltersForm.base";

@Service({ transient: true })
export class ActivityNoteListFiltersForm extends BaseActivityNoteListFiltersForm {
  build() {
    super.build();

    // Perform additional modifications such as updating rendering functions, labels, description
  }
}
