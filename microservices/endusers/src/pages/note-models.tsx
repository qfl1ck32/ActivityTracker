import { NoteModelsContainer, ProtectContainer } from 'src/bundles/UIAppBundle/components';

const NoteModelsPage: React.FC = () => {
  return (
    <ProtectContainer>
      <NoteModelsContainer />
    </ProtectContainer>
  );
};

export default NoteModelsPage;
