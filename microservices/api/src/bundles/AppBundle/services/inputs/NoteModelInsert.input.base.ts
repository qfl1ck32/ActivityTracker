/** @overridable */
import { ObjectId } from "@bluelibs/ejson";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";
import { FieldInput } from "./Field.input";

@Schema()
export class NoteModelInsertInput {
  @Is(an.objectId().required())
  endUserId: ObjectId;

  @Is(() => an.array().of(Schema.from(FieldInput)))
  fields: FieldInput[] = [];

  @Is(a.string().required())
  name: string;
}
