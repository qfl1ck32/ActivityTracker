import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, List, ListItem, TextField, Typography } from '@mui/material';
import { SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { EndUsersNoteModelsCreateInput, Field, FieldInput } from 'src/api.types';
import { AddFieldComponent, AddFieldForm } from '../..';
import { createSchema } from './schemas';

export type FieldOrFieldInput = Field | FieldInput

// TODO: fix any :(
export type NoteModelsFormProps = {
  onSubmit: (data: any) => Promise<void>;

  fields: FieldOrFieldInput[];
  setFields: React.Dispatch<SetStateAction<FieldOrFieldInput[]>>;

  isSubmitting: boolean;

  defaultValues?: any;
  type: "edit" | "create"
};

export const NoteModelsForm: React.FC<NoteModelsFormProps> = ({
  onSubmit,
  fields,
  setFields,
  isSubmitting,

  type,

  defaultValues = {}

}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(createSchema),

    defaultValues
  });

  const onAddNewField = (field: FieldOrFieldInput) => {
    if (fields.some((_field) => _field.name === field.name)) {
      throw new Error('You already have a field with this name.');
    }

    setFields((prev) => prev.concat(field));
  };

  const onRemoveField = (field: FieldOrFieldInput) => {
    setFields((prev) => prev.filter((currentField) => currentField.name !== field.name));
  };

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
          {fields.map((field, idx) => (
            <ListItem key={idx}>
              <AddFieldComponent {...{ field, onDelete: onRemoveField }} />
            </ListItem>
          ))}
        </List>
      </Box>

      <AddFieldForm {...{ onSubmit: onAddNewField }} />
    </Box>
  );
};
