import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Button, List, ListItem, TextField, Typography } from '@mui/material';
import { Fragment, SetStateAction, useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { EndUsersNoteModelsCreateInput, Field, FieldInput, FieldType } from 'src/api.types';
import { AddFieldForm } from '../..';
import { createSchema } from './schemas';

export type FieldOrFieldInput = Field | FieldInput

// TODO: fix any :(
export type NoteModelsFormProps = {
  onSubmit: (data: any) => Promise<void>;

  isSubmitting: boolean;

  defaultValues?: any;
  type: "edit" | "create"
};

export const NoteModelsForm: React.FC<NoteModelsFormProps> = ({
  onSubmit,
  isSubmitting,

  type,

  defaultValues = {}

}) => {
  const {
    register,
    formState: { errors },
    control,
    watch,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(createSchema),

    defaultValues
  });

  const { fields, append, remove } = useFieldArray<any, any, any>({
    control,
    name: "fields"
  })

  const addNewField = () => {
    append({

    })
  }

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit as any)}>
        <TextField label="name" {...register('name')} error={Boolean(errors.name)} helperText={errors.name?.message} />

        <LoadingButton loading={isSubmitting} type="submit">
          {type === "create" ? "Create" : "Edit"}
        </LoadingButton>
      </form>

      <Box>
        <Typography variant="h5">Fields already added</Typography>
        <List>
          {fields.map((item, idx) => {
            return <AddFieldForm key={item.id} {...{ control, watch, errors, register, index: idx, remove }} />
          })}
          <div>
            <Button onClick={addNewField}>Add New Field</Button>
          </div>
        </List>
      </Box>
    </Box>
  );
};
