import { ObjectId } from "@bluelibs/ejson";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";

@Schema()
export class FieldEnumValues {
  @Is(a.string().required())
  id: string;

  @Is(a.string().required())
  value: string;
}
