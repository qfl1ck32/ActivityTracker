import { useUIComponents } from '@bluelibs/x-ui-react-bundle';
import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import { NoteModelsCreateDialog } from '../../dialogs';
import { NoteModelsListContainer } from './NoteModelsListContainer';

export const NoteModelsContainer: React.FC = () => {
  const [createEditDialogIsOpened, setCreateEditDialogIsOpened] = useState(false);

  const UIComponents = useUIComponents();

  return (
    <UIComponents.Layout>
      <Typography variant="h6">Note Models</Typography>

      <Button onClick={() => setCreateEditDialogIsOpened(true)}>Create</Button>

      <NoteModelsListContainer />

      <NoteModelsCreateDialog open={createEditDialogIsOpened} onClose={() => setCreateEditDialogIsOpened(false)} />
    </UIComponents.Layout>
  );
};
