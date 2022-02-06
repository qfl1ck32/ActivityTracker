import { useRouter, useUIComponents } from '@bluelibs/x-ui-next';
import { useAppGuardian } from 'src/bundles/UIAppBundle/services';

export const HomeContainer: React.FC = () => {
  const guardian = useAppGuardian();

  const router = useRouter();

  const UIComponents = useUIComponents();

  return <UIComponents.Layout>hello, {guardian.state.user?.fullName}!</UIComponents.Layout>;
};
