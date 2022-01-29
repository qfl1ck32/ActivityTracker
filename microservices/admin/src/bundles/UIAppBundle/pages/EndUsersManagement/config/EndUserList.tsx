import { Service } from "@bluelibs/core";
import { QueryBodyType } from "@bluelibs/x-ui";
import { EndUser } from "@bundles/UIAppBundle/collections";
import { EndUserList as BaseEndUserList } from "./EndUserList.base";

@Service({ transient: true })
export class EndUserList extends BaseEndUserList {
  build() {
    super.build();
    // Perform additional modifications such as updating how a list item renders or add additional ones
  }

  static getRequestBody(): QueryBodyType<EndUser> {
    // You have the ability to modify the request by adding certain fields or relations

    return super.getRequestBody();
  }
}
