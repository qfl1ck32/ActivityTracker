import { Service } from "@bluelibs/core";
import { QueryBodyType } from "@bluelibs/x-ui";
import { Activity } from "@bundles/UIAppBundle/collections";
import { ActivityViewer as BaseActivityViewer } from "./ActivityViewer.base";

@Service({ transient: true })
export class ActivityViewer extends BaseActivityViewer {
  build() {
    super.build();

    // Perform additional modifications such as updating rendering functions, labels, description
  }

  static getRequestBody(): QueryBodyType<Activity> {
    // You have the ability to modify the request by adding certain fields or relations

    return super.getRequestBody();
  }
}
