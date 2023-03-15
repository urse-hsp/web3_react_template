import React from 'react';
import { Outlet } from 'react-router';
import './index.scss';
import Header from './component/header';

const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <main className="app-main">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
