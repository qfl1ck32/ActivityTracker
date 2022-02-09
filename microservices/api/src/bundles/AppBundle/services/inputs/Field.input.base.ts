/** @overridable */
import { ObjectId } from "@bluelibs/ejson";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";
import { FieldType } from "../../collections";
import { FieldEnumValuesInput } from "./FieldEnumValues.input";

@Schema()
export class FieldInput {
  @Is(a.string().required())
  id: string;

  @Is(a.string().required())
  name: string;

  @Is(a.boolean().required())
  isArray: boolean;

  @Is(a.string().oneOf(Object.values(FieldType).concat(null)).required())
  type: FieldType;

  @Is(() => an.array().of(Schema.from(FieldEnumValuesInput)))
  enumValues: FieldEnumValuesInput[] = [];
}
