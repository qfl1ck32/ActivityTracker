import { useQuery } from '@apollo/client';
import { useRouter, useUIComponents } from '@bluelibs/x-ui-next';
import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import { ActivityLog, EndUsersActivityLogsGetOneInput, Query } from 'src/api.types';
import { ActivityLogsGetOne } from 'src/bundles/UIAppBundle/queries';
import { ActivityLogDetailsCreateModal } from '../..';

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
    </Box>
  );
};
