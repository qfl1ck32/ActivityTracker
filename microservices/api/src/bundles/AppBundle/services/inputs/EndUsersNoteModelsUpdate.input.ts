import { ObjectId } from "@bluelibs/ejson";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";
import { FieldInputWithEnumValues } from "./Field.input.base";

@Schema()
export class EndUsersNoteModelsUpdateInput {
  @Is(an.objectId().required())
  noteModelId: ObjectId;

  @Is(an.array().of(Schema.from(FieldInputWithEnumValues)).nullable())
  fields?: FieldInputWithEnumValues[] = [];

  @Is(a.string().nullable())
  name?: string;
}
