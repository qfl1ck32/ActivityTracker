import { Event } from '@bluelibs/core';
import { ActivityLogDetail } from 'src/api.types';

export interface IActivityLogDetailFinished {
  activityLogDetail: ActivityLogDetail;
}

export class ActivityLogDetailFinishedvent extends Event<IActivityLogDetailFinished> {}
