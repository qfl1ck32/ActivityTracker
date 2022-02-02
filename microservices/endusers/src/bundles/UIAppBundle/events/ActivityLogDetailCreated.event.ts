import { Event } from '@bluelibs/core';
import { ActivityLogDetail } from 'src/api.types';

export interface IActivityLogDetailCreated {
  activityLogDetail: ActivityLogDetail;
}

export class ActivityLogDetailCreatedEvent extends Event<IActivityLogDetailCreated> {}
