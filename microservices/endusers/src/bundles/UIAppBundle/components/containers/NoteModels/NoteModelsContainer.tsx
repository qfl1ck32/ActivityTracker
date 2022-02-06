import { useUIComponents } from '@bluelibs/x-ui-react-bundle';
import { Typography } from '@mui/material';
import { NoteModelsListContainer } from './NoteModelsListContainer';

export const NoteModelsContainer: React.FC = () => {
  const UIComponents = useUIComponents();

  return (
    <UIComponents.Layout>
      <Typography variant="h6">Note Models</Typography>

      <NoteModelsListContainer />
    </UIComponents.Layout>
  );
};
