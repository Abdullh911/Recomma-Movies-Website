import React from 'react';
import { Navigate } from 'react-router-dom';

const withAuth = (Component) => {
  return (props) => {
    const user = localStorage.getItem('user');

    if (!user) {
      return <Navigate to="/login" replace />;
    }

    return <Component {...props} />;
  };
};

export default withAuth;

