import { Service } from "@bluelibs/core";
import { QueryBodyType } from "@bluelibs/x-ui";
import { NoteModel } from "@bundles/UIAppBundle/collections";
import { NoteModelViewer as BaseNoteModelViewer } from "./NoteModelViewer.base";

@Service({ transient: true })
export class NoteModelViewer extends BaseNoteModelViewer {
  build() {
    super.build();

    // Perform additional modifications such as updating rendering functions, labels, description
  }

  static getRequestBody(): QueryBodyType<NoteModel> {
    // You have the ability to modify the request by adding certain fields or relations

    return super.getRequestBody();
  }
}
