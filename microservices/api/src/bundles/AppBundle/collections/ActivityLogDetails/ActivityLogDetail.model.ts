export * from "./ActivityLogDetail.model.base";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";
import { ActivityLogDetail as BaseActivityLogDetail } from "./ActivityLogDetail.model.base";

@Schema()
export class ActivityLogDetail extends BaseActivityLogDetail {
  // You can extend the base here
}
