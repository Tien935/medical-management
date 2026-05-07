import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const savedUser = localStorage.getItem('user');
  const user = savedUser ? JSON.parse(savedUser) : null;

  if (!user) {
    // Không đăng nhập
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // Không đủ quyền
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
