import { CircularProgress } from '@mui/material';

import { Box } from '@mui/system';
import { LoadingComponentProps } from 'src/defs';
import { styleCenter } from '../styles';

export const Loader: React.FC<LoadingComponentProps> = ({ horizontalCenter, verticalCenter, small }) => {
  return (
    <Box
      sx={verticalCenter ? styleCenter : undefined}
      {...{
        display: 'flex',
        justifyContent: horizontalCenter ? 'center' : undefined,
      }}
    >
      <CircularProgress size={small ? 15 : 50} />
    </Box>
  );
};
