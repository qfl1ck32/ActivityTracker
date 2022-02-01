import { Box, Modal } from '@mui/material';
import { styleCenter } from 'src/bundles/UIAppBundle/styles';
import { ActivityLogsCreateContainer } from '../..';

export type ActivityLogsCreateModalProps = {
  open: boolean;
  onClose: () => void;
};

export const ActivityLogsCreateModal: React.FC<ActivityLogsCreateModalProps> = ({ open, onClose }) => {
  return (
    <Modal
      {...{
        open,
        onClose,
      }}
    >
      <Box sx={styleCenter}>
        <ActivityLogsCreateContainer />
      </Box>
    </Modal>
  );
};
