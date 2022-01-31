import { Button, Container, Typography } from '@mui/material';
import { useState } from 'react';
import { NoteModelsCreateModal } from '../../modals';
import { NoteModelsListContainer } from './NoteModelsListContainer';

export const NoteModelsContainer: React.FC = () => {
  const [createModalIsOpened, setCreateModalIsOpened] = useState(false);

  return (
    <Container>
      <Typography variant="h6">Hello</Typography>

      <Button onClick={() => setCreateModalIsOpened((prev) => !prev)}>Create</Button>

      <NoteModelsListContainer />

      <NoteModelsCreateModal open={createModalIsOpened} onClose={() => setCreateModalIsOpened(false)} />
    </Container>
  );
};
