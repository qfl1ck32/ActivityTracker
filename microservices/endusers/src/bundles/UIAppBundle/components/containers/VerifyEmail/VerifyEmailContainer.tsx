import { useRouter, useUIComponents } from '@bluelibs/x-ui-next';
import { useEffect, useState } from 'react';
import { Routes } from 'src/bundles/UIAppBundle';
import { useAppGuardian } from 'src/bundles/UIAppBundle/services';

import { toast } from 'react-toastify';
import { Avatar, Box, Typography } from '@mui/material';

import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';

export const VerifyEmailContainer: React.FC = () => {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);

  const guardian = useAppGuardian();

  const UIComponents = useUIComponents();

  const verifyEmail = async () => {
    try {
      const token = await guardian.verifyEmail(router.next.query.token as string);

      await guardian.storeToken(token);

      await guardian.load();

      toast.info('You have successfully verified your e-mail');

      setIsVerified(true);

      setTimeout(() => {
        router.go(Routes.Home);
      }, 2500);
    } catch (err: any) {
      toast.error(err.toString());
    }
  };

  useEffect(() => {
    if (!router.next.query.token) return;

    verifyEmail();
  }, [router.next.query.token]);

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
          {isVerified ? <MarkEmailReadIcon /> : <MarkEmailUnreadIcon />}
        </Avatar>

        <Typography component="h1" variant="h5">
          {!router.next.isReady && 'Loading...'}
          {!isVerified && 'Verifying...'}
          {isVerified && "Success! You'll be redirected to Home in a few seconds."}
        </Typography>
      </Box>
    </UIComponents.Layout>
  );
};
