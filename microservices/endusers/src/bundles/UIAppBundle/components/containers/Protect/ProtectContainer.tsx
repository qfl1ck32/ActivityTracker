import { useUIComponents } from '@bluelibs/x-ui-react-bundle';
import { UserRole } from 'src/api.types';

export const ProtectContainer: React.FC = ({ children }) => {
  const UIComponents = useUIComponents();

  return <UIComponents.Protect roles={[UserRole.END_USER]}>{children}</UIComponents.Protect>;
};
