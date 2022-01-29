import { Service } from "@bluelibs/core";
import { EndUserCreateForm as BaseEndUserCreateForm } from "./EndUserCreateForm.base";

@Service({ transient: true })
export class EndUserCreateForm extends BaseEndUserCreateForm {
  build() {
    super.build();

    // Perform additional modifications such as updating rendering functions, labels, description
  }
}
