import { Event } from '@bluelibs/core';
import { ActivityLogDetail, ActivityNote } from 'src/api.types';

export interface IActivityNoteUpdated {
  activityNote: ActivityNote;
}

export class ActivityNoteUpdatedEvent extends Event<IActivityNoteUpdated> {}
