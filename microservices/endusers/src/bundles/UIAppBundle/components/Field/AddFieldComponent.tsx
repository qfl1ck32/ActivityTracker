import { Field, FieldEnumValues, FieldInput } from 'src/api.types';

import { Container, Typography, IconButton } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import { FieldOrFieldInput } from '..';

export type AddFieldComponentProps = {
  field: FieldOrFieldInput

  onDelete?: (field: FieldOrFieldInput) => void;

  type: "edit" | "create"
};

export const AddFieldComponent: React.FC<AddFieldComponentProps> = ({ field, onDelete, type }) => {
  const { name, type: fieldType, enumValues } = field;

  return (
    <Container>
      <Typography variant="h6">Name: {name}</Typography>
      <Typography variant="h6">Type: {fieldType}</Typography>
      {enumValues?.length && <Typography variant="h6">Enum Values: {type === "create" ? enumValues.join(', ') : (enumValues as FieldEnumValues[]).map(enumValue => enumValue.value).join(', ')}</Typography>}

      {onDelete && (
        <IconButton size="small" onClick={() => onDelete(field)}>
          <DeleteIcon />
          Remove
        </IconButton>
      )}
    </Container>
  );
};
