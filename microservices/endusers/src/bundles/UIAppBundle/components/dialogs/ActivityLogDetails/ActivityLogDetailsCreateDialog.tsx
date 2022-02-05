import { Dialog } from '@mui/material';
import React from 'react';
import { ActivityLogDetailsCreateContainer, ActivityLogDetailsCreateContainerProps } from '../..';

export type ActivityLogDetailsCreateDialogProps = {
  open: boolean;

  onClose: () => void;

  createContainerProps: ActivityLogDetailsCreateContainerProps;
};

export const ActivityLogDetailsCreateDialog: React.FC<ActivityLogDetailsCreateDialogProps> = ({
  open,
  onClose,
  createContainerProps,
}) => {
  return (
    <Dialog {...{ open, onClose }}>
      <ActivityLogDetailsCreateContainer {...createContainerProps} />
    </Dialog>
  );
};
