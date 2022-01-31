import { useQuery } from '@apollo/client';
import { Container, Typography } from '@mui/material';
import { useState } from 'react';
import { NoteModel, Query } from 'src/api.types';
import { NoteModelsGetAll } from 'src/bundles/UIAppBundle/queries';

export const NoteModelsContainer: React.FC = () => {
  const [noteModels, setNoteModels] = useState<NoteModel[]>([]);

  const { loading, error } = useQuery<{ EndUsersNoteModelsGetAll: Query['EndUsersNoteModelsGetAll'] }>(
    NoteModelsGetAll,
    {
      onCompleted: (data) => setNoteModels(data.EndUsersNoteModelsGetAll),
    }
  );

  console.log(noteModels);

  return (
    <Container>
      <Typography variant="h6">Hello</Typography>
    </Container>
  );
};
