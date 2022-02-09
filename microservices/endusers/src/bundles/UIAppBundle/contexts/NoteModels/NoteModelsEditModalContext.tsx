import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import { NoteModel } from '../../../../api.types';
import { DialogContainer, NoteModelsEditContainer } from '../../components';

export const NoteModelsEditModalContext = createContext<
  [Dispatch<SetStateAction<boolean>>, Dispatch<SetStateAction<NoteModel>>]
>(null as any);

export const NoteModelsEditModalProvider: React.FC = ({ children }) => {
  const [open, setOpen] = useState(false);

  const [noteModel, setNoteModel] = useState<NoteModel>();

  return (
    <NoteModelsEditModalContext.Provider value={[setOpen, setNoteModel as any]}>
      {children}
      <DialogContainer
        {...{
          open,
          onClose: () => setOpen(false),

          title: `Edit note model: ${noteModel?.name}`,
        }}
      >
        <NoteModelsEditContainer
          {...{
            defaultValues: noteModel,
          }}
        />
      </DialogContainer>
    </NoteModelsEditModalContext.Provider>
  );
};

export const useNoteModelsEditModal = () => useContext(NoteModelsEditModalContext);
