import { Dialog } from '@mui/material';
import { ActivityLogsCreateContainer } from '../..';

export type ActivityLogsCreateDialogProps = {
  open: boolean;
  onClose: () => void;
};

export const ActivityLogsCreateDialog: React.FC<ActivityLogsCreateDialogProps> = ({ open, onClose }) => {
  return (
    <Dialog
      {...{
        open,
        onClose,
      }}
    >
      <ActivityLogsCreateContainer />
    </Dialog>
  );
};
