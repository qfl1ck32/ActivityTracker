import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { ActivityLogDetail, Query } from 'src/api.types';
import { ActivityLogDetailsGetUnfinished } from 'src/bundles/UIAppBundle/queries';

export const UnfinishedActivityLogDetailsListContainer: React.FC = () => {
  const [activityLogDetails, setActivityLogDetails] = useState<ActivityLogDetail[]>([]);

  const { loading, error } = useQuery<{
    EndUsersActivityLogDetailsGetUnfinished: Query['EndUsersActivityLogDetailsGetUnfinished'];
  }>(ActivityLogDetailsGetUnfinished, {
    onCompleted: (data) => setActivityLogDetails(data.EndUsersActivityLogDetailsGetUnfinished),
  });

  //   console.log(activityLogDetails);

  return null;
};
