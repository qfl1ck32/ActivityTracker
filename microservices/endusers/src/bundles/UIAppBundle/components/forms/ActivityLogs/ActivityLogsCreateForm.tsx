import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '../../';
import { Box, MenuItem, TextField } from '@mui/material';
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
      <div>
        <TextField
          margin="normal"
          fullWidth
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
      </div>

      <div>
        <TextField
          margin="normal"
          fullWidth
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
      </div>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <LoadingButton variant="contained" loading={isSubmitting} type="submit">
          Create
        </LoadingButton>
      </Box>
    </form>
  );
};
