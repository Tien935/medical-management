import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const savedUser = localStorage.getItem('user');
  const user = savedUser ? JSON.parse(savedUser) : null;

  if (!user) {
    console.warn("ProtectedRoute: No user found in localStorage, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    console.warn(`ProtectedRoute: User role ${user.role} does not match required role ${requiredRole}, redirecting to home`);
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
