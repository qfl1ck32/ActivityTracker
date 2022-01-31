import { NoteModel } from 'src/api.types';
import { DataGrid, GridColumns } from '@mui/x-data-grid';
import { DataGridService } from '../../services';
import { use } from '@bluelibs/x-ui-next';
import { Box } from '@mui/material';

export type NoteModelsListComponentProps = {
  noteModels: NoteModel[];
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
    field: 'fields',
    headerName: 'Fields',

    width: 250,

    renderCell: (params) => {
      return JSON.stringify(params.value);
    },
  },

  {
    field: 'createdAt',
    headerName: 'Created At',

    width: 300,

    valueFormatter: (params) => new Date(params.value as number).toLocaleDateString(),
  },
  {
    field: 'Delete',
    headerName: 'Delete',

    width: 100,

    renderCell: (params) => {
      return <h5>Delete</h5>;
    },
  },
];

export const NoteModelsListComponent: React.FC<NoteModelsListComponentProps> = ({ noteModels }) => {
  const dataGridService = use(DataGridService);
  return (
    <Box height="400px" width="100%">
      <DataGrid
        rows={dataGridService.mapApiDataToGridData(noteModels)}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </Box>
  );
};
