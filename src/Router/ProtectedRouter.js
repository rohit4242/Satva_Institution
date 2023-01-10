import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserAuth } from '../contexts/AuthContext';

// const UserRoleTypes = {
//   ADMIN: "admin",
//   TEACHER: "teacher",
//   STUDENT: "student",
// }

const ProtectedRoute = (props) => {
  const { user } = useUserAuth();
  // const location = useLocation();

  if (!user) {
    return <Navigate to="/" />;
  }

  console.log(localStorage.getItem('xxIPNizysHe36MAunb1r4GMp0Rn1'));
  if (localStorage.getItem('xxIPNizysHe36MAunb1r4GMp0Rn1') === props.role) {
    return props.children;
  }
  else {
    alert("You are not allowed to access this page.");
    return <Navigate to="/Dashboard"  replace />;
  }
};


export default ProtectedRoute;