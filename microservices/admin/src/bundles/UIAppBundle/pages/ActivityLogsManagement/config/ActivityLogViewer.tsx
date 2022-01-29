import { Service } from "@bluelibs/core";
import { QueryBodyType } from "@bluelibs/x-ui";
import { ActivityLog } from "@bundles/UIAppBundle/collections";
import { ActivityLogViewer as BaseActivityLogViewer } from "./ActivityLogViewer.base";

@Service({ transient: true })
export class ActivityLogViewer extends BaseActivityLogViewer {
  build() {
    super.build();

    // Perform additional modifications such as updating rendering functions, labels, description
  }

  static getRequestBody(): QueryBodyType<ActivityLog> {
    // You have the ability to modify the request by adding certain fields or relations

    return super.getRequestBody();
  }
}
