import { useMutation } from '@apollo/client';
import { useEventManager } from '@bluelibs/x-ui-next';
import { useState } from 'react';
import { EndUsersNoteModelsCreateInput, FieldInput, NoteModel } from 'src/api.types';
import { NoteModelCreatedEvent } from 'src/bundles/UIAppBundle/events';
import { CreateNoteModel } from 'src/bundles/UIAppBundle/mutations';
import { NoteModelsForm } from '../../forms';

import { toast } from 'react-toastify';
import { Box } from '@mui/material';

export const NoteModelsCreateContainer: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);

  const [createNoteModel] = useMutation<
    { EndUsersNoteModelsCreate: NoteModel },
    { input: EndUsersNoteModelsCreateInput }
  >(CreateNoteModel);

  const eventManager = useEventManager();

  const onSubmit = async (input: EndUsersNoteModelsCreateInput) => {
    setSubmitting(true);

    try {
      const { data } = await createNoteModel({
        variables: {
          input,
        },
      });

      toast.info('You have successfully created a new note model');

      eventManager.emit(
        new NoteModelCreatedEvent({
          noteModel: data?.EndUsersNoteModelsCreate as NoteModel,
        })
      );
    } catch (err: any) {
      toast.error(err.toString());
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <NoteModelsForm {...{ onSubmit, isSubmitting: submitting, context: 'create' }} />
    </Box>
  );
};
