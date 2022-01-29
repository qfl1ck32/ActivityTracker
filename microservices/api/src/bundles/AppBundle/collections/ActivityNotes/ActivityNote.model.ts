export * from "./ActivityNote.model.base";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";
import { ActivityNote as BaseActivityNote } from "./ActivityNote.model.base";

@Schema()
export class ActivityNote extends BaseActivityNote {
  // You can extend the base here
}
