import '@bluelibs/x-ui-react-bundle';

export type LayoutComponentProps = {
  title?: string;
};

export type LoadingComponentProps = {
  center?: boolean;
};

declare module '@bluelibs/x-ui-react-bundle' {
  export interface IComponents<
    Error = any,
    NOT_AUTHORIZED = any,
    Loading = LoadingComponentProps,
    Layout = LayoutComponentProps
  > {
    Layout: React.ComponentType<Layout>;
    Loader: React.ComponentType<Loading>;
  }
}
