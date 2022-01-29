import { Service } from "@bluelibs/core";
import { ActivityListFiltersForm as BaseActivityListFiltersForm } from "./ActivityListFiltersForm.base";

@Service({ transient: true })
export class ActivityListFiltersForm extends BaseActivityListFiltersForm {
  build() {
    super.build();

    // Perform additional modifications such as updating rendering functions, labels, description
  }
}
