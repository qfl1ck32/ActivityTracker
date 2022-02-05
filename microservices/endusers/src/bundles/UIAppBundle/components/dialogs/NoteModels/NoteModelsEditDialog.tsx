import { Dialog } from '@mui/material';
import { NoteModelsEditContainer, NoteModelsEditContainerProps } from '../../containers';

export type NoteModelsEditDialogProps = {
  open: boolean;
  onClose: () => void;
} & NoteModelsEditContainerProps;

export const NoteModelsEditDialog: React.FC<NoteModelsEditDialogProps> = ({
  open,
  onClose,
  ...noteModelsEditContainerProps
}) => {
  return (
    <Dialog
      {...{
        open,
        onClose,
      }}
    >
      <NoteModelsEditContainer {...noteModelsEditContainerProps} />
    </Dialog>
  );
};
