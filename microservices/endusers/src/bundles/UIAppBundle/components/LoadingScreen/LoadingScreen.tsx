import { useUIComponents } from '@bluelibs/x-ui-react-bundle';

export const LoadingScreen: React.FC = () => {
  const UIComponents = useUIComponents();

  return (
    <UIComponents.Layout withHeader={false}>
      <UIComponents.Loader horizontalCenter verticalCenter />
    </UIComponents.Layout>
  );
};
