import { useQuery } from '@apollo/client';
import { useUIComponents } from '@bluelibs/x-ui-react-bundle';
import { Box, Container, Typography, Button } from '@mui/material';
import { useState } from 'react';
import { Activity, Query } from 'src/api.types';
import { ActivitiesFind } from 'src/bundles/UIAppBundle/queries';
import { styleCenter } from 'src/bundles/UIAppBundle/styles';
import { ActivityLogsListContainer } from './ActivityLogsListContainer';

export const ActivityLogsContainer: React.FC = () => {
  const [createModalIsOpened, setCreateModalIsOpened] = useState(false);

  return (
    <Container>
      <Typography variant="h6">Activity Logs</Typography>

      <Button onClick={() => setCreateModalIsOpened(true)}>Create</Button>

      <ActivityLogsListContainer />
    </Container>
  );
};

/*
  const [activities, setActivities] = useState<Activity[]>([]);

  const [selectedActivity, setSelectedActivity] = useState<Activity>();

  const UIComponents = useUIComponents();

  const { loading: loadingActivities } = useQuery<{ ActivitiesFind: Query['ActivitiesFind'] }>(ActivitiesFind, {
    onCompleted: (data) => setActivities(data.ActivitiesFind),
  });

  const onCreateActivity = async (activityId: string) => {};

  if (loadingActivities) return <UIComponents.Loading />;

  return (
    <Box sx={styleCenter}>
      <Typography variant="h5"> Create a new log for the following activity:</Typography>
      <Box display="flex">
        {activities.map((activity, idx) => (
          <a key={idx} href="#">
            <Typography variant="h6" onClick={() => setSelectedActivity(activity)}>
              {activity.name}
            </Typography>
          </a>
        ))}
      </Box>
    </Box>
  );
*/
