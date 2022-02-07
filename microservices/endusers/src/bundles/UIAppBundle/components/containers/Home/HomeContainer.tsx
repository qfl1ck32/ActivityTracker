import { useRouter, useUIComponents } from '@bluelibs/x-ui-next';
import { Box, Button, Container, Typography } from '@mui/material';
import Link from 'next/link';
import { Routes } from 'src/bundles/UIAppBundle';
import { useAppGuardian } from 'src/bundles/UIAppBundle/services';
import { UnfinishedActivityLogDetailsListContainer } from '..';

export const HomeContainer: React.FC = () => {
  const guardian = useAppGuardian();

  const router = useRouter();

  const UIComponents = useUIComponents();

  return (
    <UIComponents.Layout>
      <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: '10rem' }}>
        {guardian.state.isLoggedIn ? (
          <Typography component="h1" variant="h5">
            Welcome, {guardian.state.user.fullName}!
          </Typography>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography sx={{ textAlign: 'center' }} component="h1" variant="h5">
              Welcome!
            </Typography>

            <Box sx={{ width: '500px', display: 'flex', justifyContent: 'space-around', marginTop: '2rem' }}>
              <Link href={Routes.Login.path} as={Routes.Login.path}>
                <Button variant="contained">Login</Button>
              </Link>

              <Link href={Routes.Register.path} as={Routes.Register.path}>
                <Button variant="contained">Register</Button>
              </Link>
            </Box>
          </Box>
        )}

        <UnfinishedActivityLogDetailsListContainer />
      </Box>
    </UIComponents.Layout>
  );
};
