import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { EndUsersNoteModelsCreateInput, Field, Mutation } from 'src/api.types';
import { CreateNoteModel } from 'src/bundles/UIAppBundle/mutations';
import { NoteModelsCreateForm } from '../../forms';

import { Container } from '@mui/material';

export const NoteModelsCreateContainer: React.FC = () => {
  const [fields, setFields] = useState<Field[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const [createNoteModel] = useMutation<Mutation['EndUsersNoteModelsCreate'], { input: EndUsersNoteModelsCreateInput }>(
    CreateNoteModel
  );

  const onSubmit = async (data: EndUsersNoteModelsCreateInput) => {
    setSubmitting(true);

    try {
      const { name } = data;

      const { data: noteModelId } = await createNoteModel({
        variables: {
          input: {
            fields,
            name,
          },
        },
      });

      alert('You have successfully created a new note model');

      console.log(noteModelId);
    } catch (err: any) {
      alert('Err: ' + err.toString());
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <NoteModelsCreateForm {...{ onSubmit, fields, setFields, isSubmitting: submitting }} />
    </Container>
  );
};
