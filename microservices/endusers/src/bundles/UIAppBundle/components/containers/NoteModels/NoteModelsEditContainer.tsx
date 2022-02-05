import { useMutation } from '@apollo/client';
import { useEventManager } from '@bluelibs/x-ui-next';
import { useState } from 'react';
import { EndUsersNoteModelsCreateInput, Field, FieldInput, NoteModel } from 'src/api.types';
import { CreateNoteModel } from 'src/bundles/UIAppBundle/mutations';
import { NoteModelsForm } from '../../forms';

import { toast } from 'react-toastify'

export type NoteModelsEditContainerProps = {
    initialFields: Field[];
}

export const NoteModelsEditContainer: React.FC<NoteModelsEditContainerProps> = ({initialFields}) => {
  const [fields, setFields] = useState<Field[]>(initialFields);
  const [submitting, setSubmitting] = useState(false);

  const [createNoteModel] = useMutation<
    { EndUsersNoteModelsCreate: NoteModel },
    { input: EndUsersNoteModelsCreateInput }
  >(CreateNoteModel);

  const eventManager = useEventManager();

  const onSubmit = async (input: any) => {
    setSubmitting(true);

    try {
     console.log(input)

     toast.info("You have successfully edited the note model.")
    } catch (err: any) {
      toast.error(err.toString());
    } finally {
      setSubmitting(false);
    }
  };

  return <NoteModelsForm {...{ onSubmit, fields, setFields: setFields as any, isSubmitting: submitting, type: "edit" }} />;
};
