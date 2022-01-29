import { Service } from "@bluelibs/core";
import { QueryBodyType } from "@bluelibs/x-ui";
import { ActivityNote } from "@bundles/UIAppBundle/collections";
import { ActivityNoteList as BaseActivityNoteList } from "./ActivityNoteList.base";

@Service({ transient: true })
export class ActivityNoteList extends BaseActivityNoteList {
  build() {
    super.build();
    // Perform additional modifications such as updating how a list item renders or add additional ones
  }

  static getRequestBody(): QueryBodyType<ActivityNote> {
    // You have the ability to modify the request by adding certain fields or relations

    return super.getRequestBody();
  }
}
