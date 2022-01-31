import { Box, Modal } from '@mui/material';
import { styleCenter } from 'src/bundles/UIAppBundle/styles';
import { NoteModelsCreateContainer } from '../../containers';

export type NoteModelsCreateModalType = {
  open: boolean;
  onClose: () => void;
};

export const NoteModelsCreateModal: React.FC<NoteModelsCreateModalType> = ({ open, onClose }) => {
  return (
    <Modal
      {...{
        open,
        onClose,
      }}
    >
      <Box sx={styleCenter}>
        <NoteModelsCreateContainer />
      </Box>
    </Modal>
  );
};
