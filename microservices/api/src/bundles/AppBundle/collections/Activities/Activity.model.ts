export * from "./Activity.model.base";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";
import { Activity as BaseActivity } from "./Activity.model.base";

@Schema()
export class Activity extends BaseActivity {
  // You can extend the base here
}
