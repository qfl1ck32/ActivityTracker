import { Service } from "@bluelibs/core";
import { QueryBodyType } from "@bluelibs/x-ui";
import { ActivityTiming } from "@bundles/UIAppBundle/collections";
import { ActivityTimingViewer as BaseActivityTimingViewer } from "./ActivityTimingViewer.base";

@Service({ transient: true })
export class ActivityTimingViewer extends BaseActivityTimingViewer {
  build() {
    super.build();

    // Perform additional modifications such as updating rendering functions, labels, description
  }

  static getRequestBody(): QueryBodyType<ActivityTiming> {
    // You have the ability to modify the request by adding certain fields or relations

    return super.getRequestBody();
  }
}
