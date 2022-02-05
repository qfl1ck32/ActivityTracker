import React from 'react';
import { ActivityLogContainer, ProtectContainer } from 'src/bundles/UIAppBundle/components';
import { ActivityLogProvider } from 'src/bundles/UIAppBundle/contexts';

const ActivityLogPage: React.FC = () => {
  return (
    <ProtectContainer>
      <ActivityLogProvider>
      <ActivityLogContainer />
      </ActivityLogProvider>
    </ProtectContainer>
  );
};

export default ActivityLogPage;
