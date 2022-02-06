import { CircularProgress } from '@mui/material';

import { Box } from '@mui/system';
import { LoadingComponentProps } from 'src/defs';

export const Loader: React.FC<LoadingComponentProps> = ({ center }) => {
  return (
    <Box
      {...{
        display: 'flex',
        justifyContent: center ? 'center' : undefined,
      }}
    >
      <CircularProgress size={50} />
    </Box>
  );
};
