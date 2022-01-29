import { Service } from "@bluelibs/core";
import { QueryBodyType } from "@bluelibs/x-ui";
import { ActivityLogDetail } from "@bundles/UIAppBundle/collections";
import { ActivityLogDetailViewer as BaseActivityLogDetailViewer } from "./ActivityLogDetailViewer.base";

@Service({ transient: true })
export class ActivityLogDetailViewer extends BaseActivityLogDetailViewer {
  build() {
    super.build();

    // Perform additional modifications such as updating rendering functions, labels, description
  }

  static getRequestBody(): QueryBodyType<ActivityLogDetail> {
    // You have the ability to modify the request by adding certain fields or relations

    return super.getRequestBody();
  }
}
