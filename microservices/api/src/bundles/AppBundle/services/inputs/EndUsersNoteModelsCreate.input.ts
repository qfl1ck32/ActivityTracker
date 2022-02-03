import { ObjectId } from "@bluelibs/ejson";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";
import { FieldInput } from "./Field.input.base";

@Schema()
export class EndUsersNoteModelsCreateInput {
  @Is(a.string().required())
  name: string;

  @Is(an.array().of(Schema.from(FieldInput)))
  fields: FieldInput[] = [];
}
