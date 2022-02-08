import { ObjectId } from "@bluelibs/ejson";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";
import { FieldCreateInput } from "./FieldCreate.input";

@Schema()
export class EndUsersNoteModelsCreateInput {
  @Is(a.string().required())
  name: string;

  @Is(an.array().of(Schema.from(FieldCreateInput)))
  fields: FieldCreateInput[] = [];
}
