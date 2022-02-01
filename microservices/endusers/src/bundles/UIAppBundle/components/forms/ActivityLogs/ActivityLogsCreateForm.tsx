import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { MenuItem, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Activity, EndUsersActivityLogsCreateInput, NoteModel } from 'src/api.types';
import { schema } from './schema';

export type ActivityLogsCreateFormProps = {
  onSubmit: (data: EndUsersActivityLogsCreateInput) => Promise<void>;

  isSubmitting: boolean;

  activities: Activity[];
  noteModels: NoteModel[];
};

export const ActivityLogsCreateForm: React.FC<ActivityLogsCreateFormProps> = ({
  onSubmit,
  isSubmitting,
  activities,
  noteModels,
}) => {
  const {
    handleSubmit,
    register,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit as any)}>
      <TextField label="Name" {...register('name')} error={Boolean(errors.name)} helperText={errors.name?.message} />

      <TextField
        label="Activity"
        {...register('activityId')}
        select
        defaultValue="none"
        error={Boolean(errors.activityId)}
        helperText={errors.activityId?.message}
      >
        <MenuItem disabled value="none">
          Select an activity
        </MenuItem>

        {activities.map((activity) => (
          <MenuItem key={activity._id} value={activity._id}>
            {activity.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label="Note Model"
        {...register('noteModelId')}
        select
        defaultValue="none"
        error={Boolean(errors.noteModelId)}
        helperText={errors.noteModelId?.message}
      >
        <MenuItem disabled value="none">
          Select a note model
        </MenuItem>

        {noteModels.map((noteModel) => (
          <MenuItem key={noteModel._id} value={noteModel._id}>
            {noteModel.name}
          </MenuItem>
        ))}
      </TextField>

      <div>
        <LoadingButton loading={isSubmitting} type="submit">
          Create
        </LoadingButton>
      </div>
    </form>
  );
};
