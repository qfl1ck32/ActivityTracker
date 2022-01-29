import { Collection, Behaviors } from "@bluelibs/mongo-bundle";
import { Behaviors as XBehaviors } from "@bluelibs/x-bundle";
import * as links from "./ActivityLogs.links";
import * as reducers from "./ActivityLogs.reducers";
import { ActivityLog } from "./ActivityLog.model";

export class ActivityLogsCollection extends Collection<ActivityLog> {
  static collectionName = "activityLogs";
  static model = ActivityLog;

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
