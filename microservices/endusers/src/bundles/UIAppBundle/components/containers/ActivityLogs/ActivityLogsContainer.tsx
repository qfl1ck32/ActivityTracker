import { Button, Box, Typography } from '@mui/material';
import { useState } from 'react';
import { ActivityLogsListContainer } from './ActivityLogsListContainer';
import { ActivityLogsCreateDialog } from '../../dialogs';

export const ActivityLogsContainer: React.FC = () => {
  const [createEditDialogIsOpened, setCreateEditDialogIsOpened] = useState(false);

  return (
    <Box>
      <Typography variant="h6">Activity Logs</Typography>

      <Button onClick={() => setCreateEditDialogIsOpened(true)}>Create</Button>

      <ActivityLogsListContainer />

      <ActivityLogsCreateDialog
        {...{ open: createEditDialogIsOpened, onClose: () => setCreateEditDialogIsOpened(false) }}
      />
    </Box>
  );
};
