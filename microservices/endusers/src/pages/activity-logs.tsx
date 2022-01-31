import { ActivityLogsContainer, ProtectContainer } from 'src/bundles/UIAppBundle/components/containers';

const ActivitiesPage: React.FC = () => {
  return (
    <ProtectContainer>
      <ActivityLogsContainer />
    </ProtectContainer>
  );
};

export default ActivitiesPage;
