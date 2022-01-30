import { ActivitiesContainer, ProtectContainer } from 'src/bundles/UIAppBundle/components/containers';

const ActivitiesPage: React.FC = () => {
  return (
    <ProtectContainer>
      <ActivitiesContainer />
    </ProtectContainer>
  );
};

export default ActivitiesPage;
