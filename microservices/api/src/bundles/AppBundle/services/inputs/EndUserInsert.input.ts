import { Schema, Is, a, an } from "@bluelibs/validator-bundle";
import { EndUserInsertInput as BaseEndUserInsertInput } from "./EndUserInsert.input.base";

@Schema()
export class EndUserInsertInput extends BaseEndUserInsertInput {
  // You can extend the base here
}
