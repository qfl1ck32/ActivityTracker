/** @overridable */
import { a, Is, Schema } from "@bluelibs/validator-bundle";

@Schema()
export class FieldEnumValuesInput {
  @Is(a.string().required())
  value: string;
}
