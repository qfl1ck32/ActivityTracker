import { Box, Typography } from '@mui/material';
import { Fragment } from 'react';
import { LayoutComponentProps } from 'src/defs';
import { Header } from '../components';

export const Layout: React.FC<LayoutComponentProps> = ({ children, title, withHeader = true }) => {
  return (
    <Fragment>
      {withHeader && <Header />}

      {title && (
        <Box sx={{ marginTop: 4, marginBottom: 4, display: 'flex', justifyContent: 'center' }}>
          <Typography component="h1" variant="h5">
            {title}
          </Typography>
        </Box>
      )}

      {children}
    </Fragment>
  );
};
