import { Service } from "@bluelibs/core";
import { ActivityCreateForm as BaseActivityCreateForm } from "./ActivityCreateForm.base";

@Service({ transient: true })
export class ActivityCreateForm extends BaseActivityCreateForm {
  build() {
    super.build();

    // Perform additional modifications such as updating rendering functions, labels, description
  }
}
