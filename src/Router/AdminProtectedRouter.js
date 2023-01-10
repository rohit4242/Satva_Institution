import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserAuth } from '../contexts/AuthContext';

const AdminProtectedRouter = ({ children }) => {
  const { user } = useUserAuth();

  console.log(user);
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminProtectedRouter;
