import { use } from '@bluelibs/x-ui-next';
import { Box } from '@mui/material';
import { DataGrid, GridColumns } from '@mui/x-data-grid';
import { ActivityLog } from 'src/api.types';
import { DataGridService } from '../../services';

export type ActivityLogsListComponentProps = {
  activityLogs: ActivityLog[];
};

const columns: GridColumns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 300,
  },

  {
    field: 'name',
    headerName: 'Name',

    width: 250,
  },

  {
    field: 'activity',
    headerName: 'Activity Name',

    width: 250,

    renderCell: (params) => params.value.name,
  },

  {
    field: 'noteModel',
    headerName: 'Note Model Name',

    width: 250,

    renderCell: (params) => params.value.name,
  },

  {
    field: 'createdAt',
    headerName: 'Created At',

    width: 250,

    valueFormatter: (params) => new Date(params.value as number).toLocaleDateString(),
  },
];

export const ActivityLogsListComponent: React.FC<ActivityLogsListComponentProps> = ({ activityLogs }) => {
  const dataGridService = use(DataGridService);

  return (
    <Box height="400px" width="100%">
      <DataGrid
        rows={dataGridService.mapApiDataToGridData(activityLogs)}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </Box>
  );
};
