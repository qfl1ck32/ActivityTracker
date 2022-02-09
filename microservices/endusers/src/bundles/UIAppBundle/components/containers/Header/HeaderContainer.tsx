import { memo } from 'react';
import { useAppGuardian } from 'src/bundles/UIAppBundle/services';
import { Header } from '../../Header';

const HeaderMemo = memo(Header, (prev, next) => {
  return prev.user.avatar?.downloadUrl === next.user.avatar?.downloadUrl;
});

export const HeaderContainer: React.FC = () => {
  const guardian = useAppGuardian();

  console.log(guardian.state.user);

  return <HeaderMemo user={guardian.state.user} />;
};
