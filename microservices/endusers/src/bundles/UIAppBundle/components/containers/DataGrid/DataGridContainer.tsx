import { use } from '@bluelibs/x-ui-next';
import { Box } from '@mui/material';
import { DataGrid, DataGridProps, GridColumns } from '@mui/x-data-grid';
import { DataGridService } from 'src/bundles/UIAppBundle/services';
import { dataGridStyle } from 'src/bundles/UIAppBundle/styles';
import { DataGridActionCell, DataGridActionCellProps } from '../../DataGridActionCell';
import { DataGridToolbar, DataGridToolbarProps } from '../../DataGridToolbar';

export type DataGridRowActions = {
  onCreate?: (id: string) => Promise<void>;
} & Omit<DataGridActionCellProps, 'cellData'>;

export type DataGridContainerProps<T> = {
  rows: T[];
  columns: GridColumns;

  toolbarProps?: DataGridToolbarProps;

  dataGridRowActionsProps?: DataGridRowActions;
} & DataGridProps;

// TODO: fix, use T
export const DataGridContainer: React.FC<DataGridContainerProps<any>> = ({
  rows,
  columns,
  toolbarProps = {},
  dataGridRowActionsProps = {},
  ...props
}) => {
  const dataGridService = use(DataGridService);

  const { onDelete, onEdit } = dataGridRowActionsProps;

  if (onDelete || onEdit) {
    columns.push({
      field: 'Action',
      headerName: 'Action',

      width: 100,

      renderCell: (cellData) => <DataGridActionCell cellData={cellData} {...dataGridRowActionsProps} />,
    });
  }

  return (
    <Box height="400px" width="100%">
      <DataGrid
        {...props}
        components={{
          Toolbar: () => <DataGridToolbar {...toolbarProps} />,
        }}
        sx={dataGridStyle}
        disableSelectionOnClick
        rows={dataGridService.mapApiDataToGridData(rows)}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 25, 50]}
      />
    </Box>
  );
};
