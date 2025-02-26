import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute: React.FC = () => {
  const { state } = useAuth();
  return state.isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;