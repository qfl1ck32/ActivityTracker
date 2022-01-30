import { useRouter } from '@bluelibs/x-ui-next';
import { useEffect } from 'react';
import { Routes } from 'src/bundles/UIAppBundle';
import { useAppGuardian } from 'src/bundles/UIAppBundle/services';

export const HomeContainer: React.FC = () => {
  const guardian = useAppGuardian();

  const router = useRouter();

  const goToLogin = () => router.go(Routes.Login);

  useEffect(() => {
    if (guardian.state.isLoggedIn) {
      router.go(Routes.Activities);
    }
  });

  if (guardian.state.isLoggedIn) return null;

  return (
    <div>
      <button onClick={goToLogin}>Go to login</button>
    </div>
  );
};
