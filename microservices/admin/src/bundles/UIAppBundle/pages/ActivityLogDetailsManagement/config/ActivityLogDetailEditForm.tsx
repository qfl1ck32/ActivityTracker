import { Service } from "@bluelibs/core";
import { ActivityLogDetailEditForm as BaseActivityLogDetailEditForm } from "./ActivityLogDetailEditForm.base";
import { QueryBodyType } from "@bluelibs/x-ui";
import { ActivityLogDetail } from "@bundles/UIAppBundle/collections";

@Service({ transient: true })
export class ActivityLogDetailEditForm extends BaseActivityLogDetailEditForm {
  build() {
    super.build();

    // Perform additional modifications such as updating rendering functions, labels, description
  }

  static getRequestBody(): QueryBodyType<ActivityLogDetail> {
    // You have the ability to modify the request by adding certain fields or relations

    return super.getRequestBody();
  }
}
