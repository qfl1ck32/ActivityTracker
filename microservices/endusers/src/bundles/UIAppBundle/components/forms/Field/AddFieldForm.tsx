import DeleteIcon from '@mui/icons-material/Delete';
import { Button, IconButton, List, ListItem, MenuItem, TextField, Typography } from '@mui/material';
import { capitalize } from 'lodash-es';
import { Fragment, useEffect } from 'react';
import { Control, useFieldArray, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { FieldType } from 'src/api.types';
import { FormContext } from 'src/bundles/UIAppBundle/types';

export type AddFieldFormProps = {
  control: Control<any, object>;

  index: number;

  errors: any;

  register: UseFormRegister<any>;

  watch: UseFormWatch<any>;

  context: FormContext;
};

export const AddFieldForm: React.FC<AddFieldFormProps> = ({ control, index, errors, register, watch, context }) => {
  const {
    fields: enumValues,
    append,
    remove,
  } = useFieldArray({
    control,
    name: `fields.${index}.enumValues`,
  });

  useEffect(() => {
    const type = watch(`fields.${index}.type`) as FieldType;

    if (type === FieldType.ENUM) {
      if (enumValues.length === 0) {
        append('');
      }
    } else {
      for (let i = 0; i < enumValues.length; ++i) {
        remove(i);
      }
    }
  }, [watch(`fields.${index}.type`)]);

  return (
    <form>
      <div>
        <TextField
          label="Field name"
          margin="normal"
          fullWidth
          error={Boolean(errors.fields?.[index]?.name)}
          helperText={errors.fields?.[index]?.name?.message}
          {...register(`fields.${index}.name`)}
        />
      </div>

      <div>
        {/* TODO: maybe add a note - "You can not update the type of the fields." */}
        <TextField
          select
          margin="normal"
          fullWidth
          defaultValue={watch(`fields.${index}.type`) ?? 'none'}
          error={Boolean(errors.fields?.[index]?.type)}
          helperText={errors.fields?.[index]?.type?.message}
          {...register(`fields.${index}.type`)}
          disabled={context === 'edit' && watch(`fields.${index}.id`)}
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
                    error={Boolean(errors.fields?.[index]?.enumValues?.[enumValueIdx]?.value)}
                    helperText={errors.fields?.[index]?.enumValues?.[enumValueIdx]?.value?.message}
                    {...register(`${fieldName}${context === 'edit' ? '.value' : ''}`)}
                  />
                  <IconButton onClick={() => remove(enumValueIdx)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              );
            })}
          </List>

          <div>
            <Button onClick={() => append('')}>Add Enum Value</Button>
          </div>
        </Fragment>
      )}
    </form>
  );
};
