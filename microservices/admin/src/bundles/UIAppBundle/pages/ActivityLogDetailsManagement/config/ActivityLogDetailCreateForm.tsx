import { Service } from "@bluelibs/core";
import { ActivityLogDetailCreateForm as BaseActivityLogDetailCreateForm } from "./ActivityLogDetailCreateForm.base";

@Service({ transient: true })
export class ActivityLogDetailCreateForm extends BaseActivityLogDetailCreateForm {
  build() {
    super.build();

    // Perform additional modifications such as updating rendering functions, labels, description
  }
}
