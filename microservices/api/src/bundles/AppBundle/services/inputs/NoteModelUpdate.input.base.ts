/** @overridable */
import { ObjectId } from "@bluelibs/ejson";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";
import { FieldInput } from "./Field.input";

@Schema()
export class NoteModelUpdateInput {
  @Is(an.objectId().nullable())
  endUserId?: ObjectId;

  @Is(() => an.array().of(Schema.from(FieldInput)))
  fields?: FieldInput[] = [];

  @Is(a.string().nullable())
  name?: string;
}
