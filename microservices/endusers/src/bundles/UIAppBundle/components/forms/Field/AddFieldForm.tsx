import { yupResolver } from '@hookform/resolvers/yup';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, IconButton, List, ListItem, MenuItem, TextField } from '@mui/material';
import { capitalize } from 'lodash-es';
import { FormEvent, Fragment, useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { FieldInput, FieldType } from 'src/api.types';
import { schema } from './schema';

export type AddFieldFormProps = {
  onSubmit: (data: FieldInput) => void;
};

export const AddFieldForm: React.FC<AddFieldFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const {
    fields: enumValues,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'enumValues',
  });

  useEffect(() => {
    append('');
  }, []);

  const onFinish = (e: FormEvent<HTMLFormElement>) => {
    handleSubmit((data: any) => {
      try {
        onSubmit(data);

        reset({
          name: '',
          enumValues: [''],
        });
      } catch (err: any) {
        alert(err);
      }
    })(e);
  };

  return (
    <form onSubmit={(e) => onFinish(e)}>
      <div>
        <TextField
          label="Field name"
          error={Boolean(errors.name)}
          helperText={errors.name?.message}
          {...register('name')}
        />
      </div>

      <div>
        <TextField
          select
          defaultValue="none"
          error={Boolean(errors.type)}
          helperText={errors.type?.message}
          {...register('type')}
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

      {watch('type') === FieldType.ENUM && (
        <Fragment>
          <List>
            {enumValues.map((item, index) => (
              <ListItem key={item.id}>
                <TextField placeholder="Enter your value here..." {...register(`enumValues.${index}`)} />
                {enumValues.length > 1 && (
                  <IconButton onClick={() => remove(index)}>
                    <DeleteIcon />
                  </IconButton>
                )}
              </ListItem>
            ))}
          </List>

          <div>
            <Button onClick={() => append('')}>Add New Enum Value</Button>
          </div>
        </Fragment>
      )}

      <div>
        <Button type="submit">Add field</Button>
      </div>
    </form>
  );
};
