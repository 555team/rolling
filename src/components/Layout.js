import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderService from './HeaderService/HeaderService';
import Nav from './Nav/Nav';

export default function Layout() {
  return (
    <>
      <Nav />
      <HeaderService />
      <Outlet />
      <ToastContainer />
    </>
  );
}
