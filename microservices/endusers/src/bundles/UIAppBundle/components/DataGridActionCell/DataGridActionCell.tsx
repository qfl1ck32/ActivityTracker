import { MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { GridRenderCellParams } from '@mui/x-data-grid';

export type DataGridActionCellProps = {
  cellData: GridRenderCellParams<any, any, any>;

  onEdit?: (id: string) => Promise<void>;

  onDelete?: (id: string) => Promise<void>;
};

export const DataGridActionCell: React.FC<DataGridActionCellProps> = (props) => {
  const { cellData } = props;

  const cellId = cellData.id.toString();

  const onEdit = () => props.onEdit?.(cellId);

  const onDelete = () => props.onDelete?.(cellId);

  return [props.onDelete, props.onEdit].some(Boolean) ? (
    <FormControl fullWidth>
      <InputLabel shrink={false} id="ActionLabel">
        Action
      </InputLabel>
      <Select labelId="ActionLabel" label="Action">
        {props.onEdit && <MenuItem onClick={onEdit}>Edit</MenuItem>}
        {props.onDelete && <MenuItem onClick={onDelete}>Delete</MenuItem>}
      </Select>
    </FormControl>
  ) : null;
};
