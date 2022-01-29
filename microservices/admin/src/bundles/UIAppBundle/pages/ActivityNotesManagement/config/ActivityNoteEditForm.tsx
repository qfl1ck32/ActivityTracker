import { Service } from "@bluelibs/core";
import { ActivityNoteEditForm as BaseActivityNoteEditForm } from "./ActivityNoteEditForm.base";
import { QueryBodyType } from "@bluelibs/x-ui";
import { ActivityNote } from "@bundles/UIAppBundle/collections";

@Service({ transient: true })
export class ActivityNoteEditForm extends BaseActivityNoteEditForm {
  build() {
    super.build();

    // Perform additional modifications such as updating rendering functions, labels, description
  }

  static getRequestBody(): QueryBodyType<ActivityNote> {
    // You have the ability to modify the request by adding certain fields or relations

    return super.getRequestBody();
  }
}
