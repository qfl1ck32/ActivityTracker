import { Service } from "@bluelibs/core";
import { QueryBodyType } from "@bluelibs/x-ui";
import { Activity } from "@bundles/UIAppBundle/collections";
import { ActivityList as BaseActivityList } from "./ActivityList.base";

@Service({ transient: true })
export class ActivityList extends BaseActivityList {
  build() {
    super.build();
    // Perform additional modifications such as updating how a list item renders or add additional ones
  }

  static getRequestBody(): QueryBodyType<Activity> {
    // You have the ability to modify the request by adding certain fields or relations

    return super.getRequestBody();
  }
}
