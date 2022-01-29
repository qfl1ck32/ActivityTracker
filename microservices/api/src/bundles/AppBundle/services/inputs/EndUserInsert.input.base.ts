/** @overridable */
import { ObjectId } from "@bluelibs/ejson";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";

@Schema()
export class EndUserInsertInput {
  @Is(a.string().required())
  email: string;

  @Is(a.string().required())
  firstName: string;

  @Is(a.string().required())
  lastName: string;

  @Is(an.objectId().required())
  ownerId: ObjectId;
}
