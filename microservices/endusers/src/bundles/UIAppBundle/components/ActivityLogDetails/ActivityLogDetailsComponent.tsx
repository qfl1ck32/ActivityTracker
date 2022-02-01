import { Box, Typography } from '@mui/material';
import { ActivityLog } from 'src/api.types';
import { NoteDetailsCreateContainer } from '..';

export type ActivityLogDetailsComponentProps = {
  activityLog: ActivityLog;

  startTime: Date;
  finishTime: Date;
};

export const ActivityLogDetailsComponent: React.FC<ActivityLogDetailsComponentProps> = ({
  activityLog,
  startTime,
  finishTime,
}) => {
  return (
    <Box>
      <Typography variant="h6">Start time: {startTime.toLocaleTimeString()}</Typography>
      <Typography variant="h6">Finish time: {finishTime.toLocaleTimeString()}</Typography>

      <NoteDetailsCreateContainer noteModel={activityLog.noteModel} />
    </Box>
  );
};
