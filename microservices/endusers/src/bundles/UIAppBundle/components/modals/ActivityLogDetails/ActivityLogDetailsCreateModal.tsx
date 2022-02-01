import { Box, Modal } from '@mui/material';
import React from 'react';
import { styleCenter } from 'src/bundles/UIAppBundle/styles';
import { ActivityLogDetailsCreateContainer, ActivityLogDetailsCreateContainerProps } from '../..';

export type ActivityLogDetailsCreateModalProps = {
  open: boolean;

  onClose: () => void;

  createContainerProps: ActivityLogDetailsCreateContainerProps;
};

export const ActivityLogDetailsCreateModal: React.FC<ActivityLogDetailsCreateModalProps> = ({
  open,
  onClose,
  createContainerProps,
}) => {
  return (
    <Modal {...{ open, onClose }}>
      <Box sx={styleCenter}>
        <ActivityLogDetailsCreateContainer {...createContainerProps} />
      </Box>
    </Modal>
  );
};
