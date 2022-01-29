import { Service } from "@bluelibs/core";
import { EndUserListFiltersForm as BaseEndUserListFiltersForm } from "./EndUserListFiltersForm.base";

@Service({ transient: true })
export class EndUserListFiltersForm extends BaseEndUserListFiltersForm {
  build() {
    super.build();

    // Perform additional modifications such as updating rendering functions, labels, description
  }
}
