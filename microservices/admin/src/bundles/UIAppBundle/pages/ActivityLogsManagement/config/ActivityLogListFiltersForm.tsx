import { Service } from "@bluelibs/core";
import { ActivityLogListFiltersForm as BaseActivityLogListFiltersForm } from "./ActivityLogListFiltersForm.base";

@Service({ transient: true })
export class ActivityLogListFiltersForm extends BaseActivityLogListFiltersForm {
  build() {
    super.build();

    // Perform additional modifications such as updating rendering functions, labels, description
  }
}
