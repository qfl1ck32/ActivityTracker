import { Service } from "@bluelibs/core";
import { ActivityTimingCreateForm as BaseActivityTimingCreateForm } from "./ActivityTimingCreateForm.base";

@Service({ transient: true })
export class ActivityTimingCreateForm extends BaseActivityTimingCreateForm {
  build() {
    super.build();

    // Perform additional modifications such as updating rendering functions, labels, description
  }
}
