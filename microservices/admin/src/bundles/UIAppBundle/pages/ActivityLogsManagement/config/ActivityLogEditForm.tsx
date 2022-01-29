import { Service } from "@bluelibs/core";
import { ActivityLogEditForm as BaseActivityLogEditForm } from "./ActivityLogEditForm.base";
import { QueryBodyType } from "@bluelibs/x-ui";
import { ActivityLog } from "@bundles/UIAppBundle/collections";

@Service({ transient: true })
export class ActivityLogEditForm extends BaseActivityLogEditForm {
  build() {
    super.build();

    // Perform additional modifications such as updating rendering functions, labels, description
  }

  static getRequestBody(): QueryBodyType<ActivityLog> {
    // You have the ability to modify the request by adding certain fields or relations

    return super.getRequestBody();
  }
}
