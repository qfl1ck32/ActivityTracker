import { Event } from '@bluelibs/core';
import { ActivityLog } from 'src/api.types';

export interface IActivityLogCreated {
  activityLog: ActivityLog;
}

export class ActivityLogCreatedEvent extends Event<IActivityLogCreated> {}
