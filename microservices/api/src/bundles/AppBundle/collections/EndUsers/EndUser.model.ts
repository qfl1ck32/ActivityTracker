export * from "./EndUser.model.base";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";
import { EndUser as BaseEndUser } from "./EndUser.model.base";

@Schema()
export class EndUser extends BaseEndUser {
  // You can extend the base here
}
