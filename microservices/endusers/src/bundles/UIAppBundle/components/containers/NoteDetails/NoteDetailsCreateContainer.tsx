import { NoteModel } from 'src/api.types';

export type NoteDetailsCreateContainerProps = {
  noteModel: NoteModel;
};

export const NoteDetailsCreateContainer: React.FC<NoteDetailsCreateContainerProps> = ({ noteModel }) => {
  return (
    <>
      {noteModel.fields.map((field) => (
        <h5>{field.type}</h5>
      ))}
    </>
  );
};
