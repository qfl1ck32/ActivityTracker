import { useMutation, useQuery } from '@apollo/client';
import { useEventManager, useUIComponents } from '@bluelibs/x-ui-next';
import { useState } from 'react';
import { Activity, ActivityLog, EndUsersActivityLogsCreateInput, Mutation, NoteModel, Query } from 'src/api.types';
import { ActivityLogCreatedEvent } from 'src/bundles/UIAppBundle/events';
import { ActivityLogsCreate } from 'src/bundles/UIAppBundle/mutations';
import { ActivitiesGetAll, NoteModelsGetAll } from 'src/bundles/UIAppBundle/queries';
import { ActivityLogsCreateForm } from '../..';

import { toast } from 'react-toastify';
import { Box } from '@mui/material';

export const ActivityLogsCreateContainer: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [noteModels, setNoteModels] = useState<NoteModel[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { loading: activitiesLoading, error: activitiesError } = useQuery<{
    EndUsersActivitiesGetAll: Query['EndUsersActivitiesGetAll'];
  }>(ActivitiesGetAll, {
    onCompleted: (data) => setActivities(data.EndUsersActivitiesGetAll),
  });

  const { loading: noteModelsLoading, error: noteModelsError } = useQuery<{
    EndUsersNoteModelsGetAll: Query['EndUsersNoteModelsGetAll'];
  }>(NoteModelsGetAll, {
    onCompleted: (data) => setNoteModels(data.EndUsersNoteModelsGetAll),
  });

  const [createActivityLog] = useMutation<
    { EndUsersActivityLogsCreate: Mutation['EndUsersActivityLogsCreate'] },
    { input: EndUsersActivityLogsCreateInput }
  >(ActivityLogsCreate);

  const eventManager = useEventManager();

  const onSubmit = async (input: EndUsersActivityLogsCreateInput) => {
    setIsSubmitting(true);

    try {
      const { data } = await createActivityLog({
        variables: {
          input,
        },
      });

      await eventManager.emit(
        new ActivityLogCreatedEvent({
          activityLog: data?.EndUsersActivityLogsCreate as ActivityLog,
        })
      );

      toast.info('You have successfully created an activity log!');
    } catch (err: any) {
      toast.error(err.toString());
    } finally {
      setIsSubmitting(false);
    }
  };

  const UIComponents = useUIComponents();

  if (activitiesLoading || noteModelsLoading) return <UIComponents.Loader center />;

  if (activitiesError) return <UIComponents.Error error={activitiesError} />;

  if (noteModelsError) return <UIComponents.Error error={noteModelsError} />;

  return (
    <Box sx={{ padding: 2 }}>
      <ActivityLogsCreateForm {...{ onSubmit, isSubmitting, activities, noteModels }} />
    </Box>
  );
};
