import { useAppGuardian } from 'src/bundles/UIAppBundle/services';
import { Header } from '../../Header';

export const HeaderContainer: React.FC = () => {
  const guardian = useAppGuardian();

  return <Header user={guardian.state.user} />;
};
