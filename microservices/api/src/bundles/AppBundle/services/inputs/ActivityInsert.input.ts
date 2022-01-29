import { Schema, Is, a, an } from "@bluelibs/validator-bundle";
import { ActivityInsertInput as BaseActivityInsertInput } from "./ActivityInsert.input.base";

@Schema()
export class ActivityInsertInput extends BaseActivityInsertInput {
  // You can extend the base here
}
