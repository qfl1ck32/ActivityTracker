import { useMutation } from '@apollo/client';
import { useEventManager } from '@bluelibs/x-ui-next';
import { useState } from 'react';
import { EndUsersNoteModelsCreateInput, FieldInput, NoteModel } from 'src/api.types';
import { NoteModelCreatedEvent } from 'src/bundles/UIAppBundle/events';
import { CreateNoteModel } from 'src/bundles/UIAppBundle/mutations';
import { NoteModelsForm } from '../../forms';

import { toast } from 'react-toastify'

export const NoteModelsCreateContainer: React.FC = () => {
  const [fields, setFields] = useState<FieldInput[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const [createNoteModel] = useMutation<
    { EndUsersNoteModelsCreate: NoteModel },
    { input: EndUsersNoteModelsCreateInput }
  >(CreateNoteModel);

  const eventManager = useEventManager();

  const onSubmit = async (input: EndUsersNoteModelsCreateInput) => {
    setSubmitting(true);

    try {
      const { name } = input;

      const { data } = await createNoteModel({
        variables: {
          input: {
            fields,
            name,
          },
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

  return <NoteModelsForm {...{ onSubmit, fields, setFields: setFields as any, isSubmitting: submitting, type: "create" }} />;
};
