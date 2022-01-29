import { Schema, Is, a, an } from "@bluelibs/validator-bundle";
import { ActivityUpdateInput as BaseActivityUpdateInput } from "./ActivityUpdate.input.base";

@Schema()
export class ActivityUpdateInput extends BaseActivityUpdateInput {
  // You can extend the base here
}
