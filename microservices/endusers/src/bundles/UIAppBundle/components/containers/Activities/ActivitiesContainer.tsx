import { useQuery } from '@apollo/client';
import { useUIComponents } from '@bluelibs/x-ui-react-bundle';
import { useState } from 'react';
import { Activity, Query } from 'src/api.types';
import { ActivitiesFind } from 'src/bundles/UIAppBundle/queries';

export const ActivitiesContainer: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  const [selectedActivity, setSelectedActivity] = useState<Activity>();

  const UIComponents = useUIComponents();

  const { loading: loadingActivities } = useQuery<{ ActivitiesFind: Query['ActivitiesFind'] }>(ActivitiesFind, {
    onCompleted: (data) => setActivities(data.ActivitiesFind),
  });

  const onCreateActivity = async (activityId: string) => {};

  if (loadingActivities) return <UIComponents.Loading />;

  return (
    <div>
      <div>
        Create a new log for the following activity:
        {activities.map((activity) => (
          <div onClick={() => setSelectedActivity(activity)}>{activity.name}</div>
        ))}
      </div>
    </div>
  );
};
