/* eslint-disable react/prop-types */
import React from 'react';
import { Navigate } from 'react-router-dom';
import MainLayout from './Main';

const PrivateRoute = ({ component }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <MainLayout>{component}</MainLayout>;
};

export default PrivateRoute;
