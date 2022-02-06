import '@bluelibs/x-ui-react-bundle';

declare module '@bluelibs/x-ui-react-bundle' {
  export interface IComponents<Error = any, NOT_AUTHORIZED = any> {
    Layout: React.ComponentType;
  }
}
