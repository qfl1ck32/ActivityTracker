import { Event } from '@bluelibs/core';

export interface IActivityLogDetailDeleted {
  activityLogDetailId: string;
}

export class ActivityLogDetailDeletedEvent extends Event<IActivityLogDetailDeleted> {}
