/** @overridable */
import { ObjectId } from "@bluelibs/ejson";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";

@Schema()
export class EndUserUpdateInput {
  @Is(a.string().nullable())
  email?: string;

  @Is(a.string().nullable())
  firstName?: string;

  @Is(a.string().nullable())
  lastName?: string;

  @Is(an.objectId().nullable())
  ownerId?: ObjectId;
}
