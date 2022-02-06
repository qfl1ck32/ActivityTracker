import { useRouter } from '@bluelibs/x-ui-next';
import { useUIComponents } from '@bluelibs/x-ui-react-bundle';
import { useEffect } from 'react';
import { Routes } from 'src/bundles/UIAppBundle';
import { useAppGuardian } from 'src/bundles/UIAppBundle/services';

const LogoutPage: React.FC = () => {
  const UIComponents = useUIComponents();

  const router = useRouter();

  const guardian = useAppGuardian();

  useEffect(() => {
    guardian
      .logout()
      .then()
      .catch()
      .finally(() => router.go(Routes.Home));
  }, []);

  return <UIComponents.Loading />;
};

export default LogoutPage;
