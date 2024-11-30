import { Outlet } from 'react-router-dom';

import ConnectionStatus from './ConnectionStatus';
import Footer from './Footer';
import Header from './Header';

const BasicLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ConnectionStatus />
    </>
  );
};

export default BasicLayout;
