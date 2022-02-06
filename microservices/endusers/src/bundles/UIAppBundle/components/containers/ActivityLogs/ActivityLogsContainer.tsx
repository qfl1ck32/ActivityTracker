import { Button, Box, Typography } from '@mui/material';
import { useState } from 'react';
import { ActivityLogsListContainer } from './ActivityLogsListContainer';
import { ActivityLogsCreateDialog } from '../../dialogs';
import { useUIComponents } from '@bluelibs/x-ui-react-bundle';

export const ActivityLogsContainer: React.FC = () => {
  const [createEditDialogIsOpened, setCreateEditDialogIsOpened] = useState(false);

  const UIComponents = useUIComponents();

  return (
    <UIComponents.Layout>
      <Typography variant="h6">Activity Logs</Typography>

      <Button onClick={() => setCreateEditDialogIsOpened(true)}>Create</Button>

      <ActivityLogsListContainer />

      <ActivityLogsCreateDialog
        {...{ open: createEditDialogIsOpened, onClose: () => setCreateEditDialogIsOpened(false) }}
      />
    </UIComponents.Layout>
  );
};
