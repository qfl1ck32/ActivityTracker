import { ObjectId } from "@bluelibs/ejson";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";

@Schema()
export class FieldRules {
  @Is(an.array().of(a.string()))
  enumValues?: string[] = [];
}
