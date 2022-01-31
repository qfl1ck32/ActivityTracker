import { yupResolver } from '@hookform/resolvers/yup';
import { SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { EndUsersNoteModelsCreateInput, Field, FieldType } from 'src/api.types';
import { FieldComponent, FieldForm } from '../..';
import { createSchema } from './schemas';

import { Container, TextField, Typography, List, ListItem, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';

export type NoteModelsCreateFormProps = {
  onSubmit: (data: EndUsersNoteModelsCreateInput) => Promise<void>;

  fields: Field[];
  setFields: React.Dispatch<SetStateAction<Field[]>>;

  isSubmitting: boolean;
};

export const NoteModelsCreateForm: React.FC<NoteModelsCreateFormProps> = ({
  onSubmit,
  fields,
  setFields,
  isSubmitting,
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(createSchema),
  });

  const onAddNewField = (field: Field) => {
    if (fields.some((_field) => _field.name === field.name)) {
      throw new Error('You already have a field with this name.');
    }

    // TODO: should this be handled in the form?
    if (field.type !== FieldType.ENUM) {
      delete field.enumValues;
    }

    setFields((prev) => prev.concat(field));
  };

  const onRemoveField = (field: Field) => {
    setFields((prev) => prev.filter((currentField) => currentField.name !== field.name));
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit as any)}>
        <TextField label="name" {...register('name')} error={Boolean(errors.name)} helperText={errors.name?.message} />

        <LoadingButton loading={isSubmitting} type="submit">
          Create
        </LoadingButton>
      </form>

      <Box>
        <Typography variant="h5">Fields already added</Typography>
        <List>
          {fields.map((field, idx) => (
            <ListItem key={idx}>
              <FieldComponent {...{ field, onDelete: onRemoveField }} />
            </ListItem>
          ))}
        </List>
      </Box>

      <FieldForm {...{ onSubmit: onAddNewField }} />
    </Box>
  );
};
