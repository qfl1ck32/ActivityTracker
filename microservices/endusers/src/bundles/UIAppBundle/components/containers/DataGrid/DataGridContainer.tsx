import { use } from '@bluelibs/x-ui-next';
import { Box } from '@mui/material';
import { DataGrid, DataGridProps, GridColumns } from '@mui/x-data-grid';
import { DataGridService } from 'src/bundles/UIAppBundle/services';
import { dataGridStyle } from 'src/bundles/UIAppBundle/styles';
import { DataGridActionCell } from '../../DataGridActionCell';
import { DataGridToolbar, DataGridToolbarProps } from '../../DataGridToolbar';

export type DataGridRowActions = {
  onDelete?: (id: string) => Promise<void>;
  onEdit?: (id: string) => Promise<void>;

  onCreate?: (id: string) => Promise<void>;
};

export type DataGridContainerProps<T> = {
  rows: T[];
  columns: GridColumns;

  toolbarProps?: DataGridToolbarProps;
} & DataGridRowActions &
  DataGridProps;

// TODO: fix, use T
export const DataGridContainer: React.FC<DataGridContainerProps<any>> = (props) => {
  const dataGridService = use(DataGridService);

  const { rows, onEdit, onDelete, columns, toolbarProps, ...dataGridProps } = props;

  if (onEdit || onDelete) {
    props.columns.push({
      field: 'Action',
      headerName: 'Action',

      width: 100,

      renderCell: (cellData) => <DataGridActionCell {...{ cellData, onEdit, onDelete }} />,
    });
  }

  return (
    <Box height="400px" width="100%">
      <DataGrid
        {...dataGridProps}
        components={{
          Toolbar: () => <DataGridToolbar {...toolbarProps} />,
        }}
        sx={dataGridStyle}
        disableSelectionOnClick
        rows={dataGridService.mapApiDataToGridData(rows)}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[5, 10, 15, 20, 25, 30, 35, 40, 45, 50]}
      />
    </Box>
  );
};
