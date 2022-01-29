import { Service } from "@bluelibs/core";
import { QueryBodyType } from "@bluelibs/x-ui";
import { EndUser } from "@bundles/UIAppBundle/collections";
import { EndUserViewer as BaseEndUserViewer } from "./EndUserViewer.base";

@Service({ transient: true })
export class EndUserViewer extends BaseEndUserViewer {
  build() {
    super.build();

    // Perform additional modifications such as updating rendering functions, labels, description
  }

  static getRequestBody(): QueryBodyType<EndUser> {
    // You have the ability to modify the request by adding certain fields or relations

    return super.getRequestBody();
  }
}
