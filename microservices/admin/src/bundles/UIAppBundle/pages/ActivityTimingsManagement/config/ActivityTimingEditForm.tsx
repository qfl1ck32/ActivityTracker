import { Service } from "@bluelibs/core";
import { ActivityTimingEditForm as BaseActivityTimingEditForm } from "./ActivityTimingEditForm.base";
import { QueryBodyType } from "@bluelibs/x-ui";
import { ActivityTiming } from "@bundles/UIAppBundle/collections";

@Service({ transient: true })
export class ActivityTimingEditForm extends BaseActivityTimingEditForm {
  build() {
    super.build();

    // Perform additional modifications such as updating rendering functions, labels, description
  }

  static getRequestBody(): QueryBodyType<ActivityTiming> {
    // You have the ability to modify the request by adding certain fields or relations

    return super.getRequestBody();
  }
}
