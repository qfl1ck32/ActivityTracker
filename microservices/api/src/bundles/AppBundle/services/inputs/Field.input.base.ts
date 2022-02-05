/** @overridable */
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";
import { FieldType } from "../../collections";

@Schema()
export class FieldInput {
  @Is(a.string().required())
  name: string;

  @Is(a.string().oneOf(Object.values(FieldType)).required())
  type: FieldType;

  @Is(an.array().of(a.string()))
  enumValues: string[] = [];
}
