import { ObjectId } from "@bluelibs/ejson";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";
import { FieldEnumValues } from "../shared/FieldEnumValues";

@Schema()
export class FieldRules {
  @Is(() => an.array().of(Schema.from(FieldEnumValues)))
  enumValues: FieldEnumValues[] = [];
}
