import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { Field, FieldType } from 'src/api.types';
import { schema } from './schema';

import { capitalize } from 'lodash-es';

import { TextField, Button, MenuItem, Container, IconButton, Typography, List, ListItem } from '@mui/material';
import { ChangeEventHandler, FormEvent, Fragment, useEffect, useState } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';

export type FieldFormProps = {
  onSubmit: (data: Field) => void;
};

export const FieldForm: React.FC<FieldFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    setValue,
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
    append('Value');
  }, []);

  const onFinish = (e: FormEvent<HTMLFormElement>) => {
    handleSubmit((data: any) => {
      try {
        onSubmit(data);

        reset({
          name: '',
          enumValues: ['Value'],
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
                <TextField placeholder="Field Value" {...register(`enumValues.${index}`)} />
                {enumValues.length > 1 && (
                  <IconButton onClick={() => remove(index)}>
                    <DeleteIcon />
                  </IconButton>
                )}
              </ListItem>
            ))}
          </List>

          <div>
            <Button onClick={() => append('New Value')}>Add New Enum Value</Button>
          </div>
        </Fragment>
      )}

      <div>
        <Button type="submit">Add field</Button>
      </div>
    </form>
  );
};
