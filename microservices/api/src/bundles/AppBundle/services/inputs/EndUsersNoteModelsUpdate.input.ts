import { ObjectId } from "@bluelibs/ejson";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";
import { Field } from "@bundles/AppBundle/collections";

@Schema()
export class EndUsersNoteModelsUpdateInput {
  @Is(an.objectId().required())
  noteModelId: ObjectId;

  @Is(an.array().of(Schema.from(Field)).nullable())
  fields?: Field[] = [];

  @Is(a.string().nullable())
  name?: string;
}
