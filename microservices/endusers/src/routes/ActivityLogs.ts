import { IRoute } from '@bluelibs/x-ui-next';

export const ActivityLogs: IRoute = {
  name: 'Activity Logs',
  path: '/activity-logs',
};

export const ActivityLog: IRoute<{ id: string }> = {
  name: 'Activity log',
  path: '/activity-logs/:id',
};
