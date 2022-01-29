import { Service } from "@bluelibs/core";
import { QueryBodyType } from "@bluelibs/x-ui";
import { ActivityTiming } from "@bundles/UIAppBundle/collections";
import { ActivityTimingList as BaseActivityTimingList } from "./ActivityTimingList.base";

@Service({ transient: true })
export class ActivityTimingList extends BaseActivityTimingList {
  build() {
    super.build();
    // Perform additional modifications such as updating how a list item renders or add additional ones
  }

  static getRequestBody(): QueryBodyType<ActivityTiming> {
    // You have the ability to modify the request by adding certain fields or relations

    return super.getRequestBody();
  }
}
