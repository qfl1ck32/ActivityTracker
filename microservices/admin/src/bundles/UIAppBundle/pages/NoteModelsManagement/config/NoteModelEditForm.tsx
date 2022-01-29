import { Service } from "@bluelibs/core";
import { NoteModelEditForm as BaseNoteModelEditForm } from "./NoteModelEditForm.base";
import { QueryBodyType } from "@bluelibs/x-ui";
import { NoteModel } from "@bundles/UIAppBundle/collections";

@Service({ transient: true })
export class NoteModelEditForm extends BaseNoteModelEditForm {
  build() {
    super.build();

    // Perform additional modifications such as updating rendering functions, labels, description
  }

  static getRequestBody(): QueryBodyType<NoteModel> {
    // You have the ability to modify the request by adding certain fields or relations

    return super.getRequestBody();
  }
}
