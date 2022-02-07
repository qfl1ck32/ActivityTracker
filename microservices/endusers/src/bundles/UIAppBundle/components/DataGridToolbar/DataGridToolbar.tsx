import { Box } from '@mui/material';
import { GridToolbar, GridToolbarContainer } from '@mui/x-data-grid';

import AddIcon from '@mui/icons-material/Add';
import { LoadingButton } from '../';

export type DataGridToolbarProps = {
  onCreatePress?: () => void;

  isCreateLoading?: boolean;
};

export const DataGridToolbar: React.FC<DataGridToolbarProps> = ({ onCreatePress, isCreateLoading }) => {
  return (
    <GridToolbarContainer>
      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
        <LoadingButton loading={isCreateLoading} onClick={onCreatePress}>
          <AddIcon /> Create
        </LoadingButton>
      </Box>

      <GridToolbar />
    </GridToolbarContainer>
  );
};
