import { useMutation } from '@apollo/client';
import { useEventManager } from '@bluelibs/x-ui-next';
import { useState } from 'react';
import { EndUsersNoteModelsCreateInput, Field, Mutation, NoteModel } from 'src/api.types';
import { NoteModelCreatedEvent } from 'src/bundles/UIAppBundle/events';
import { CreateNoteModel } from 'src/bundles/UIAppBundle/mutations';
import { NoteModelsCreateForm } from '../../forms';

export const NoteModelsCreateContainer: React.FC = () => {
  const [fields, setFields] = useState<Field[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const [createNoteModel] = useMutation<
    { EndUsersNoteModelsCreate: NoteModel },
    { input: EndUsersNoteModelsCreateInput }
  >(CreateNoteModel);

  const eventManager = useEventManager();

  const onSubmit = async (data: EndUsersNoteModelsCreateInput) => {
    setSubmitting(true);

    try {
      const { name } = data;

      const response = await createNoteModel({
        variables: {
          input: {
            fields,
            name,
          },
        },
      });

      alert('You have successfully created a new note model');

      const noteModel = response.data?.EndUsersNoteModelsCreate as NoteModel;

      eventManager.emit(
        new NoteModelCreatedEvent({
          noteModel,
        } as any) // TODO: fetch the whole noteModel.
      );
    } catch (err: any) {
      alert('Err: ' + err.toString());
    } finally {
      setSubmitting(false);
    }
  };

  return <NoteModelsCreateForm {...{ onSubmit, fields, setFields, isSubmitting: submitting }} />;
};
