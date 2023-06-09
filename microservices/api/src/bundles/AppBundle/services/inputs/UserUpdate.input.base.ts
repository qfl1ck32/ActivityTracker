/** @overridable */
import { ObjectId } from "@bluelibs/ejson";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";
import { UserRole } from "../../collections";

@Schema()
export class UserProfileInput {
  @Is(a.string().required())
  firstName: string;

  @Is(a.string().required())
  lastName: string;
}

@Schema()
export class UserUpdateInput {
  @Is(an.objectId().nullable())
  avatarId?: ObjectId;

  @Is(a.boolean().nullable())
  isEnabled?: boolean;

  @Is(() => Schema.from(UserProfileInput))
  profile?: UserProfileInput;

  @Is(an.array().of(a.string().oneOf(Object.values(UserRole).concat(null))))
  roles?: UserRole[] = [];
}
