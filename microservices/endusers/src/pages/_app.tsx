import '../styles/globals.css';

import { createApp } from '@bluelibs/x-ui-next';
import { kernel } from '../startup/kernel';
import { AppProps } from 'next/dist/pages/_app';
import { Header } from 'src/bundles/UIAppBundle/components';
import { Fragment } from 'react';

import { ToastContainer } from 'react-toastify'

const App = createApp({
  kernel,
});

const WrappedApp = (props: AppProps) => {
  const app = App(props as any); // TODO: fix type

  return (
    <Fragment>
      <Header />
      {app}
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={true}
      />
    </Fragment>
  );
};

export default WrappedApp;
