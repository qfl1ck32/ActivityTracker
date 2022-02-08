import { ProfileContainer, ProtectContainer } from 'src/bundles/UIAppBundle/components';

const ProfilePage: React.FC = () => {
  return (
    <ProtectContainer>
      <ProfileContainer />
    </ProtectContainer>
  );
};

export default ProfilePage;
