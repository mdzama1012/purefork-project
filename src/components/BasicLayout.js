import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import ConnectionStatus from './ConnectionStatus';
import Footer from './Footer';
import Header from './Header';

const BasicLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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
