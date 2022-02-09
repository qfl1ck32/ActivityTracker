import { Schema, Is, a, an } from "@bluelibs/validator-bundle";
import { FieldType } from "@bundles/AppBundle/collections";
import { FieldEnumValuesInput } from "./FieldEnumValues.input";

@Schema()
export class FieldInputWithEnumValues {
  @Is(a.string().nullable())
  id?: string;

  @Is(a.string().required())
  name: string;

  @Is(a.string().oneOf(Object.values(FieldType)).required())
  type: FieldType;

  @Is(a.boolean().required())
  isArray: boolean;

  @Is(an.array().of(Schema.from(FieldEnumValuesInput)))
  enumValues: FieldEnumValuesInput[] = [];
}
