import { useState } from 'react';
import { NoteModel } from 'src/api.types';
import { NoteDetailsCreateForm } from '../..';

export type NoteDetailsCreateContainerProps = {
  noteModel: NoteModel;
};

export const NoteDetailsCreateContainer: React.FC<NoteDetailsCreateContainerProps> = ({ noteModel }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);

    console.log(data);

    setIsSubmitting(false);
  };

  return <NoteDetailsCreateForm {...{ onSubmit, noteModel, isSubmitting }} />;
};
