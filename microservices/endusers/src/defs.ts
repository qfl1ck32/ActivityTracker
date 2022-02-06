import '@bluelibs/x-ui-react-bundle';

export type LayoutComponentProps = {
  title?: string;
};

export type LoadingComponentProps = {
  center?: boolean;
};

export type ProtectComponentProps = {
  roles: string[];
};

declare module '@bluelibs/x-ui-react-bundle' {
  export interface IComponents<
    Error = any,
    NOT_AUTHORIZED = any,
    Loading = LoadingComponentProps,
    Layout = LayoutComponentProps,
    Protect = ProtectComponentProps
  > {
    Layout: React.ComponentType<Layout>;
    Loader: React.ComponentType<Loading>;
    Protect: React.ComponentType<Protect>;
  }
}
