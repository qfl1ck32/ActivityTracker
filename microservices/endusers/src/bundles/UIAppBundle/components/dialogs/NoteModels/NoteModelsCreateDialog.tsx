import { Dialog } from '@mui/material';
import { NoteModelsCreateContainer } from '../../containers';

export type NoteModelsCreateDialogProps = {
  open: boolean;
  onClose: () => void;
};

export const NoteModelsCreateDialog: React.FC<NoteModelsCreateDialogProps> = ({ open, onClose }) => {
  return (
    <Dialog
      {...{
        open,
        onClose,
      }}
    >
      <NoteModelsCreateContainer />
    </Dialog>
  );
};
