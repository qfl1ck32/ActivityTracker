import { Button, Box, Typography } from '@mui/material';
import { useState } from 'react';
import { NoteModelsCreateModal } from '../../modals';
import { NoteModelsListContainer } from './NoteModelsListContainer';

export const NoteModelsContainer: React.FC = () => {
  const [createModalIsOpened, setCreateModalIsOpened] = useState(false);

  return (
    <Box>
      <Typography variant="h6">Note Models</Typography>

      <Button onClick={() => setCreateModalIsOpened(true)}>Create</Button>

      <NoteModelsListContainer />

      <NoteModelsCreateModal open={createModalIsOpened} onClose={() => setCreateModalIsOpened(false)} />
    </Box>
  );
};
