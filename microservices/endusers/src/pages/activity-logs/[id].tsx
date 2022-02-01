import React from 'react';
import { ActivityLogContainer, ProtectContainer } from 'src/bundles/UIAppBundle/components';

const ActivityLogPage: React.FC = () => {
  return (
    <ProtectContainer>
      <ActivityLogContainer />
    </ProtectContainer>
  );
};

export default ActivityLogPage;
