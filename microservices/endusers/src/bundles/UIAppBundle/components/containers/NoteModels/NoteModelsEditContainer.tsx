import { useMutation } from '@apollo/client';
import { use, useEventManager } from '@bluelibs/x-ui-next';
import { useState } from 'react';
import { EndUsersNoteModelsUpdateInput, Field, NoteModel } from 'src/api.types';
import { UpdateNoteModels } from 'src/bundles/UIAppBundle/mutations';
import { NoteModelsForm } from '../../forms';

import { toast } from 'react-toastify';
import { GQLService } from 'src/bundles/UIAppBundle/services';
import { NoteModelUpdatedEvent } from 'src/bundles/UIAppBundle/events';

export type NoteModelsEditContainerProps = {
  initialFields: Field[];

  defaultValues: any;
};

export const NoteModelsEditContainer: React.FC<NoteModelsEditContainerProps> = ({ initialFields, defaultValues }) => {
  const [submitting, setSubmitting] = useState(false);

  const [updateNoteModel] = useMutation<
    { EndUsersNoteModelsUpdate: NoteModel },
    { input: EndUsersNoteModelsUpdateInput }
  >(UpdateNoteModels);

  const eventManager = useEventManager();

  const gqlService = use(GQLService);

  const onSubmit = async (input: NoteModel) => {
    setSubmitting(true);

    const { name, fields } = input;

    setSubmitting(false);

    gqlService.deepCleanTypename(fields);

    try {
      const { data } = await updateNoteModel({
        variables: {
          input: {
            name,

            fields,

            noteModelId: defaultValues.id,
          },
        },
      });

      eventManager.emit(
        new NoteModelUpdatedEvent({
          noteModel: data?.EndUsersNoteModelsUpdate as NoteModel,
        })
      );

      toast.info('You have successfully edited the note model');
    } catch (err: any) {
      toast.error(err.toString());
    } finally {
      setSubmitting(false);
    }
  };

  return <NoteModelsForm {...{ onSubmit, isSubmitting: submitting, context: 'edit', defaultValues }} />;
};
