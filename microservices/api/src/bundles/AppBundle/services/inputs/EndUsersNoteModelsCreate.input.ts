import { ObjectId } from "@bluelibs/ejson";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";
import { Field } from "../../collections";

@Schema()
export class EndUsersNoteModelsCreateInput {
  @Is(a.string().required())
  name: string;

  @Is(an.array().of(Schema.from(Field)))
  fields: Field[] = [];
}
