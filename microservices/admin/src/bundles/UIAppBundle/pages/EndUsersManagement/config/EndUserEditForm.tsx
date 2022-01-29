import { Service } from "@bluelibs/core";
import { EndUserEditForm as BaseEndUserEditForm } from "./EndUserEditForm.base";
import { QueryBodyType } from "@bluelibs/x-ui";
import { EndUser } from "@bundles/UIAppBundle/collections";

@Service({ transient: true })
export class EndUserEditForm extends BaseEndUserEditForm {
  build() {
    super.build();

    // Perform additional modifications such as updating rendering functions, labels, description
  }

  static getRequestBody(): QueryBodyType<EndUser> {
    // You have the ability to modify the request by adding certain fields or relations

    return super.getRequestBody();
  }
}
