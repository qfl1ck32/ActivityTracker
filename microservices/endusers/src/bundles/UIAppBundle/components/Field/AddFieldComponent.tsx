import { Field as FieldType } from 'src/api.types';

import { Container, Typography, IconButton } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';

export type AddFieldComponentProps = {
  field: FieldType;

  onDelete?: (field: FieldType) => void;
};

export const AddFieldComponent: React.FC<AddFieldComponentProps> = ({ field, onDelete }) => {
  const { name, type, enumValues } = field;

  return (
    <Container>
      <Typography variant="h6">Name: {name}</Typography>
      <Typography variant="h6">Type: {type}</Typography>
      {enumValues?.length && <Typography variant="h6">Enum Values: {enumValues.join(', ')}</Typography>}

      {onDelete && (
        <IconButton size="small" onClick={() => onDelete(field)}>
          <DeleteIcon />
          Remove
        </IconButton>
      )}
    </Container>
  );
};
