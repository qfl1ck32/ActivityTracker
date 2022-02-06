import { Box, Button, IconButton } from '@mui/material';
import { GridToolbar, GridToolbarContainer } from '@mui/x-data-grid';

import AddIcon from '@mui/icons-material/Add';

export type DataGridToolbarProps = {
  onCreatePress?: () => void;
};

export const DataGridToolbar: React.FC<DataGridToolbarProps> = ({ onCreatePress }) => {
  return (
    <GridToolbarContainer>
      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
        <Button onClick={onCreatePress}>
          <AddIcon /> Create
        </Button>
      </Box>

      <GridToolbar />
    </GridToolbarContainer>
  );
};
