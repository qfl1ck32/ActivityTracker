import { ObjectId } from "@bluelibs/ejson";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";
import { FieldEnumValues } from "../shared/FieldEnumValues";
import { FieldType } from "./enums/FieldType.enum";
export { FieldType };

@Schema()
export class Field {
  @Is(a.string().required())
  id: string;

  @Is(a.string().required())
  name: string;

  @Is(a.string().oneOf(Object.values(FieldType)).required())
  type: FieldType;

  @Is(() => an.array().of(Schema.from(FieldEnumValues)))
  enumValues: FieldEnumValues[] = [];
}
