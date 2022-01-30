import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { EndUsersNoteModelsCreateInput, Field, Mutation } from 'src/api.types';
import { CreateNoteModel } from 'src/bundles/UIAppBundle/mutations';
import { NoteModelsCreateForm } from '../../forms';

import { Container } from '@mui/material';

export const NoteModelsCreateContainer: React.FC = () => {
  const [fields, setFields] = useState<Field[]>([]);

  const [createNoteModel] = useMutation<Mutation['EndUsersNoteModelsCreate'], EndUsersNoteModelsCreateInput>(
    CreateNoteModel
  );

  const onSubmit = async (data: EndUsersNoteModelsCreateInput) => {
    console.log({ data, fields });
  };

  return (
    <Container maxWidth="sm">
      <NoteModelsCreateForm {...{ onSubmit, fields, setFields }} />
    </Container>
  );
};
