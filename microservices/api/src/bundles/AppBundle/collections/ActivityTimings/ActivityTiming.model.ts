export * from "./ActivityTiming.model.base";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";
import { ActivityTiming as BaseActivityTiming } from "./ActivityTiming.model.base";

@Schema()
export class ActivityTiming extends BaseActivityTiming {
  // You can extend the base here
}
