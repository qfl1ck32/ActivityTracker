import { useUIComponents } from '@bluelibs/x-ui-next';
import { NoteModelsListContainer } from './NoteModelsListContainer';

export const NoteModelsContainer: React.FC = () => {
  const UIComponents = useUIComponents();

  return (
    <UIComponents.Layout title="Note Models">
      <NoteModelsListContainer />
    </UIComponents.Layout>
  );
};
