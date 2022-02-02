import { useQuery } from '@apollo/client';
import { EventHandlerType } from '@bluelibs/core';
import { useEventManager, useRouter, useUIComponents } from '@bluelibs/x-ui-next';
import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ActivityLog, EndUsersActivityLogsGetOneInput, Query } from 'src/api.types';
import { ActivityLogDetailCreatedEvent, IActivityLogDetailCreated } from 'src/bundles/UIAppBundle/events';
import { ActivityLogsGetOne } from 'src/bundles/UIAppBundle/queries';
import { ActivityLogDetailsCreateModal, ActivityLogDetailsListComponent } from '../..';

export const ActivityLogContainer: React.FC = () => {
  const router = useRouter();

  const [activityLog, setActivityLog] = useState<ActivityLog>();

  const [isCreateModalOpened, setIsCreateModalOpened] = useState(false);

  const UIComponents = useUIComponents();

  const activityLogId = router.next.query.id;

  const { loading: activityLogLoading, error: activityLogError } = useQuery<
    { EndUsersActivityLogsGetOne: Query['EndUsersActivityLogsGetOne'] },
    { input: EndUsersActivityLogsGetOneInput }
  >(ActivityLogsGetOne, {
    variables: {
      input: {
        activityLogId,
      },
    },

    onCompleted: (data) => setActivityLog(data.EndUsersActivityLogsGetOne),
  });

  const eventManager = useEventManager();

  useEffect(() => {
    const listener: EventHandlerType<IActivityLogDetailCreated> = (e) => {
      const details = [...(activityLog as ActivityLog).details];

      details.push(e.data.activityLogDetail);

      setActivityLog((previousActivityLog) => {
        const activityLog = previousActivityLog as ActivityLog;

        return {
          ...activityLog,

          details,
        };
      });
    };

    eventManager.addListener(ActivityLogDetailCreatedEvent, listener);

    return () => {
      eventManager.removeListener(ActivityLogDetailCreatedEvent as any, listener); // TODO: fix in BL
    };
  }, []);

  if (activityLogError) return <UIComponents.Error error={activityLogError} />;

  if (activityLogLoading || activityLog === undefined) return <UIComponents.Loading />;

  return (
    <Box>
      <Typography variant="h6">{activityLog.name}</Typography>

      <Button onClick={() => setIsCreateModalOpened(true)}>Add new log</Button>

      <ActivityLogDetailsCreateModal
        {...{
          open: isCreateModalOpened,
          onClose: () => setIsCreateModalOpened(false),
          createContainerProps: { activityLog },
        }}
      />

      <ActivityLogDetailsListComponent details={activityLog.details} />
    </Box>
  );
};
