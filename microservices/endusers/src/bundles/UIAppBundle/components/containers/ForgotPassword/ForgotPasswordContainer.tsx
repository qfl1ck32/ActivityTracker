import { useRouter, useUIComponents } from '@bluelibs/x-ui-next';
import { useEffect, useState } from 'react';
import { ForgotPasswordInput, LoginInput } from 'src/api.types';
import { Routes } from 'src/bundles/UIAppBundle';
import { useAppGuardian } from 'src/bundles/UIAppBundle/services';
import { ForgotPasswordForm, LoginForm } from '../../forms';

import { toast } from 'react-toastify';
import { Grid, Box, Avatar, Typography, Button } from '@mui/material';

import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CheckIcon from '@mui/icons-material/Check';

import Link from 'next/link';

export const ForgotPasswordContainer: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasBeenReset, setHasBeenReset] = useState(false);

  const guardian = useAppGuardian();

  const router = useRouter();

  const UIComponents = useUIComponents();

  const onSubmit = async (input: ForgotPasswordInput) => {
    setIsSubmitting(true);

    try {
      await guardian.forgotPassword(input.email);
      setHasBeenReset(true);
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
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>{hasBeenReset ? <CheckIcon /> : <RestartAltIcon />}</Avatar>

        {!hasBeenReset && (
          <Typography component="h1" variant="h5">
            Forgot password
          </Typography>
        )}

        <Box maxWidth="30rem">
          {hasBeenReset ? (
            <Grid
              sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}
              container
            >
              <Typography component="h1" variant="h5">
                Success!
              </Typography>

              <Typography fontSize={15} component="h1" variant="h6">
                If you have provided a valid e-mail, you will soon receive a reset link.
              </Typography>

              <Button onClick={() => router.go(Routes.Login)}>Back to login</Button>
            </Grid>
          ) : (
            <ForgotPasswordForm {...{ onSubmit, isSubmitting, isFinished: hasBeenReset }} />
          )}
        </Box>
      </Box>
    </UIComponents.Layout>
  );
};
