import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Button, List, TextField, Typography } from '@mui/material';
import { Fragment, useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Field, FieldInput } from 'src/api.types';
import { FormContext } from 'src/bundles/UIAppBundle/types';
import { AddFieldForm } from '../..';
import { createSchema } from './schemas';

export type FieldOrFieldInput = Field | FieldInput;

// TODO: fix any :(
export type NoteModelsFormProps = {
  onSubmit: (data: any) => Promise<void>;

  isSubmitting: boolean;

  defaultValues?: any;

  context: FormContext;
};

export const NoteModelsForm: React.FC<NoteModelsFormProps> = ({
  onSubmit,
  isSubmitting,

  context,

  defaultValues = {},
}) => {
  const {
    register,
    formState: { errors },

    setValue,

    control,
    watch,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(createSchema),

    defaultValues,
  });

  useEffect(() => {
    for (const key in defaultValues) {
      setValue(key, defaultValues[key]);
    }
  }, [JSON.stringify(defaultValues)]);

  const { fields, append, remove } = useFieldArray<any, any, any>({
    control,
    name: 'fields',
  });

  const addNewField = () => {
    append({});
  };

  useEffect(() => {
    if (context === 'create') {
      addNewField();
    }
  }, []);

  // TODO: fix when changing type "ENUM" -> X ( -> ENUM )
  // console.log(errors);

  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit as any)}>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <TextField
            margin="normal"
            label="Name"
            {...register('name')}
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
          />

          <LoadingButton sx={{ marginLeft: 4 }} variant="contained" loading={isSubmitting} type="submit">
            {context === 'create' ? 'Create' : 'Edit'}
          </LoadingButton>
        </Box>

        <Typography component="h1" variant="h5">
          <Button onClick={addNewField}>Add New Field</Button>
        </Typography>
      </form>

      <List
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          flexDirection: 'row',
          overflow: 'auto',
        }}
      >
        {fields.map((item, idx) => {
          return (
            <Box sx={{ display: 'flex', flexDirection: 'column', ml: 4, mr: 4 }}>
              <AddFieldForm key={item.id} {...{ control, watch, errors, register, index: idx, remove, context }} />
              {fields.length > 1 && <Button onClick={() => remove(idx)}>Remove Field</Button>}
            </Box>
          );
        })}
      </List>
    </Fragment>
  );
};
