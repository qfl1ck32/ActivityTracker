import { Box, IconButton } from '@mui/material';
import { GridToolbar, GridToolbarContainer } from '@mui/x-data-grid';

import AddIcon from '@mui/icons-material/Add';

export type DataGridToolbarProps = {
  onCreatePress?: () => void;
};

export const DataGridToolbar: React.FC<DataGridToolbarProps> = ({ onCreatePress }) => {
  return (
    <GridToolbarContainer>
      <Box>
        <IconButton onClick={onCreatePress}>
          <AddIcon /> Create
        </IconButton>
      </Box>
      <GridToolbar />
    </GridToolbarContainer>
  );
};
