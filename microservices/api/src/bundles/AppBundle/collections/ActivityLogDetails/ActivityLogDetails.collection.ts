import { Collection, Behaviors } from "@bluelibs/mongo-bundle";
import { Behaviors as XBehaviors } from "@bluelibs/x-bundle";
import * as links from "./ActivityLogDetails.links";
import * as reducers from "./ActivityLogDetails.reducers";
import { ActivityLogDetail } from "./ActivityLogDetail.model";

export class ActivityLogDetailsCollection extends Collection<ActivityLogDetail> {
  static collectionName = "activityLogDetails";
  static model = ActivityLogDetail;

  static links = links;
  static reducers = reducers;

  static behaviors = [
    Behaviors.Timestampable(),

    Behaviors.Blameable(),

    Behaviors.Softdeletable(),

    XBehaviors.Live(),
  ];

  // Create an array of indexes
  static indexes = [
    { key: { isDeleted: 1 } },
    { key: { createdAt: 1 } },
    { key: { createdBy: 1 } },
  ];
}
