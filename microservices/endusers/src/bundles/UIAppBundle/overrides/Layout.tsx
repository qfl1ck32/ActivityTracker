import { Fragment } from 'react';
import { Header } from '../components';

export const Layout: React.FC = ({ children }) => {
  return (
    <Fragment>
      <Header />
      {children}
    </Fragment>
  );
};
