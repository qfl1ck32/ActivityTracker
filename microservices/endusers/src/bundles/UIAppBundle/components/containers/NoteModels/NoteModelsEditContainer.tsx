import { useMutation } from '@apollo/client';
import { useEventManager } from '@bluelibs/x-ui-next';
import { useState } from 'react';
import { EndUsersNoteModelsUpdateInput, Field, NoteModel } from 'src/api.types';
import { CreateNoteModel, UpdateNoteModels } from 'src/bundles/UIAppBundle/mutations';
import { NoteModelsForm } from '../../forms';

import { toast } from 'react-toastify'

export type NoteModelsEditContainerProps = {
  initialFields: Field[];

  defaultValues: any;
}

export const NoteModelsEditContainer: React.FC<NoteModelsEditContainerProps> = ({ initialFields, defaultValues }) => {
  const [fields, setFields] = useState<Field[]>(initialFields);
  const [submitting, setSubmitting] = useState(false);

  const [updateNoteModel] = useMutation<
    { EndUsersNoteModelsUpdate: NoteModel },
    { input: EndUsersNoteModelsUpdateInput }
  >(UpdateNoteModels);

  const eventManager = useEventManager();

  const onSubmit = async (input: NoteModel) => {
    setSubmitting(true);

    const { name } = input;

    console.log(defaultValues)

    try {

      // TODO: use something that does this.
      console.log(fields)

      const goodFields = fields.map(({__typename, ...field}) => {
        const enumValues = field.enumValues?.map(({__typename, ...value}) => value)

        return {
          ...field,
          enumValues
        }
      })

      // console.log({
      //   name,
      //   fields: goodFields
      // })

      // setSubmitting(false)
      // return;

      const { data } = await updateNoteModel({
        variables: {
          input: {
            name,

            fields: goodFields,

            noteModelId: defaultValues.id
          }
        }
      })

      console.log(data?.EndUsersNoteModelsUpdate);

      toast.info("You have successfully edited the note model")

      //  toast.info("You have successfully edited the note model.")
    } catch (err: any) {
      toast.error(err.toString());
    } finally {
      setSubmitting(false);
    }
  };

  return <NoteModelsForm {...{ onSubmit, fields, setFields: setFields as any, isSubmitting: submitting, type: "edit", defaultValues }} />;
};
