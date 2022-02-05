import DeleteIcon from '@mui/icons-material/Delete';
import { Button, IconButton, List, ListItem, MenuItem, TextField } from '@mui/material';
import { capitalize } from 'lodash-es';
import { Fragment } from 'react';
import { Control, useFieldArray, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { FieldType } from 'src/api.types';

export type AddFieldFormProps = {
  control: Control<any, object>;

  index: number;

  errors: any;

  register: UseFormRegister<any>;

  watch: UseFormWatch<any>;

  type: 'edit' | 'create';
};

export const AddFieldForm: React.FC<AddFieldFormProps> = ({ control, index, errors, register, watch, type }) => {
  const {
    fields: enumValues,
    append,
    remove,
  } = useFieldArray({
    control,
    name: `fields.${index}.enumValues`,
  });

  return (
    <form>
      <div>
        <TextField
          label="Field name"
          error={Boolean(errors.fields?.[index].name)}
          helperText={errors.fields?.[index].name?.message}
          {...register(`fields.${index}.name`)}
        />
      </div>

      <div>
        <TextField
          select
          defaultValue={watch(`fields.${index}.type`) ?? 'none'}
          error={Boolean(errors.fields?.[index].type)}
          helperText={errors.fields?.[index].type?.message}
          {...register(`fields.${index}.type`)}
        >
          <MenuItem disabled value="none">
            Select a type
          </MenuItem>
          {Object.values(FieldType).map((fieldType) => (
            <MenuItem key={fieldType} value={fieldType}>
              {capitalize(fieldType)}
            </MenuItem>
          ))}
        </TextField>
      </div>

      {watch(`fields.${index}.type`) === FieldType.ENUM && (
        <Fragment>
          <List>
            {enumValues.map((item, enumValueIdx) => {
              const fieldName = `fields.${index}.enumValues.${enumValueIdx}`;
              return (
                <ListItem key={item.id}>
                  <TextField
                    placeholder="Enter your value here..."
                    {...register(`${fieldName}${type === 'edit' ? '.value' : ''}`)}
                  />
                  <IconButton onClick={() => remove(enumValueIdx)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              );
            })}
          </List>

          <div>
            <Button onClick={() => append('Value')}>Add New Enum Value</Button>
          </div>
        </Fragment>
      )}
    </form>
  );
};
