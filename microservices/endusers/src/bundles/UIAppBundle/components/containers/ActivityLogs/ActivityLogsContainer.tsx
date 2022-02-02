import { Button, Box, Typography } from '@mui/material';
import { useState } from 'react';
import { ActivityLogsCreateModal } from '../..';
import { ActivityLogsListContainer } from './ActivityLogsListContainer';

export const ActivityLogsContainer: React.FC = () => {
  const [createModalIsOpened, setCreateModalIsOpened] = useState(false);

  return (
    <Box>
      <Typography variant="h6">Activity Logs</Typography>

      <Button onClick={() => setCreateModalIsOpened(true)}>Create</Button>

      <ActivityLogsListContainer />

      <ActivityLogsCreateModal {...{ open: createModalIsOpened, onClose: () => setCreateModalIsOpened(false) }} />
    </Box>
  );
};
