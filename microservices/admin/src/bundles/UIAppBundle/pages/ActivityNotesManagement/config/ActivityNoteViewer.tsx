import { Service } from "@bluelibs/core";
import { QueryBodyType } from "@bluelibs/x-ui";
import { ActivityNote } from "@bundles/UIAppBundle/collections";
import { ActivityNoteViewer as BaseActivityNoteViewer } from "./ActivityNoteViewer.base";

@Service({ transient: true })
export class ActivityNoteViewer extends BaseActivityNoteViewer {
  build() {
    super.build();

    // Perform additional modifications such as updating rendering functions, labels, description
  }

  static getRequestBody(): QueryBodyType<ActivityNote> {
    // You have the ability to modify the request by adding certain fields or relations

    return super.getRequestBody();
  }
}
