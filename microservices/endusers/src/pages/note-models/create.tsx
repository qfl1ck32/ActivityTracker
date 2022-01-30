import { NoteModelsCreateContainer, ProtectContainer } from 'src/bundles/UIAppBundle/components/containers';

const NoteModelsCreatePage: React.FC = () => {
  return (
    <ProtectContainer>
      <NoteModelsCreateContainer />
    </ProtectContainer>
  );
};

export default NoteModelsCreatePage;
