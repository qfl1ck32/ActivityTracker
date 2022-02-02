import { EJSON } from '@bluelibs/ejson';
import { use } from '@bluelibs/x-ui-next';
import { Box } from '@mui/material';
import { DataGrid, GridColumns } from '@mui/x-data-grid';
import { ActivityLogDetail, ActivityNote, ActivityTiming } from 'src/api.types';
import { DataGridService } from '../../services';

export type ActivityLogDetailsListComponentProps = {
  details: ActivityLogDetail[];
};

const columns: GridColumns = [
  {
    field: 'id',
    headerName: 'ID',

    width: 300,
  },

  {
    field: 'note',
    headerName: 'Note',

    valueFormatter: (props) => {
      const activityNote = props.value as ActivityNote;

      return EJSON.parse(activityNote.value);
    },

    width: 600,
  },

  {
    field: 'timing',
    headerName: 'Timing',

    valueFormatter: (props) => {
      const activityTiming = props.value as ActivityTiming;

      return `${new Date(activityTiming.startedAt).toLocaleTimeString()} -- ${new Date(
        activityTiming.finishedAt
      ).toLocaleTimeString()}`;
    },

    width: 500,
  },

  {
    field: 'createdAt',
    headerName: 'Created At',

    valueFormatter: (props) => new Date(props.value as number).toLocaleDateString(),

    width: 250,
  },
];

export const ActivityLogDetailsListComponent: React.FC<ActivityLogDetailsListComponentProps> = ({ details }) => {
  const dataGridService = use(DataGridService);

  console.log(details);

  return (
    <Box height="400px" width="100%">
      <DataGrid
        rows={dataGridService.mapApiDataToGridData(details)}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </Box>
  );
};
