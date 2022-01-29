/** @overridable */
import { ObjectId } from "@bluelibs/ejson";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";

@Schema()
export class FieldRulesInput {
  @Is(an.array().of(a.string()))
  enumValues?: string[] = [];
}
