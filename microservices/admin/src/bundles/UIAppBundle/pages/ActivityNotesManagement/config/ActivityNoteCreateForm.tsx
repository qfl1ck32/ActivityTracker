import { Service } from "@bluelibs/core";
import { ActivityNoteCreateForm as BaseActivityNoteCreateForm } from "./ActivityNoteCreateForm.base";

@Service({ transient: true })
export class ActivityNoteCreateForm extends BaseActivityNoteCreateForm {
  build() {
    super.build();

    // Perform additional modifications such as updating rendering functions, labels, description
  }
}
