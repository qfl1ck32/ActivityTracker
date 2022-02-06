import { useUIComponents } from '@bluelibs/x-ui-react-bundle';
import { Button, Typography } from '@mui/material';
import { ActivityLogsListContainer } from './ActivityLogsListContainer';

export const ActivityLogsContainer: React.FC = () => {
  const UIComponents = useUIComponents();

  return (
    <UIComponents.Layout>
      <Typography variant="h6">Activity Logs</Typography>

      <ActivityLogsListContainer />
    </UIComponents.Layout>
  );
};
