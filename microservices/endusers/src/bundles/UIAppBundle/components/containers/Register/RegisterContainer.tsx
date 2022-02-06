import { useRouter, useUIComponents } from '@bluelibs/x-ui-next';
import { useEffect, useState } from 'react';
import { EndUsersRegisterInput } from 'src/api.types';
import { Routes } from 'src/bundles/UIAppBundle';
import { useAppGuardian } from 'src/bundles/UIAppBundle/services';

import { toast } from 'react-toastify';
import { Grid, Box, Avatar, Typography } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import { RegisterForm } from '../..';

import Link from 'next/link';

export const RegisterContainer: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const guardian = useAppGuardian();

  const router = useRouter();

  const UIComponents = useUIComponents();

  const onSubmit = async (input: EndUsersRegisterInput) => {
    setIsSubmitting(true);

    try {
      await guardian.register(input);
      toast.info('You have successfully registered! Please check your e-mail for confirmation.');
      router.go(Routes.Login);
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
          <CreateIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Sign up
        </Typography>

        <Box maxWidth="30rem">
          <RegisterForm {...{ onSubmit, isSubmitting }} />

          <Grid sx={{ display: 'flex', justifyContent: 'center' }} container>
            <Link href={Routes.Login.path} as={Routes.Login.path}>
              Already have an account? Log in
            </Link>
          </Grid>
        </Box>
      </Box>
    </UIComponents.Layout>
  );
};
