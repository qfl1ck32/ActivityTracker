import { Box, Typography } from '@mui/material';
import { ActivityLog, EndUsersActivityLogDetailsCreateInput } from 'src/api.types';
import { NoteDetailsCreateForm } from '../forms';

export type ActivityLogDetailsComponentProps = {
  activityLog: ActivityLog;

  startedAt: Date;
  finishedAt: Date;

  onSubmit: (noteDetailsValue: Object) => Promise<void>;

  isSubmitting: boolean;
};

export const ActivityLogDetailsComponent: React.FC<ActivityLogDetailsComponentProps> = ({
  activityLog,
  startedAt,
  finishedAt,
  onSubmit,
  isSubmitting,
}) => {
  return (
    <Box>
      <Typography variant="h6">Start time: {startedAt.toLocaleTimeString()}</Typography>
      <Typography variant="h6">Finish time: {finishedAt.toLocaleTimeString()}</Typography>

      <NoteDetailsCreateForm {...{ isSubmitting, onSubmit, noteModel: activityLog.noteModel }} />
    </Box>
  );
};
