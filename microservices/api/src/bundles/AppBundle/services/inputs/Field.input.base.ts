/** @overridable */
import { ObjectId } from "@bluelibs/ejson";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";
import { FieldType } from "../../collections";
import { FieldEnumValuesInput } from "./FieldEnumValues.input.base";

@Schema()
export class FieldInput {
  @Is(a.string().required())
  name: string;

  @Is(a.string().oneOf(Object.values(FieldType)).required())
  type: FieldType;

  @Is(an.array().of(a.string()))
  enumValues: string[] = [];
}


@Schema()
export class FieldInputWithEnumValues {
  @Is(a.string().nullable())
  id?: string;

  @Is(a.string().required())
  name: string;

  @Is(a.string().oneOf(Object.values(FieldType)).required())
  type: FieldType;

  @Is(an.array().of(Schema.from(FieldEnumValuesInput)))
  enumValues: FieldEnumValuesInput[] = [];
}