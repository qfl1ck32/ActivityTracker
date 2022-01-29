import { Schema, Is, a, an } from "@bluelibs/validator-bundle";
import { ActivityLogInsertInput as BaseActivityLogInsertInput } from "./ActivityLogInsert.input.base";

@Schema()
export class ActivityLogInsertInput extends BaseActivityLogInsertInput {
  // You can extend the base here
}
