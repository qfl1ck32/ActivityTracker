import { Service } from "@bluelibs/core";
import { ActivityLogCreateForm as BaseActivityLogCreateForm } from "./ActivityLogCreateForm.base";

@Service({ transient: true })
export class ActivityLogCreateForm extends BaseActivityLogCreateForm {
  build() {
    super.build();

    // Perform additional modifications such as updating rendering functions, labels, description
  }
}
