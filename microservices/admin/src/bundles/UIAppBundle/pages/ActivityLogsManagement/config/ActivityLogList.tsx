import { Service } from "@bluelibs/core";
import { QueryBodyType } from "@bluelibs/x-ui";
import { ActivityLog } from "@bundles/UIAppBundle/collections";
import { ActivityLogList as BaseActivityLogList } from "./ActivityLogList.base";

@Service({ transient: true })
export class ActivityLogList extends BaseActivityLogList {
  build() {
    super.build();
    // Perform additional modifications such as updating how a list item renders or add additional ones
  }

  static getRequestBody(): QueryBodyType<ActivityLog> {
    // You have the ability to modify the request by adding certain fields or relations

    return super.getRequestBody();
  }
}
