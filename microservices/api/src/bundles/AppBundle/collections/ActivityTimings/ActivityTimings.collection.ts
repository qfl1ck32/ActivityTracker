import { Collection, Behaviors } from "@bluelibs/mongo-bundle";
import { Behaviors as XBehaviors } from "@bluelibs/x-bundle";
import * as links from "./ActivityTimings.links";
import * as reducers from "./ActivityTimings.reducers";
import { ActivityTiming } from "./ActivityTiming.model";

export class ActivityTimingsCollection extends Collection<ActivityTiming> {
  static collectionName = "activityTimings";
  static model = ActivityTiming;

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
