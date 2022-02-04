/** @overridable */
import { ObjectId } from "@bluelibs/ejson";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";

@Schema()
export class FieldEnumValuesInput {
  @Is(a.string().required())
  id: string;

  @Is(a.string().required())
  value: string;
}
