/** @overridable */
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";

@Schema()
export class FieldEnumValuesCreateInput {
  @Is(a.string().nullable())
  id?: string;

  @Is(a.string().required())
  value: string;
}
