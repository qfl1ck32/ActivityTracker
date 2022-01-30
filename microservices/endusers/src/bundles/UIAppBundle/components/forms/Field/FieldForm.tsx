import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { Field, FieldType } from 'src/api.types';
import { schema } from './schema';

import { capitalize } from 'lodash-es';

import { TextField, Button, MenuItem, Container, IconButton, Typography } from '@mui/material';
import { ChangeEventHandler, FormEvent, Fragment, useEffect, useState } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';

export type FieldFormProps = {
  onSubmit: (data: Field) => void;
};

export const FieldForm: React.FC<FieldFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    getValues,
    control,
    reset,
    resetField,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onFinish = (e: FormEvent<HTMLFormElement>) => {
    handleSubmit((data: any) => {
      onSubmit(data);
      reset();
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

      <div>
        <Controller
          name="enumValues"
          control={control}
          render={(props) => {
            const {
              field: { onChange },
            } = props;

            const [enumValues, setEnumValues] = useState<string[]>([]);

            const onAdd = () => {
              onChange('');
              setEnumValues((prev) => prev.concat(props.field.value));
            };

            const onDelete = (value: string) => {
              setEnumValues((prev) => prev.filter((item) => item !== value));
            };

            return (
              <Fragment>
                <TextField
                  InputProps={{
                    startAdornment: enumValues.map((enumValue, index) => (
                      <Container key={index}>
                        {enumValue}
                        <IconButton size="small" onClick={() => onDelete(enumValue)}>
                          <DeleteIcon />
                        </IconButton>
                      </Container>
                    )),
                    endAdornment: <Button onClick={onAdd}>Add</Button>,
                  }}
                  hidden={getValues().type !== FieldType.ENUM}
                  error={Boolean(errors.enumValues)}
                  helperText={errors.enumValues?.message}
                  onChange={onChange}
                  value={props.field.value || ''}
                ></TextField>

                <TextField hidden {...register('enumValues')} value={enumValues} />
              </Fragment>
            );
          }}
        />
      </div>

      <div>
        <Button type="submit">Add field</Button>
      </div>
    </form>
  );
};
