import { Service } from "@bluelibs/core";
import { ActivityTimingListFiltersForm as BaseActivityTimingListFiltersForm } from "./ActivityTimingListFiltersForm.base";

@Service({ transient: true })
export class ActivityTimingListFiltersForm extends BaseActivityTimingListFiltersForm {
  build() {
    super.build();

    // Perform additional modifications such as updating rendering functions, labels, description
  }
}
