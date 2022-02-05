import { Box, Modal } from '@mui/material';
import { styleCenter } from 'src/bundles/UIAppBundle/styles';
import { NoteModelsEditContainer, NoteModelsEditContainerProps } from '../../containers';

export type NoteModelsEditModalProps = {
  open: boolean;
  onClose: () => void;
} & NoteModelsEditContainerProps;

export const NoteModelsEditModal: React.FC<NoteModelsEditModalProps> = ({ open, onClose, ...noteModelsEditContainerProps }) => {
  return (
    <Modal
      {...{
        open,
        onClose,
      }}
    >
      <Box sx={styleCenter}>
        <NoteModelsEditContainer {...noteModelsEditContainerProps} />
      </Box>
    </Modal>
  );
};
