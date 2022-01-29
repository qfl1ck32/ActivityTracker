import { Service } from "@bluelibs/core";
import { ActivityLogDetailListFiltersForm as BaseActivityLogDetailListFiltersForm } from "./ActivityLogDetailListFiltersForm.base";

@Service({ transient: true })
export class ActivityLogDetailListFiltersForm extends BaseActivityLogDetailListFiltersForm {
  build() {
    super.build();

    // Perform additional modifications such as updating rendering functions, labels, description
  }
}
