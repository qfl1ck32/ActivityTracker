import { useQuery } from '@apollo/client';
import { EventHandlerType } from '@bluelibs/core';
import { useEventManager, useUIComponents } from '@bluelibs/x-ui-next';
import { useEffect, useState } from 'react';
import { ActivityLog, Query } from 'src/api.types';
import { ActivityLogCreatedEvent, IActivityLogCreated } from 'src/bundles/UIAppBundle/events';
import { ActivityLogsGetAll } from 'src/bundles/UIAppBundle/queries';
import { ActivityLogsListComponent } from '../../ActivityLogsList';

export const ActivityLogsListContainer: React.FC = () => {
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);

  const UIComponents = useUIComponents();

  const { loading, error } = useQuery<{ EndUsersActivityLogsGetAll: Query['EndUsersActivityLogsGetAll'] }>(
    ActivityLogsGetAll,
    {
      onCompleted: (data) => setActivityLogs(data.EndUsersActivityLogsGetAll),
    }
  );

  const eventManager = useEventManager();

  useEffect(() => {
    const listener: EventHandlerType<IActivityLogCreated> = (e) => {
      setActivityLogs((prev) => prev.concat(e.data.activityLog));
    };

    eventManager.addListener(ActivityLogCreatedEvent, listener);

    return () => {
      eventManager.removeListener(ActivityLogCreatedEvent as any, listener); // TODO: fix from bluelibs
    };
  }, []);

  if (loading) return <UIComponents.Loading />;

  if (error) return <UIComponents.Error error={error} />;

  return <ActivityLogsListComponent activityLogs={activityLogs} />;
};
