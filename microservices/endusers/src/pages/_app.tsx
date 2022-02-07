import '../styles/globals.css';

import { createApp } from '@bluelibs/x-ui-next';
import { kernel } from '../startup/kernel';
import { AppProps } from 'next/dist/pages/_app';
import { Fragment, useEffect } from 'react';

import { ToastContainer } from 'react-toastify';

import { injectStyle } from 'react-toastify/dist/inject-style';
import { Head } from 'src/bundles/UIAppBundle/components';
import { Loader } from 'src/bundles/UIAppBundle/overrides';

const App = createApp({
  kernel,
  loadingComponent: <Loader center />,
});

const WrappedApp = (props: AppProps) => {
  const app = App(props as any); // TODO: fix type

  useEffect(() => {
    injectStyle();
  }, []);

  return (
    <Fragment>
      <Head />
      {app}
      <ToastContainer position="top-right" autoClose={2500} hideProgressBar={true} />
    </Fragment>
  );
};

export default WrappedApp;
