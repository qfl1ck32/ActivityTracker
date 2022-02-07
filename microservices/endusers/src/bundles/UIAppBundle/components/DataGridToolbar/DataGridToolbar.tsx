import { Box } from '@mui/material';
import { GridToolbar, GridToolbarContainer } from '@mui/x-data-grid';

import AddIcon from '@mui/icons-material/Add';
import { LoadingButton } from '../';
import { useState } from 'react';

export type DataGridToolbarProps = {
  onCreatePress?: () => Promise<void> | void;
};

export const DataGridToolbar: React.FC<DataGridToolbarProps> = ({ onCreatePress }) => {
  const [isCreateLoading, setIsCreateLoading] = useState(false);

  const onClick = async () => {
    if (isCreateLoading) return;

    setIsCreateLoading(true);

    try {
      await onCreatePress?.();
    } catch (_) {
    } finally {
      setIsCreateLoading(false);
    }
  };

  return (
    <GridToolbarContainer>
      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
        <LoadingButton loading={isCreateLoading} onClick={onClick}>
          <AddIcon /> Create
        </LoadingButton>
      </Box>

      <GridToolbar />
    </GridToolbarContainer>
  );
};
