import { useRouter, useUIComponents } from '@bluelibs/x-ui-next';
import { useEffect, useState } from 'react';
import { LoginInput } from 'src/api.types';
import { Routes } from 'src/bundles/UIAppBundle';
import { useAppGuardian } from 'src/bundles/UIAppBundle/services';
import { LoginForm } from '../../forms';

import { toast } from 'react-toastify';
import { Grid, Box, Avatar, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import Link from 'next/link';

export const LoginContainer: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const guardian = useAppGuardian();

  const router = useRouter();

  const UIComponents = useUIComponents();

  const onSubmit = async (data: LoginInput) => {
    setIsSubmitting(true);

    try {
      const { username, password } = data;
      await guardian.login(username, password);
      toast.info('Successfully logged in!');
    } catch (err: any) {
      toast.error(err.toString());
    } finally {
      setIsSubmitting(false);
    }
  };

  if (guardian.state.isLoggedIn) {
    router.go(Routes.Home);

    return null;
  }

  return (
    <UIComponents.Layout>
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <Box maxWidth="30rem">
          <LoginForm {...{ onSubmit, isSubmitting }} />

          <Grid container>
            <Grid item xs>
              <Link href={Routes.ForgotPassword.path} as={Routes.ForgotPassword.path}>
                Forgot password?
              </Link>
            </Grid>

            <Grid item>
              <Link href={Routes.Register.path} as={Routes.Register.path}>
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </UIComponents.Layout>
  );
};
