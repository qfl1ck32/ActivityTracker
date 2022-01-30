import { yupResolver } from '@hookform/resolvers/yup';
import { SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { EndUsersNoteModelsCreateInput, Field } from 'src/api.types';
import { FieldComponent, FieldForm } from '../..';
import { createSchema } from './schemas';

import { Button, Container, TextField, Typography } from '@mui/material';

export type NoteModelsCreateFormProps = {
  onSubmit: (data: EndUsersNoteModelsCreateInput) => Promise<void>;

  fields: Field[];
  setFields: React.Dispatch<SetStateAction<Field[]>>;
};

export const NoteModelsCreateForm: React.FC<NoteModelsCreateFormProps> = ({ onSubmit, fields, setFields }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(createSchema),
  });

  const onAddNewField = (field: Field) => {
    setFields((prev) => {
      if (prev.some((currentField) => currentField.name === field.name)) {
        alert('You already have a field with this name.');
        return prev;
      }

      return prev.concat(field);
    });
  };

  const onRemoveField = (field: Field) => {
    setFields((prev) => prev.filter((currentField) => currentField.name !== field.name));
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit as any)}>
        <TextField label="name" {...register('name')} error={Boolean(errors.name)} helperText={errors.name?.message} />

        <Button type="submit">Create</Button>
      </form>

      <Container>
        <Typography>Fields already added</Typography>
        {fields.map((field) => (
          <FieldComponent {...{ field, onDelete: onRemoveField }} />
        ))}
      </Container>

      <FieldForm {...{ onSubmit: onAddNewField }} />
    </Container>
  );
};
