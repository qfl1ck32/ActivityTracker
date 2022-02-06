import { useUIComponents } from '@bluelibs/x-ui-react-bundle';
import { ActivityLogsListContainer } from './ActivityLogsListContainer';

export const ActivityLogsContainer: React.FC = () => {
  const UIComponents = useUIComponents();

  return (
    <UIComponents.Layout title="Activity Logs">
      <ActivityLogsListContainer />
    </UIComponents.Layout>
  );
};
