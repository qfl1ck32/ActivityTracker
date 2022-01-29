import { Service } from "@bluelibs/core";
import { ActivityEditForm as BaseActivityEditForm } from "./ActivityEditForm.base";
import { QueryBodyType } from "@bluelibs/x-ui";
import { Activity } from "@bundles/UIAppBundle/collections";

@Service({ transient: true })
export class ActivityEditForm extends BaseActivityEditForm {
  build() {
    super.build();

    // Perform additional modifications such as updating rendering functions, labels, description
  }

  static getRequestBody(): QueryBodyType<Activity> {
    // You have the ability to modify the request by adding certain fields or relations

    return super.getRequestBody();
  }
}
