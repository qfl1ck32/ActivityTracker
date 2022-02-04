/** @overridable */
import { ObjectId } from "@bluelibs/ejson";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";
import { FieldEnumValuesInput } from "./FieldEnumValues.input";

@Schema()
export class FieldRulesInput {
  @Is(() => an.array().of(Schema.from(FieldEnumValuesInput)))
  enumValues: FieldEnumValuesInput[] = [];
}
