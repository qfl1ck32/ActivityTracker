import { Box, Modal } from '@mui/material';
import React from 'react';
import { styleCenter } from 'src/bundles/UIAppBundle/styles';
import { ActivityLogDetailsCreateContainer } from '../..';

export type ActivityLogDetailsCreateModalProps = {
  open: boolean;

  onClose: () => void;
};

export const ActivityLogDetailsCreateModal: React.FC<ActivityLogDetailsCreateModalProps> = ({ open, onClose }) => {
  return (
    <Modal {...{ open, onClose }}>
      <Box sx={styleCenter}>
        <ActivityLogDetailsCreateContainer />
      </Box>
    </Modal>
  );
};
