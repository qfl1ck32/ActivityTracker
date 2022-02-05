import { Dialog } from '@mui/material';
import { ActivityNotesEditContainer, ActivityNotesEditContainerProps } from '../..';

export type ActivityNotesEditDialog = {
  open: boolean;

  onClose: () => void;
} & ActivityNotesEditContainerProps;

export const ActivityNotesEditDialog: React.FC<ActivityNotesEditDialog> = ({
  open,
  onClose,
  ...activityNotesEditContainerProps
}) => {
  return (
    <Dialog {...{ open, onClose }}>
      <ActivityNotesEditContainer {...activityNotesEditContainerProps} />
    </Dialog>
  );
};
