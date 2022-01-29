/** @overridable */
import { ObjectId } from "@bluelibs/ejson";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";
import { EndUser } from "../";
import { Field } from "../shared/Field";

@Schema()
export class NoteModel {
  @Is(an.objectId())
  _id?: ObjectId;

  /**
   * @description Represents the date when this object was created
   */
  @Is(a.date().required())
  createdAt: Date;

  endUser: EndUser;

  @Is(an.objectId().required())
  endUserId: ObjectId;

  @Is(() => an.array().of(Schema.from(Field)))
  fields: Field[] = [];

  @Is(a.string().required())
  name: string;

  /**
   * @description Represents the last time when the object was updated
   */
  @Is(a.date().required())
  updatedAt: Date;
}
