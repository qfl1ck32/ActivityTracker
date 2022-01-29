import { Service } from "@bluelibs/core";
import { QueryBodyType } from "@bluelibs/x-ui";
import { NoteModel } from "@bundles/UIAppBundle/collections";
import { NoteModelList as BaseNoteModelList } from "./NoteModelList.base";

@Service({ transient: true })
export class NoteModelList extends BaseNoteModelList {
  build() {
    super.build();
    // Perform additional modifications such as updating how a list item renders or add additional ones
  }

  static getRequestBody(): QueryBodyType<NoteModel> {
    // You have the ability to modify the request by adding certain fields or relations

    return super.getRequestBody();
  }
}
