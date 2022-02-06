import { useRouter, useUIComponents } from '@bluelibs/x-ui-next';
import { useEffect, useState } from 'react';
import { ResetPasswordInput } from 'src/api.types';
import { Routes } from 'src/bundles/UIAppBundle';
import { useAppGuardian } from 'src/bundles/UIAppBundle/services';

import { toast } from 'react-toastify';
import { Grid, Box, Avatar, Typography, Button } from '@mui/material';

import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CheckIcon from '@mui/icons-material/Check';
import { ResetPasswordForm } from '../..';

export const ResetPasswordContainer: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasBeenReset, setHasBeenReset] = useState(false);

  const guardian = useAppGuardian();

  const router = useRouter();

  const UIComponents = useUIComponents();

  useEffect(() => {
    if (guardian.state.isLoggedIn) {
      router.go(Routes.Home);
    }
  }, []);

  const onSubmit = async (input: ResetPasswordInput) => {
    setIsSubmitting(true);

    const { username, newPassword } = input;

    try {
      await guardian.resetPassword(username, router.next.query.token as string, newPassword);

      await guardian.load();

      setHasBeenReset(true);

      setTimeout(() => {
        router.go(Routes.Home);
      }, 2500);
    } catch (err: any) {
      toast.error(err.toString());
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>{hasBeenReset ? <CheckIcon /> : <RestartAltIcon />}</Avatar>

        {!hasBeenReset && (
          <Typography component="h1" variant="h5">
            Reset password
          </Typography>
        )}

        <Box maxWidth="30rem">
          {hasBeenReset ? (
            <Grid
              sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}
              container
            >
              <Typography component="h1" variant="h5">
                Your password has been successfully reset.
              </Typography>

              <Typography fontSize={15} component="h1" variant="h6">
                Logging in...
              </Typography>
            </Grid>
          ) : (
            <ResetPasswordForm {...{ onSubmit, isSubmitting }} />
          )}
        </Box>
      </Box>
    </UIComponents.Layout>
  );
};
