import { use, useRouter } from '@bluelibs/x-ui-next';
import { Box } from '@mui/material';
import { DataGrid, GridColumns, GridEventListener, GridEvents } from '@mui/x-data-grid';
import { ActivityLog } from 'src/api.types';
import { DataGridService } from '../../services';

import * as Routes from 'src/routes';

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

  const router = useRouter();

  const onCellClick: GridEventListener<GridEvents.cellClick> = (gridCell) => {
    if (gridCell.field !== 'id') return;

    router.go(Routes.ActivityLog, {
      params: {
        id: gridCell.id,
      },
    });
  };

  return (
    <Box height="400px" width="100%">
      <DataGrid
        onCellClick={onCellClick}
        rows={dataGridService.mapApiDataToGridData(activityLogs)}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </Box>
  );
};
