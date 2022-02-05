import { useRouter } from '@bluelibs/x-ui-next';
import { useEffect, useState } from 'react';
import { Routes } from 'src/bundles/UIAppBundle';
import { useAppGuardian } from 'src/bundles/UIAppBundle/services';

export const VerifyEmailContainer: React.FC = () => {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);

  const guardian = useAppGuardian();

  const verifyEmail = async () => {
    try {
      const token = await guardian.verifyEmail(router.next.query.token as string);

      await guardian.storeToken(token);

      await guardian.load();

      alert('You have successfully verified your e-mail');

      setIsVerified(true);

      setTimeout(() => {
        router.go(Routes.Home);
      }, 2500);
    } catch (err: any) {
      alert(err.toString());
    }
  };

  useEffect(() => {
    if (!router.next.isReady) return;
    
    verifyEmail();
  }, [router.next.isReady]);

  if (!router.next.isReady) return <h5>Loading...</h5>;

  if (!isVerified) return <h5>Verifying...</h5>;

  if (isVerified) return <h5>Success!</h5>;

  return <h5>{router.next.query.token}</h5>;
};
