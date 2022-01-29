import { Service } from "@bluelibs/core";
import { QueryBodyType } from "@bluelibs/x-ui";
import { ActivityLogDetail } from "@bundles/UIAppBundle/collections";
import { ActivityLogDetailList as BaseActivityLogDetailList } from "./ActivityLogDetailList.base";

@Service({ transient: true })
export class ActivityLogDetailList extends BaseActivityLogDetailList {
  build() {
    super.build();
    // Perform additional modifications such as updating how a list item renders or add additional ones
  }

  static getRequestBody(): QueryBodyType<ActivityLogDetail> {
    // You have the ability to modify the request by adding certain fields or relations

    return super.getRequestBody();
  }
}
