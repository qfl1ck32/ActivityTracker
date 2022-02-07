import { MenuItem, Select, InputLabel, Typography, FormControl, DialogActions, Button } from '@mui/material';
import { GridRenderCellParams } from '@mui/x-data-grid';
import { useState } from 'react';
import { DialogContainer, LoadingButton } from '..';

export type DataGridActionCellProps = {
  cellData: GridRenderCellParams<any, any, any>;

  onEdit?: (id: string) => Promise<void>;

  onDelete?: (id: string) => Promise<void>;

  deleteModalMessage?: string;
};

export const DataGridActionCell: React.FC<DataGridActionCellProps> = (props) => {
  const { cellData, deleteModalMessage } = props;

  const cellId = cellData.id.toString();

  const onEdit = () => props.onEdit?.(cellId);

  const [isDeleting, setIsDeleting] = useState(false);

  const [deleteDialogIsOpened, setDeleteDialogIsOpened] = useState(false);

  const onDelete = async () => {
    if (isDeleting) return;

    setIsDeleting(true);

    try {
      await props.onDelete?.(cellId);
    } catch (_) {
    } finally {
      setIsDeleting(false);
    }
  };

  return [props.onDelete, props.onEdit].some(Boolean) ? (
    <FormControl sx={{ border: 'none' }} fullWidth>
      <InputLabel shrink={false} id="ActionLabel">
        Action
      </InputLabel>
      <Select sx={{ border: 'none' }} labelId="ActionLabel" label="Action">
        {props.onEdit && <MenuItem onClick={onEdit}>Edit</MenuItem>}
        {props.onDelete && <Button onClick={() => setDeleteDialogIsOpened(true)}>Delete</Button>}
      </Select>

      {props.onDelete && (
        <DialogContainer
          open={deleteDialogIsOpened}
          onClose={() => setDeleteDialogIsOpened(false)}
          maxWidth="sm"
          title="Confirm the action"
        >
          <Typography sx={{ fontWeight: 'bold' }} component="h1" variant="h6">
            {deleteModalMessage}
          </Typography>
          <DialogActions>
            <Button onClick={() => setDeleteDialogIsOpened(false)}>Cancel</Button>
            <LoadingButton loading={isDeleting} onClick={onDelete}>
              Confirm
            </LoadingButton>
          </DialogActions>
        </DialogContainer>
      )}
    </FormControl>
  ) : null;
};
