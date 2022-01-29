export * from "./ActivityLog.model.base";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";
import { ActivityLog as BaseActivityLog } from "./ActivityLog.model.base";

@Schema()
export class ActivityLog extends BaseActivityLog {
  // You can extend the base here
}
